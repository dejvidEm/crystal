"use client"

import { AdditionalServiceCard } from "@/components/additional-service-card"
import { LazyLoadSection } from "@/components/lazy-section"
import { getAdditionalServices } from "@/lib/pricing-data"
import { toContentLocale } from "@/lib/i18n/locale"
import { useLanguage } from "@/lib/i18n/language-context"

export function AdditionalServicesTable() {
  const { language } = useLanguage()
  const rows = getAdditionalServices(toContentLocale(language))

  return (
    <div className="mx-auto grid max-w-4xl gap-8 overflow-visible pt-4 sm:grid-cols-2">
      {rows.map((service, index) => (
        <LazyLoadSection
          key={`${language}-${service.icon}-${index}`}
          delay={0.1 + index * 0.12}
          className="h-full"
        >
          <AdditionalServiceCard service={service} />
        </LazyLoadSection>
      ))}
    </div>
  )
}
