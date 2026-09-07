"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { isoWeekdayFromDate } from "@/lib/booking/datetime"
import type { MonthDayAvailability } from "@/lib/booking/types"
import { cn } from "@/lib/utils"

const WEEKDAY_SHORT = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"]

function dayClass(status: MonthDayAvailability["status"], selected: boolean) {
  if (selected) {
    return "border-primary bg-primary text-black"
  }
  switch (status) {
    case "available":
      return "border-primary/70 bg-primary/15 text-white hover:bg-primary/25"
    case "partial":
      return "border-primary/35 bg-white/5 text-white hover:bg-white/10"
    case "full":
      return "border-white/10 bg-white/[0.03] text-zinc-500 line-through"
    case "closed":
      return "border-transparent bg-transparent text-zinc-600"
    case "past":
      return "border-transparent bg-transparent text-zinc-700"
    default:
      return "border-white/10 text-zinc-400"
  }
}

export function BookingMonthCalendar({
  month,
  days,
  selectedDate,
  onMonthChange,
  onSelectDate,
  prevLabel,
  nextLabel,
}: {
  month: string
  days: MonthDayAvailability[]
  selectedDate: string | null
  onMonthChange: (month: string) => void
  onSelectDate: (date: string) => void
  prevLabel: string
  nextLabel: string
}) {
  const [year, monthNum] = month.split("-").map(Number)
  const label = new Date(year, monthNum - 1, 1).toLocaleDateString("sk-SK", {
    month: "long",
    year: "numeric",
  })
  const firstWeekday = isoWeekdayFromDate(`${month}-01`)
  const blanks = firstWeekday - 1
  const safeDays = days ?? []
  const byDate = new Map(safeDays.map((day) => [day.date, day]))

  const shiftMonth = (delta: number) => {
    const next = new Date(year, monthNum - 1 + delta, 1)
    const y = next.getFullYear()
    const m = String(next.getMonth() + 1).padStart(2, "0")
    onMonthChange(`${y}-${m}`)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="rounded-md border border-white/10 p-2 text-zinc-300 hover:border-primary/40 hover:text-primary"
          aria-label={prevLabel}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-medium capitalize tracking-wide text-white">{label}</p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="rounded-md border border-white/10 p-2 text-zinc-300 hover:border-primary/40 hover:text-primary"
          aria-label={nextLabel}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] uppercase tracking-wider text-zinc-500">
        {WEEKDAY_SHORT.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1.5">
        {Array.from({ length: blanks }).map((_, index) => (
          <div key={`blank-${index}`} />
        ))}
        {safeDays.map((day) => {
          const disabled = day.status === "past" || day.status === "closed" || day.status === "full"
          const selected = selectedDate === day.date
          return (
            <button
              key={day.date}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(day.date)}
              className={cn(
                "aspect-square rounded-md border text-sm font-medium transition-colors",
                dayClass(byDate.get(day.date)?.status ?? day.status, selected),
                disabled && "cursor-not-allowed",
              )}
            >
              {Number(day.date.slice(-2))}
            </button>
          )
        })}
      </div>
    </div>
  )
}
