"use client"

import { getHomeUpholsteryCopy } from "@/lib/home-upholstery-copy"
import { toContentLocale } from "@/lib/i18n/locale"
import { useLanguage } from "@/lib/i18n/language-context"
import { useIsHomeUpholstery } from "@/components/site-vertical-context"

export function VerticalSectionBadge() {
  const isHome = useIsHomeUpholstery()
  const { language } = useLanguage()
  if (!isHome) return null
  const copy = getHomeUpholsteryCopy(toContentLocale(language))
  return (
    <span className="mb-3 inline-flex rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
      {copy.pageBadge}
    </span>
  )
}
