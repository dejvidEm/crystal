import { BOOKING_TIMEZONE, MIN_LEAD_MINUTES } from "@/lib/booking/catalog"
import type { Weekday } from "@/lib/booking/types"

export function formatDateInBratislava(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

export function formatTimeInBratislava(date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: BOOKING_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}

export function isoWeekdayFromDate(dateIso: string): Weekday {
  const [year, month, day] = dateIso.split("-").map(Number)
  const utcNoon = Date.UTC(year, month - 1, day, 12, 0, 0)
  const weekday = new Date(utcNoon).getUTCDay()
  return (weekday === 0 ? 7 : weekday) as Weekday
}

export function addMonths(dateIso: string, months: number): string {
  const [year, month] = dateIso.split("-").map(Number)
  const next = new Date(Date.UTC(year, month - 1 + months, 1))
  const y = next.getUTCFullYear()
  const m = String(next.getUTCMonth() + 1).padStart(2, "0")
  return `${y}-${m}-01`
}

export function monthKeyFromDate(dateIso: string): string {
  return dateIso.slice(0, 7)
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
}

export function listMonthDates(monthKey: string): string[] {
  const [year, month] = monthKey.split("-").map(Number)
  const count = daysInMonth(year, month - 1)
  return Array.from({ length: count }, (_, index) => {
    const day = String(index + 1).padStart(2, "0")
    return `${year}-${String(month).padStart(2, "0")}-${day}`
  })
}

export function normalizeTime(value: string): string {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/)
  if (!match) return value
  return `${match[1].padStart(2, "0")}:${match[2]}`
}

export function isTimeAtLeastMinutesAhead(
  dateIso: string,
  time: string,
  minutes = MIN_LEAD_MINUTES,
): boolean {
  const today = formatDateInBratislava()
  if (dateIso > today) return true
  if (dateIso < today) return false
  const [hour, minute] = normalizeTime(time).split(":").map(Number)
  const [nowHour, nowMinute] = formatTimeInBratislava().split(":").map(Number)
  return hour * 60 + minute - (nowHour * 60 + nowMinute) >= minutes
}

export function formatSlovakDate(dateIso: string): string {
  const [year, month, day] = dateIso.split("-").map(Number)
  return `${day}. ${month}. ${year}`
}

export function formatSlovakDateTime(value: string | null): string {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat("sk-SK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: BOOKING_TIMEZONE,
  }).format(date)
}
