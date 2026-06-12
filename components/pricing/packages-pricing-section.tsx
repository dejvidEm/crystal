"use client"

import { CarSizeSelector } from "@/components/car-size-selector"
import { PricingPackageCard } from "@/components/pricing-package-card"
import { LazyLoadSection } from "@/components/lazy-section"
import { useLanguage } from "@/lib/i18n/language-context"
import { PACKAGE_KEYS, getPackages } from "@/lib/pricing-data"
import { toContentLocale } from "@/lib/i18n/locale"

type PackagesPricingSectionProps = {
  layout?: "grid" | "stack"
  /** Rovnaká mriežka ako na homepage – 4 balíky vedľa seba od lg */
  gridVariant?: "home" | "cennik"
  showCarSizeSelector?: boolean
  title?: string
  subtitle?: string
  /** Nadpis ako h2; ak false, použije sa len vizuálna časť bez duplicity na podstránkach */
  showHeader?: boolean
}

const GRID_CLASS = {
  home: "grid gap-8 overflow-visible pt-4 md:grid-cols-2 lg:grid-cols-4",
  /** /cennik – 4 balíky v jednom riadku od tabletu (ako sekcia na homepage) */
  cennik: "grid w-full gap-6 overflow-visible pt-4 sm:gap-8 md:grid-cols-4",
} as const

export function PackagesPricingSection({
  layout = "grid",
  gridVariant = "home",
  showCarSizeSelector = true,
  title,
  subtitle,
  showHeader = true,
}: PackagesPricingSectionProps) {
  const { language, t } = useLanguage()
  const pkgs = getPackages(toContentLocale(language))
  const heading = title ?? t.services.title
  const intro = subtitle ?? t.services.subtitle

  const cards = PACKAGE_KEYS.map((key, index) => (
    <LazyLoadSection
      key={key}
      delay={layout === "stack" ? 0.05 * index : 0.1 + index * 0.1}
      className={layout === "grid" ? "contents" : "h-full"}
    >
      <div className={layout === "grid" ? "h-full min-w-0" : "h-full"}>
        <PricingPackageCard packageKey={key} packageData={pkgs[key]} />
      </div>
    </LazyLoadSection>
  ))

  return (
    <section className="relative py-16 md:py-20">
      {layout === "grid" && (
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background" />
      )}
      <div className="container relative z-10 mx-auto px-4">
        {showHeader && (
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{heading}</h2>
            <div className="mx-auto h-1 w-24 bg-primary" />
            <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{intro}</p>
            {showCarSizeSelector && <CarSizeSelector />}
          </div>
        )}

        {!showHeader && showCarSizeSelector && (
          <div className="mb-10 flex justify-center">
            <CarSizeSelector />
          </div>
        )}

        {layout === "grid" ? (
          <div className={GRID_CLASS[gridVariant]}>{cards}</div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col gap-8 overflow-visible pt-2">{cards}</div>
        )}
      </div>
    </section>
  )
}
