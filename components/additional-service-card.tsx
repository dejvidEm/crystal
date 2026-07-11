"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { AdditionalServiceData } from "@/lib/pricing-data"
import {
  formatPriceLabel,
  upholsteryOriginalPriceByCarSize,
  upholsteryPriceByCarSize,
} from "@/lib/pricing-data"
import { toContentLocale } from "@/lib/i18n/locale"
import { useCarSizeStore } from "@/lib/car-size-store"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"

interface AdditionalServiceCardProps {
  service: AdditionalServiceData
}

export function AdditionalServiceCard({ service }: AdditionalServiceCardProps) {
  const { carSize } = useCarSizeStore()
  const { language, t } = useLanguage()
  const lang = toContentLocale(language)

  const displayPrice =
    service.pricingTier === "upholstery"
      ? formatPriceLabel(upholsteryPriceByCarSize(carSize), lang)
      : service.price[carSize]

  const originalPrice = service.showDiscount
    ? service.pricingTier === "upholstery"
      ? formatPriceLabel(upholsteryOriginalPriceByCarSize(carSize), lang)
      : null
    : null

  const compact = service.compact === true

  return (
    <div className={`relative h-full ${compact ? "mx-auto w-full max-w-sm" : ""}`}>
      <Card
        className={`glass-card relative flex h-full flex-col overflow-visible border-0 ${
          compact ? "border border-white/10" : ""
        }`}
      >
        <CardHeader className={compact ? "px-5 pb-3 pt-5 sm:px-6" : undefined}>
          <CardTitle className={`text-primary ${compact ? "text-xl" : "text-2xl"}`}>{service.name}</CardTitle>
          <CardDescription className={`text-zinc-400 ${compact ? "text-sm" : ""}`}>
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className={`flex-1 ${compact ? "px-5 pb-4 sm:px-6" : ""}`}>
          <div className="mb-5 flex flex-wrap items-baseline gap-2 sm:mb-6">
            {originalPrice && (
              <span className="text-lg font-semibold text-zinc-400 line-through decoration-primary decoration-2 sm:text-xl">
                {originalPrice}
              </span>
            )}
            <span className={`font-bold text-white ${compact ? "text-2xl" : "text-3xl"}`}>{displayPrice}</span>
          </div>
          <ul className={`space-y-2.5 ${compact ? "text-sm" : "space-y-3"}`}>
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check
                  className={`mr-2 shrink-0 text-primary ${compact ? "mt-0.5 h-4 w-4" : "h-5 w-5"}`}
                  aria-hidden="true"
                />
                <span className="text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
          {service.footerNote && (
            <p
              className={`border-t border-white/10 pt-4 leading-relaxed text-zinc-400 ${
                compact ? "mt-4 text-xs sm:text-sm" : "mt-6 text-sm"
              }`}
            >
              {service.footerNote}
            </p>
          )}
        </CardContent>
        <CardFooter className={`mt-auto ${compact ? "px-5 pb-5 sm:px-6" : ""}`}>
          <Button
            asChild
            size={compact ? "default" : "default"}
            className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
              {t.services.essential.selectPackage}
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
