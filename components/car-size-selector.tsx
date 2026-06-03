"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CarSize } from "@/lib/pricing-data"
import { useCarSizeStore } from "@/lib/car-size-store"
import { useLanguage } from "@/lib/i18n/language-context"

export function CarSizeSelector() {
  const { carSize, setCarSize } = useCarSizeStore()
  const { t } = useLanguage()

  // Handle car size change
  const handleCarSizeChange = (value: string) => {
    setCarSize(value as CarSize)
  }

  return (
    <div className="mb-8 mt-6 flex flex-col items-center">
      <Tabs value={carSize} onValueChange={handleCarSizeChange} className="w-full max-w-md">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="small">{t.carSizes.small}</TabsTrigger>
          <TabsTrigger value="suv">{t.carSizes.suv}</TabsTrigger>
          <TabsTrigger value="van">{t.carSizes.van}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
