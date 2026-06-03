"use client"

import { AdditionalServicesTable } from "@/components/additional-services-table"
import { LazyLoadSection } from "@/components/lazy-section"
import { useLanguage } from "@/lib/i18n/language-context"

type AdditionalServicesPricingSectionProps = {
  title?: string
  subtitle?: string
  showHeader?: boolean
}

export function AdditionalServicesPricingSection({
  title,
  subtitle,
  showHeader = true,
}: AdditionalServicesPricingSectionProps) {
  const { t } = useLanguage()
  const heading = title ?? t.additionalServices.title
  const intro = subtitle ?? t.additionalServices.subtitle

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {showHeader && (
          <LazyLoadSection>
            <div className="mb-12 text-center md:mb-16">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{heading}</h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
              <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{intro}</p>
            </div>
          </LazyLoadSection>
        )}

        <LazyLoadSection delay={0.15}>
          <AdditionalServicesTable />
          <p className="mt-6 text-center text-sm text-zinc-400">{t.additionalServices.note}</p>
        </LazyLoadSection>
      </div>
    </section>
  )
}
