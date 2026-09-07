import type { SupabaseClient } from "@supabase/supabase-js"
import { isTimeAtLeastMinutesAhead, isoWeekdayFromDate, listMonthDates, normalizeTime } from "@/lib/booking/datetime"
import type { MonthDayAvailability, WeeklyAvailabilityRow, Weekday } from "@/lib/booking/types"

type OccupiedSlot = {
  booking_date: string
  booking_time: string
}

export function buildMonthAvailability(input: {
  month: string
  weekly: WeeklyAvailabilityRow[]
  occupied: OccupiedSlot[]
  todayIso: string
}): MonthDayAvailability[] {
  const weeklyMap = new Map<Weekday, WeeklyAvailabilityRow>(
    input.weekly.map((row) => [row.weekday, row]),
  )
  const occupiedByDate = new Map<string, Set<string>>()
  for (const row of input.occupied) {
    const date = row.booking_date
    const time = normalizeTime(String(row.booking_time).slice(0, 5))
    const set = occupiedByDate.get(date) ?? new Set<string>()
    set.add(time)
    occupiedByDate.set(date, set)
  }

  return listMonthDates(input.month).map((date) => {
    const weekday = isoWeekdayFromDate(date)
    const weekly = weeklyMap.get(weekday)
    const configuredSlots = weekly?.enabled ? (weekly.slots ?? []).map(normalizeTime) : []
    const occupied = occupiedByDate.get(date) ?? new Set<string>()
    const remaining = configuredSlots.filter(
      (slot) => !occupied.has(slot) && isTimeAtLeastMinutesAhead(date, slot),
    )

    let status: MonthDayAvailability["status"]
    if (date < input.todayIso) status = "past"
    else if (!weekly?.enabled || configuredSlots.length === 0) status = "closed"
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

export async function fetchPublicAvailability(
  supabase: SupabaseClient,
  month: string,
  todayIso: string,
) {
  const dates = listMonthDates(month)
  const from = dates[0]
  const to = dates[dates.length - 1]

  const [{ data: weekly, error: weeklyError }, { data: occupied, error: occupiedError }] =
    await Promise.all([
      supabase.from("weekly_availability").select("weekday, enabled, slots").order("weekday"),
      supabase.rpc("list_occupied_slots", { p_from: from, p_to: to }),
    ])

  if (weeklyError) {
    throw weeklyError
  }

  if (occupiedError) {
    throw occupiedError
  }

  const occupiedRows = (occupied ?? []) as OccupiedSlot[]

  return buildMonthAvailability({
    month,
    weekly: (weekly ?? []) as WeeklyAvailabilityRow[],
    occupied: occupiedRows,
    todayIso,
  })
}
