"use client"

import { CalendarClock } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function PackagesAvailabilityBadge() {
  const { t } = useLanguage()

  return (
    <div className="mb-4 flex justify-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-100 backdrop-blur-sm shadow-[0_0_24px_-8px_rgba(251,191,36,0.45)]">
        <CalendarClock className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
        {t.services.lastAvailableSlotsBadge}
      </span>
    </div>
  )
}
