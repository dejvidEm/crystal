"use client"

import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type PackageSelectCardProps = {
  selected: boolean
  title: string
  subtitle: string
  displayPrice: string
  originalPrice?: string
  features: string[]
  footerNote?: string
  mostPopular?: boolean
  popularLabel: string
  onSelect?: () => void
  leading?: ReactNode
}

export function PackageSelectCard({
  selected,
  title,
  subtitle,
  displayPrice,
  originalPrice,
  features,
  footerNote,
  mostPopular,
  popularLabel,
  onSelect,
  leading,
}: PackageSelectCardProps) {
  const className = cn(
    "relative flex h-full w-full flex-col rounded-lg border-2 p-4 text-left transition-all",
    selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50",
  )

  const body = (
    <>
      <div className="mb-3 flex items-start justify-between gap-2">
        {leading ?? <span className="sr-only">{selected ? "selected" : "not selected"}</span>}
        {mostPopular && (
          <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            {popularLabel}
          </span>
        )}
      </div>
      <div className="font-semibold tracking-tight">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-3 flex flex-wrap items-baseline gap-3">
        {originalPrice ? (
          <span className="text-xl font-semibold text-zinc-400 line-through decoration-primary decoration-2">
            {originalPrice}
          </span>
        ) : null}
        <span className="text-2xl font-bold text-primary">{displayPrice}</span>
      </div>
      <ul className="mt-4 space-y-2 border-t border-border pt-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground/90">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {footerNote ? (
        <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
          {footerNote}
        </p>
      ) : null}
    </>
  )

  if (onSelect) {
    return (
      <button type="button" onClick={onSelect} className={cn(className, "touch-manipulation")}>
        {body}
      </button>
    )
  }

  return <div className={className}>{body}</div>
}
