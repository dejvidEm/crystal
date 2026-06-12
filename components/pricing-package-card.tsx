"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  formatPriceLabel,
  packageOriginalPriceByCarSize,
  packagePriceByCarSize,
  type PackageData,
  type PackageKey,
} from "@/lib/pricing-data"
import { toContentLocale } from "@/lib/i18n/locale"
import { useCarSizeStore } from "@/lib/car-size-store"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"

interface PricingPackageCardProps {
  packageKey: PackageKey
  packageData: PackageData
  delay?: number
}

export function PricingPackageCard({ packageKey, packageData, delay = 0 }: PricingPackageCardProps) {
  const { carSize } = useCarSizeStore()
  const { language, t } = useLanguage()
  const lang = toContentLocale(language)
  const displayPrice = formatPriceLabel(packagePriceByCarSize(packageKey, carSize), lang)
  const originalPrice = formatPriceLabel(packageOriginalPriceByCarSize(packageKey, carSize), lang)

  return (
    <div className="relative h-full">
      <Card
        className={`glass-card relative flex h-full flex-col overflow-visible ${
          packageData.mostPopular
            ? "border border-primary/45 shadow-[0_0_28px_-6px_hsl(var(--primary)/0.35)]"
            : "border-0"
        }`}
      >
        {packageData.mostPopular && (
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <span className="whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-black shadow-md">
              {t.services.mostPopularLabel}
            </span>
          </div>
        )}
      <CardHeader className={packageData.mostPopular ? "pt-10" : undefined}>
        <CardTitle className="text-2xl text-primary">{packageData.title}</CardTitle>
        <CardDescription className="text-zinc-400">{packageData.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <p className="text-xl font-semibold text-zinc-400 line-through decoration-primary decoration-2">
            {originalPrice}
          </p>
          <p className="text-3xl font-bold text-white">{displayPrice}</p>
        </div>
        <ul className="space-y-3">
          {packageData.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>
        {packageData.footerNote && (
          <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-relaxed text-zinc-400">
            {packageData.footerNote}
          </p>
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          asChild
          className={`w-full ${packageData.mostPopular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white/10 hover:bg-white/20 text-white border border-white/20"}`}
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
