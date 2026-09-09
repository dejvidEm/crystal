"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CarSize } from "@/lib/pricing-data"
import { useCarSizeStore } from "@/lib/car-size-store"
import { useLanguage } from "@/lib/i18n/language-context"

const SIZE_ORDER: CarSize[] = ["small", "suv", "van"]

export function CarSizeSelector() {
  const { carSize, setCarSize } = useCarSizeStore()
  const { t } = useLanguage()
  const labels: Record<CarSize, { title: string; desc: string }> = {
    small: { title: t.carSizes.small, desc: t.carSizes.smallDesc },
    suv: { title: t.carSizes.suv, desc: t.carSizes.suvDesc },
    van: { title: t.carSizes.van, desc: t.carSizes.vanDesc },
  }

  return (
    <div className="mb-8 mt-6 flex w-full flex-col items-center">
      <Tabs value={carSize} onValueChange={(value) => setCarSize(value as CarSize)} className="w-full max-w-xl">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1">
          {SIZE_ORDER.map((size) => (
            <TabsTrigger
              key={size}
              value={size}
              className="h-auto flex-col whitespace-normal px-1.5 py-2 text-center leading-tight sm:px-3"
            >
              <span className="text-xs font-semibold sm:text-sm">{labels[size].title}</span>
              <span className="mt-0.5 text-[10px] font-normal text-current/70 sm:text-xs">
                {labels[size].desc}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
