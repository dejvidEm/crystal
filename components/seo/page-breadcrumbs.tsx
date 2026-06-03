"use client"

import { ChevronRight } from "lucide-react"
import { HashAwareLink } from "@/components/seo/hash-aware-link"
import { useLanguage } from "@/lib/i18n/language-context"

type Crumb = {
  label: string
  href?: string
}

type PageBreadcrumbsProps = {
  items: Crumb[]
  className?: string
}

export function PageBreadcrumbs({ items, className = "" }: PageBreadcrumbsProps) {
  const { t } = useLanguage()

  return (
    <nav aria-label={t.seo.breadcrumbAria} className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-zinc-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />}
              {item.href && !isLast ? (
                <HashAwareLink href={item.href} className="text-primary hover:underline">
                  {item.label}
                </HashAwareLink>
              ) : (
                <span className={isLast ? "text-zinc-400" : undefined} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
