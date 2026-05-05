"use client"

import { AdditionalServiceCard } from "@/components/additional-service-card"
import { LazyLoadSection } from "@/components/lazy-section"
import { additionalServices, additionalServicesEn } from "@/lib/pricing-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function AdditionalServicesTable() {
  const { language } = useLanguage()
  const rows = language === "en" ? additionalServicesEn : additionalServices

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((service, index) => (
        <LazyLoadSection key={`${language}-${service.icon}-${index}`} delay={0.1 + index * 0.12}>
          <AdditionalServiceCard service={service} />
        </LazyLoadSection>
      ))}
    </div>
  )
}
