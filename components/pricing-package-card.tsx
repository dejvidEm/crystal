"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { PackageData } from "@/lib/pricing-data"
import { useCarSizeStore } from "@/lib/car-size-store"
import { useLanguage } from "@/lib/i18n/language-context"

interface PricingPackageCardProps {
  packageData: PackageData
  delay?: number
}

export function PricingPackageCard({ packageData, delay = 0 }: PricingPackageCardProps) {
  const { carSize } = useCarSizeStore()
  const { t } = useLanguage()

  return (
    <Card
      className={`glass-card border-0 overflow-hidden ${packageData.mostPopular ? "relative border-primary/20" : ""}`}
    >
      {packageData.mostPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase text-black">
            {t.services.premium.mostPopular}
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{packageData.title}</CardTitle>
        <CardDescription className="text-zinc-400">{packageData.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-3xl font-bold text-white">{packageData.price[carSize]}</div>
        <ul className="space-y-3">
          {packageData.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${packageData.mostPopular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white/10 hover:bg-white/20 text-white border border-white/20"}`}
        >
          {t.services.essential.selectPackage}
        </Button>
      </CardFooter>
    </Card>
  )
}
