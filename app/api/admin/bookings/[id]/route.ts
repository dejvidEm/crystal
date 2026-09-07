import { after, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/booking/admin"
import { sendBookingConfirmationEmail } from "@/lib/booking/confirmation-email"
import { adminBookingStatusSchema } from "@/lib/booking/schemas"
import type { BookingRow } from "@/lib/booking/types"

export const runtime = "nodejs"

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin()
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status })
  }

  const { id } = await context.params
  if (!id) {
    return NextResponse.json({ ok: false, error: "Chýba rezervácia." }, { status: 400 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatná požiadavka." }, { status: 400 })
  }

  const parsed = adminBookingStatusSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Neplatný stav." }, { status: 422 })
  }

  const { data: previous } = await auth.supabase
    .from("bookings")
    .select("status")
    .eq("id", id)
    .maybeSingle()

  const { data, error } = await auth.supabase.rpc("admin_set_booking_status", {
    p_id: id,
    p_status: parsed.data.status,
    p_admin_note: parsed.data.adminNote ?? null,
  })

  if (error) {
    const taken = error.message?.includes("slot_taken")
    return NextResponse.json(
      {
        ok: false,
        error: taken
          ? "Tento termín je už potvrdený pre inú rezerváciu."
          : "Stav rezervácie sa nepodarilo zmeniť.",
      },
      { status: taken ? 409 : 400 },
    )
  }

  const booking = data as BookingRow | null
  const shouldNotifyClient =
    parsed.data.status === "confirmed" && previous?.status !== "confirmed" && Boolean(booking?.customer_email)

  if (shouldNotifyClient && booking) {
    after(async () => {
      try {
        await sendBookingConfirmationEmail(booking)
      } catch (err) {
        console.error("[admin.bookings] confirmation email failed", err)
      }
    })
  }

  return NextResponse.json({ ok: true, booking: data })
}
