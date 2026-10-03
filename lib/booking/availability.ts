import type { SupabaseClient } from "@supabase/supabase-js"
import {
  isTimeAtLeastMinutesAhead,
  isoWeekdayFromDate,
  listMonthDates,
  normalizeIsoDate,
  normalizeTime,
} from "@/lib/booking/datetime"
import type { MonthDayAvailability, WeeklyAvailabilityRow, Weekday } from "@/lib/booking/types"

type OccupiedSlot = {
  booking_date: string
  booking_time: string
}

function collectIsoDates(values: unknown[]): string[] {
  return [...new Set(values.map(normalizeIsoDate).filter((value): value is string => Boolean(value)))].sort()
}

export function buildMonthAvailability(input: {
  month: string
  weekly: WeeklyAvailabilityRow[]
  occupied: OccupiedSlot[]
  closedDates?: string[]
  todayIso: string
}): MonthDayAvailability[] {
  const weeklyMap = new Map<Weekday, WeeklyAvailabilityRow>(
    input.weekly.map((row) => [row.weekday, row]),
  )
  const occupiedByDate = new Map<string, Set<string>>()
  for (const row of input.occupied) {
    const date = normalizeIsoDate(row.booking_date)
    if (!date) continue
    const time = normalizeTime(String(row.booking_time).slice(0, 5))
    const set = occupiedByDate.get(date) ?? new Set<string>()
    set.add(time)
    occupiedByDate.set(date, set)
  }
  const closed = new Set(collectIsoDates(input.closedDates ?? []))

  return listMonthDates(input.month).map((date) => {
    const weekday = isoWeekdayFromDate(date)
    const weekly = weeklyMap.get(weekday)
    const configuredSlots = weekly?.enabled ? (weekly.slots ?? []).map(normalizeTime) : []
    const occupied = occupiedByDate.get(date) ?? new Set<string>()
    const remaining = closed.has(date)
      ? []
      : configuredSlots.filter((slot) => !occupied.has(slot) && isTimeAtLeastMinutesAhead(date, slot))

    let status: MonthDayAvailability["status"]
    if (date < input.todayIso) status = "past"
    else if (closed.has(date) || !weekly?.enabled || configuredSlots.length === 0) status = "closed"
    else if (remaining.length === 0) status = "full"
    else if (remaining.length === configuredSlots.length) status = "available"
    else status = "partial"

    return {
      date,
      weekday,
      status,
      freeCount: remaining.length,
      totalCount: configuredSlots.length,
      slots: remaining,
    }
  })
}

async function fetchClosedDates(supabase: SupabaseClient, from: string, to: string): Promise<string[]> {
  const rpc = await supabase.rpc("list_closed_dates", { p_from: from, p_to: to })
  if (!rpc.error) {
    const rows = (rpc.data ?? []) as { closed_date?: unknown }[]
    return collectIsoDates(rows.map((row) => row.closed_date ?? row))
  }

  const table = await supabase.from("closed_dates").select("closed_date").gte("closed_date", from).lte("closed_date", to)
  if (table.error) {
    throw table.error
  }

  return collectIsoDates(((table.data ?? []) as { closed_date: unknown }[]).map((row) => row.closed_date))
}

export async function fetchPublicAvailability(
  supabase: SupabaseClient,
  month: string,
  todayIso: string,
) {
  const dates = listMonthDates(month)
  const from = dates[0]
  const to = dates[dates.length - 1]

  const [{ data: weekly, error: weeklyError }, { data: occupied, error: occupiedError }, closedDates] =
    await Promise.all([
      supabase.from("weekly_availability").select("weekday, enabled, slots").order("weekday"),
      supabase.rpc("list_occupied_slots", { p_from: from, p_to: to }),
      fetchClosedDates(supabase, from, to),
    ])

  if (weeklyError) {
    throw weeklyError
  }

  if (occupiedError) {
    throw occupiedError
  }

  return buildMonthAvailability({
    month,
    weekly: (weekly ?? []) as WeeklyAvailabilityRow[],
    occupied: (occupied ?? []) as OccupiedSlot[],
    closedDates,
    todayIso,
  })
}
