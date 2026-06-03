"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { AdditionalServiceData } from "@/lib/pricing-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"

interface AdditionalServiceCardProps {
  service: AdditionalServiceData
}

export function AdditionalServiceCard({ service }: AdditionalServiceCardProps) {
  const { language, t } = useLanguage()
  const displayPrice = service.price.small

  return (
    <div className="relative h-full">
      <Card className="glass-card relative flex h-full flex-col overflow-visible border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{service.name}</CardTitle>
          <CardDescription className="text-zinc-400">{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="mb-6 flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{displayPrice}</span>
          </div>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="mr-2 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
          {service.footerNote && (
            <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-relaxed text-zinc-400">
              {service.footerNote}
            </p>
          )}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button asChild className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20">
            <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
              {t.services.essential.selectPackage}
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
