"use client"

import type { LucideIcon } from "lucide-react"
import { Armchair, Sparkles, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { AdditionalServiceData, AdditionalServiceIcon } from "@/lib/pricing-data"
import { useCarSizeStore } from "@/lib/car-size-store"
import { useLanguage } from "@/lib/i18n/language-context"

const ICON_MAP: Record<AdditionalServiceIcon, LucideIcon> = {
  seats: Armchair,
  ozone: Wind,
  leather: Sparkles,
}

interface AdditionalServiceCardProps {
  service: AdditionalServiceData
}

export function AdditionalServiceCard({ service }: AdditionalServiceCardProps) {
  const { carSize } = useCarSizeStore()
  const { t } = useLanguage()
  const Icon = ICON_MAP[service.icon]

  return (
    <Card className="glass-card flex h-full flex-col overflow-hidden border-0">
      <CardHeader className="pb-2">
        <div className="mb-4 flex justify-center sm:justify-start">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-8 w-8 shrink-0" aria-hidden />
          </div>
        </div>
        <CardTitle className="text-2xl text-primary">{service.name.trim()}</CardTitle>
        <p className="sr-only">{service.description}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        <div className="mb-6 text-3xl font-bold text-white">{service.price[carSize]}</div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20">
          {t.services.essential.selectPackage}
        </Button>
      </CardFooter>
    </Card>
  )
}
