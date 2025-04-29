"use client"

import { useCarSizeStore } from "@/lib/car-size-store"
import { additionalServices } from "@/lib/pricing-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function AdditionalServicesTable() {
  const { carSize } = useCarSizeStore()
  const { t } = useLanguage()

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="py-4 px-4 text-left text-primary font-medium">{t.additionalServices.service}</th>
            <th className="py-4 px-4 text-left text-primary font-medium hidden md:table-cell">
              {t.additionalServices.description}
            </th>
            <th className="py-4 px-4 text-right text-primary font-medium">{t.additionalServices.price}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {additionalServices.map((item, index) => (
            <tr key={index} className="hover:bg-zinc-900/30 transition-colors">
              <td className="py-4 px-4 text-white">
                <div>{item.name}</div>
                <div className="text-zinc-400 text-sm mt-1 md:hidden">{item.description}</div>
              </td>
              <td className="py-4 px-4 text-zinc-300 hidden md:table-cell">{item.description}</td>
              <td className="py-4 px-4 text-right text-primary font-medium">{item.price[carSize]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
