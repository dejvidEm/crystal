import { NextResponse } from "next/server"
import { sendOwnerNewBookingEmail } from "@/lib/booking/confirmation-email"
import { estimateBookingPriceEur, EXTRA_LABELS_SK, SERVICE_LABELS_SK, VEHICLE_LABELS_SK } from "@/lib/booking/catalog"
import { isTimeAtLeastMinutesAhead } from "@/lib/booking/datetime"
import { createBookingSchema } from "@/lib/booking/schemas"
import { clientIp, rateLimit } from "@/lib/rate-limit"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

function rpcErrorCode(error: { message?: string; code?: string }): string {
  if (error.code === "23505") return "slot_taken"
  const message = error.message ?? ""
  const known = message.match(
    /too_soon|slot_taken|slot_unavailable|date_in_past|rate_limited|invalid_phone|invalid_email|invalid_address|invalid_name|invalid_notes|invalid_vehicle|invalid_service/,
  )
  return known?.[0] || message.split(/\s+/).pop() || ""
}

function publicError(code: string): { message: string; status: number } {
  switch (code) {
    case "slot_taken":
    case "slot_unavailable":
      return { message: "Tento termín už nie je voľný. Vyberte iný čas.", status: 409 }
    case "date_in_past":
    case "too_soon":
      return { message: "Tento čas je príliš skoro. Vyberte neskôrší termín.", status: 422 }
    case "rate_limited":
      return { message: "Príliš veľa rezervácií z tohto kontaktu. Skúste neskôr.", status: 429 }
    case "invalid_phone":
      return { message: "Zadajte platné telefónne číslo.", status: 422 }
    case "invalid_email":
      return { message: "Zadajte platný e-mail.", status: 422 }
    case "invalid_address":
    case "invalid_name":
      return { message: "Skontrolujte vyplnené údaje.", status: 422 }
    default:
      return { message: "Rezerváciu sa nepodarilo odoslať. Skúste to znova.", status: 400 }
  }
}

export async function POST(request: Request) {
  if (!rateLimit(`booking-create:${clientIp(request)}`, 8, 10 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Príliš veľa pokusov. Skúste to o chvíľu." },
      { status: 429 },
    )
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatná požiadavka." }, { status: 400 })
  }

  const parsed = createBookingSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Skontrolujte vyplnené údaje." }, { status: 422 })
  }

  const payload = parsed.data
  if (payload.website && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true, id: "ok" })
  }

  if (!isTimeAtLeastMinutesAhead(payload.bookingDate, payload.bookingTime)) {
    return NextResponse.json(
      { ok: false, error: "Tento čas je príliš skoro. Vyberte neskôrší termín." },
      { status: 422 },
    )
  }

  const extras =
    payload.service === "tepovanie"
      ? payload.extras.filter((extra) => extra !== "tepovanie")
      : payload.extras

  const estimatedPrice = estimateBookingPriceEur({
    service: payload.service,
    extras,
    vehicleSize: payload.vehicleSize,
  })

  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.rpc("submit_booking", {
      p_vehicle_size: payload.vehicleSize,
      p_service: payload.service,
      p_extras: extras,
      p_address: payload.address,
      p_customer_name: payload.customerName,
      p_customer_phone: payload.customerPhone,
      p_customer_email: payload.customerEmail,
      p_notes: payload.notes || null,
      p_booking_date: payload.bookingDate,
      p_booking_time: payload.bookingTime,
      p_estimated_price_eur: estimatedPrice,
      p_locale: payload.locale,
    })

    if (error) {
      const mapped = publicError(rpcErrorCode(error))
      return NextResponse.json({ ok: false, error: mapped.message }, { status: mapped.status })
    }

    try {
      const sent = await sendOwnerNewBookingEmail({
        customerName: payload.customerName,
        customerPhone: payload.customerPhone,
        customerEmail: payload.customerEmail,
        address: payload.address,
        bookingDate: payload.bookingDate,
        bookingTime: payload.bookingTime,
        vehicleLabel: VEHICLE_LABELS_SK[payload.vehicleSize],
        serviceLabel: SERVICE_LABELS_SK[payload.service],
        extrasLabel: extras.map((extra) => EXTRA_LABELS_SK[extra]).join(", ") || "—",
        estimatedPrice,
        notes: payload.notes,
      })
      if (!sent) {
        console.error("[booking.create] owner email skipped – missing RESEND_API_KEY")
      }
    } catch (err) {
      console.error("[booking.create] owner email failed", err)
    }

    return NextResponse.json({ ok: true, id: data })
  } catch (error) {
    console.error("[booking.create]", error)
    return NextResponse.json(
      { ok: false, error: "Rezerváciu sa nepodarilo odoslať." },
      { status: 500 },
    )
  }
}
