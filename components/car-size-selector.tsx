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
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-zinc-300 mb-2 mt-8 text-sm">{t.carSizes.selectVehicleSize}</h3>
      <Tabs defaultValue={carSize} value={carSize} onValueChange={handleCarSizeChange} className="w-full max-w-md">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="small">{t.carSizes.small}</TabsTrigger>
          <TabsTrigger value="suv">{t.carSizes.suv}</TabsTrigger>
          <TabsTrigger value="van">{t.carSizes.van}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
