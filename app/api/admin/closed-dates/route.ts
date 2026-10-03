import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/booking/admin"
import { normalizeIsoDate } from "@/lib/booking/datetime"
import { adminClosedDatesSchema } from "@/lib/booking/schemas"

export const runtime = "nodejs"

function normalizeDates(values: unknown): string[] {
  if (!Array.isArray(values)) return []
  return [
    ...new Set(
      values
        .map((value) => {
          if (value && typeof value === "object" && "closed_date" in value) {
            return normalizeIsoDate((value as { closed_date: unknown }).closed_date)
          }
          return normalizeIsoDate(value)
        })
        .filter((value): value is string => Boolean(value)),
    ),
  ].sort()
}

async function readClosedDates(supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"]) {
  const { data, error } = await supabase.from("closed_dates").select("closed_date").order("closed_date")
  if (error) throw error
  return normalizeDates(data)
}

async function replaceClosedDates(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  dates: string[],
) {
  const { error: rpcError, data: rpcData } = await supabase.rpc("admin_set_closed_dates", {
    p_dates: dates,
  })

  if (!rpcError) {
    const saved = normalizeDates(rpcData)
    if (dates.length === 0 || saved.length === dates.length) {
      return saved.length ? saved : dates
    }
  }

  const { error: deleteError } = await supabase.from("closed_dates").delete().gte("closed_date", "1900-01-01")
  if (deleteError) {
    throw rpcError ?? deleteError
  }

  if (dates.length > 0) {
    const { error: insertError } = await supabase
      .from("closed_dates")
      .insert(dates.map((closed_date) => ({ closed_date })))
    if (insertError) {
      throw insertError
    }
  }

  return readClosedDates(supabase)
}

export async function GET() {
  const auth = await requireAdmin()
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status })
  }

  try {
    const dates = await readClosedDates(auth.supabase)
    return NextResponse.json({ ok: true, dates }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ ok: false, error: "Dovolenku sa nepodarilo načítať." }, { status: 500 })
  }
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

  try {
    const dates = await replaceClosedDates(auth.supabase, parsed.data.dates)
    return NextResponse.json({ ok: true, dates })
  } catch {
    return NextResponse.json({ ok: false, error: "Dovolenku sa nepodarilo uložiť." }, { status: 400 })
  }
}
