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
    <div className="relative mx-auto h-full w-full max-md:max-w-[92%] max-md:origin-top max-md:scale-[0.96]">
      <Card
        className={`glass-card relative flex h-full flex-col overflow-visible max-md:rounded-lg ${
          packageData.mostPopular
            ? "border border-primary/45 shadow-[0_0_28px_-6px_hsl(var(--primary)/0.35)]"
            : "border-0"
        }`}
      >
        {packageData.mostPopular && (
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <span className="whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-black shadow-md max-md:px-3 max-md:py-1 max-md:text-[11px]">
              {t.services.mostPopularLabel}
            </span>
          </div>
        )}
      <CardHeader className={`${packageData.mostPopular ? "pt-10 max-md:pt-9" : ""} max-md:p-5 max-md:pb-0`}>
        <CardTitle className="text-2xl text-primary max-md:text-xl">{packageData.title}</CardTitle>
        <CardDescription className="text-zinc-400 max-md:text-[13px]">{packageData.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 max-md:p-5 max-md:pt-4">
        <div className="mb-6 max-md:mb-4">
          <p className="text-xl font-semibold text-zinc-400 line-through decoration-primary decoration-2 max-md:text-lg">
            {originalPrice}
          </p>
          <p className="text-3xl font-bold text-white max-md:text-2xl">{displayPrice}</p>
        </div>
        <ul className="space-y-3 max-md:space-y-2">
          {packageData.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 shrink-0 text-primary max-md:mr-1.5 max-md:h-4 max-md:w-4" aria-hidden="true" />
              <span className="text-zinc-300 max-md:text-[13px]">{feature}</span>
            </li>
          ))}
        </ul>
        {packageData.footerNote && (
          <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-relaxed text-zinc-400 max-md:mt-4 max-md:pt-3 max-md:text-xs">
            {packageData.footerNote}
          </p>
        )}
      </CardContent>
      <CardFooter className="mt-auto max-md:p-5 max-md:pt-3">
        <Button
          asChild
          className={`w-full max-md:h-9 max-md:text-sm ${packageData.mostPopular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white/10 hover:bg-white/20 text-white border border-white/20"}`}
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
