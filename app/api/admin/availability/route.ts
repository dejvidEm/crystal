import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/booking/admin"
import { adminAvailabilityBatchSchema, adminAvailabilitySchema } from "@/lib/booking/schemas"

export const runtime = "nodejs"

export async function GET() {
  const auth = await requireAdmin()
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status })
  }

  const { data, error } = await auth.supabase
    .from("weekly_availability")
    .select("weekday, enabled, slots")
    .order("weekday")

  if (error) {
    return NextResponse.json({ ok: false, error: "Nastavenia sa nepodarilo načítať." }, { status: 500 })
  }

  return NextResponse.json({ ok: true, days: data }, { headers: { "Cache-Control": "no-store" } })
}

export async function PUT(request: Request) {
  const auth = await requireAdmin()
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatná požiadavka." }, { status: 400 })
  }

  const batch = adminAvailabilityBatchSchema.safeParse(json)
  const single = adminAvailabilitySchema.safeParse(json)
  const days = batch.success ? batch.data.days : single.success ? [single.data] : null

  if (!days) {
    return NextResponse.json({ ok: false, error: "Neplatné nastavenie dní." }, { status: 422 })
  }

  for (const day of days) {
    const unique = [...new Set(day.slots)].sort()
    const enabled = day.enabled && unique.length > 0
    const { error } = await auth.supabase.rpc("admin_update_availability", {
      p_weekday: day.weekday,
      p_enabled: enabled,
      p_slots: enabled ? unique : [],
    })
    if (error) {
      return NextResponse.json({ ok: false, error: "Nastavenie sa nepodarilo uložiť." }, { status: 400 })
    }
  }

  return NextResponse.json({ ok: true, days })
}
