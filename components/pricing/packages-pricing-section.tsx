"use client"

import { CarSizeSelector } from "@/components/car-size-selector"
import { PricingPackageCard } from "@/components/pricing-package-card"
import { LazyLoadSection } from "@/components/lazy-section"
import { useLanguage } from "@/lib/i18n/language-context"
import { PACKAGE_KEYS, packages, packagesEn } from "@/lib/pricing-data"

type PackagesPricingSectionProps = {
  layout?: "grid" | "stack"
  showCarSizeSelector?: boolean
  title?: string
  subtitle?: string
  /** Nadpis ako h2; ak false, použije sa len vizuálna časť bez duplicity na podstránkach */
  showHeader?: boolean
}

export function PackagesPricingSection({
  layout = "grid",
  showCarSizeSelector = true,
  title,
  subtitle,
  showHeader = true,
}: PackagesPricingSectionProps) {
  const { language, t } = useLanguage()
  const pkgs = language === "en" ? packagesEn : packages
  const heading = title ?? t.services.title
  const intro = subtitle ?? t.services.subtitle

  const cards = PACKAGE_KEYS.map((key, index) => (
    <LazyLoadSection
      key={key}
      delay={layout === "stack" ? 0.05 * index : 0.1 + index * 0.1}
      className="h-full"
    >
      <PricingPackageCard packageKey={key} packageData={pkgs[key]} />
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
          <div className="grid gap-8 overflow-visible pt-4 md:grid-cols-2 lg:grid-cols-4">
            {cards}
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col gap-8 overflow-visible pt-2">{cards}</div>
        )}
      </div>
    </section>
  )
}
