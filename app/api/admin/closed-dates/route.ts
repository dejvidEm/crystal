import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/booking/admin"
import { adminClosedDatesSchema } from "@/lib/booking/schemas"

export const runtime = "nodejs"

function normalizeDates(rows: { closed_date: string }[] | null): string[] {
  return (rows ?? []).map((row) => String(row.closed_date).slice(0, 10)).sort()
}

export async function GET() {
  const auth = await requireAdmin()
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status })
  }

  const { data, error } = await auth.supabase
    .from("closed_dates")
    .select("closed_date")
    .order("closed_date")

  if (error) {
    return NextResponse.json({ ok: false, error: "Dovolenku sa nepodarilo načítať." }, { status: 500 })
  }

  return NextResponse.json(
    { ok: true, dates: normalizeDates(data) },
    { headers: { "Cache-Control": "no-store" } },
  )
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

  const parsed = adminClosedDatesSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Neplatné dátumy dovolenky." }, { status: 422 })
  }

  const { data, error } = await auth.supabase.rpc("admin_set_closed_dates", {
    p_dates: parsed.data.dates,
  })

  if (error) {
    return NextResponse.json({ ok: false, error: "Dovolenku sa nepodarilo uložiť." }, { status: 400 })
  }

  const dates = Array.isArray(data)
    ? data.map((value) => String(value).slice(0, 10)).sort()
    : parsed.data.dates

  return NextResponse.json({ ok: true, dates })
}
