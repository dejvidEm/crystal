import { NextResponse } from "next/server"
import { fetchPublicAvailability } from "@/lib/booking/availability"
import { formatDateInBratislava, monthKeyFromDate } from "@/lib/booking/datetime"
import { availabilityQuerySchema } from "@/lib/booking/schemas"
import { clientIp, rateLimit } from "@/lib/rate-limit"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

export async function GET(request: Request) {
  if (!rateLimit(`availability:${clientIp(request)}`, 60, 60_000)) {
    return NextResponse.json({ ok: false, error: "Príliš veľa požiadaviek." }, { status: 429 })
  }

  const monthParam = new URL(request.url).searchParams.get("month")
  const parsed = availabilityQuerySchema.safeParse({
    month: monthParam || monthKeyFromDate(formatDateInBratislava()),
  })
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Neplatný mesiac." }, { status: 400 })
  }

  try {
    const supabase = await createSupabaseServerClient()
    const days = await fetchPublicAvailability(
      supabase,
      parsed.data.month,
      formatDateInBratislava(),
    )
    return NextResponse.json(
      { ok: true, month: parsed.data.month, days },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("[booking.availability]", error)
    return NextResponse.json(
      { ok: false, error: "Kalendár sa nepodarilo načítať." },
      { status: 500 },
    )
  }
}
