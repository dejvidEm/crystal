"use client"

import { useLanguage } from "@/lib/i18n/language-context"

const highlightClass = "font-bold text-primary"

function PricingNoteSeparator() {
  return (
    <span
      className="px-2 text-xl leading-none text-zinc-600 sm:px-3 sm:text-2xl"
      aria-hidden="true"
    >
      ·
    </span>
  )
}

export function PackagesTravelNote() {
  const { t } = useLanguage()
  const note = t.services.travelNote

  return (
    <p className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center text-xs leading-relaxed text-zinc-500 sm:text-sm">
      <span>
        {note.baPrefix}{" "}
        <span className={highlightClass}>{note.free}</span>
      </span>
      <PricingNoteSeparator />
      <span>
        {note.within15kmPrefix}{" "}
        <span className={highlightClass}>{note.within15kmFee}</span>
      </span>
      <PricingNoteSeparator />
      <span>
        {note.from15kmPrefix}{" "}
        <span className={highlightClass}>{note.perKmFee}</span>
      </span>
      <PricingNoteSeparator />
      <span>
        {note.petHairLabel}:{" "}
        <span className={highlightClass}>{note.petHairFee}</span>
      </span>
      <PricingNoteSeparator />
      <span>
        {note.extraDirtyLabel}:{" "}
        <span className={highlightClass}>{note.extraDirtyFee}</span>
      </span>
    </p>
  )
}
