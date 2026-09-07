import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/booking/admin"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const auth = await requireAdmin()
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: auth.status })
  }

  const url = new URL(request.url)
  const status = url.searchParams.get("status")
  const from = url.searchParams.get("from")
  const to = url.searchParams.get("to")

  let query = auth.supabase
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true })

  if (status && ["pending", "confirmed", "rejected", "cancelled", "completed"].includes(status)) {
    query = query.eq("status", status)
  }
  if (from) query = query.gte("booking_date", from)
  if (to) query = query.lte("booking_date", to)

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ ok: false, error: "Rezervácie sa nepodarilo načítať." }, { status: 500 })
  }

  return NextResponse.json({ ok: true, bookings: data }, { headers: { "Cache-Control": "no-store" } })
}
