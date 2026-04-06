"use client"

import { AdditionalServiceCard } from "@/components/additional-service-card"
import { LazyLoadSection } from "@/components/lazy-section"
import { additionalServices } from "@/lib/pricing-data"

export function AdditionalServicesTable() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {additionalServices.map((service, index) => (
        <LazyLoadSection key={service.name} delay={0.1 + index * 0.12}>
          <AdditionalServiceCard service={service} />
        </LazyLoadSection>
      ))}
    </div>
  )
}
