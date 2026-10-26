"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LazyLoadSection } from "@/components/lazy-section"
import { getHomeUpholsteryCopy } from "@/lib/home-upholstery-copy"
import { toContentLocale } from "@/lib/i18n/locale"
import { useLanguage } from "@/lib/i18n/language-context"

export function HomeUpholsteryPackages() {
  const { language, t } = useLanguage()
  const copy = getHomeUpholsteryCopy(toContentLocale(language))

  return (
    <div className="grid gap-4 overflow-visible pt-3 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {copy.packages.map((pkg, index) => (
        <LazyLoadSection key={pkg.title} delay={0.1 * (index + 1)} className="h-full">
          <div className="relative mx-auto h-full w-full">
            <Card
              className={`glass-card relative flex h-full flex-col overflow-visible max-md:rounded-lg ${
                pkg.mostPopular
                  ? "border border-primary/45 shadow-[0_0_28px_-6px_hsl(var(--primary)/0.35)]"
                  : "border-0"
              }`}
            >
              {pkg.mostPopular ? (
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                  <span className="whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-black shadow-md max-md:px-3 max-md:py-1 max-md:text-[11px]">
                    {t.services.mostPopularLabel}
                  </span>
                </div>
              ) : null}
              <CardHeader className={`${pkg.mostPopular ? "pt-10 max-md:pt-9" : ""} max-md:p-5 max-md:pb-0`}>
                <CardTitle className="text-2xl text-primary max-md:text-xl">{pkg.title}</CardTitle>
                <CardDescription className="text-zinc-400 max-md:text-[13px]">{pkg.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 max-md:p-5 max-md:pt-4">
                <div className="mb-6 max-md:mb-4">
                  <p className="text-3xl font-bold text-white max-md:text-2xl">{copy.priceOnRequest}</p>
                </div>
                <ul className="space-y-3 max-md:space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-primary max-md:mr-1.5 max-md:h-4 max-md:w-4" aria-hidden />
                      <span className="text-zinc-300 max-md:text-[13px]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto max-md:p-5 max-md:pt-3">
                <Button
                  asChild
                  className={`w-full max-md:h-9 max-md:text-sm ${
                    pkg.mostPopular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <a href="#hero">{copy.selectPackage}</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </LazyLoadSection>
      ))}
    </div>
  )
}

export function HomeUpholsteryAddons() {
  const { language } = useLanguage()
  const copy = getHomeUpholsteryCopy(toContentLocale(language))

  return (
    <div className="mx-auto grid max-w-5xl gap-6 overflow-visible pt-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      {copy.addons.map((addon, index) => (
        <LazyLoadSection key={addon.title} delay={0.1 + index * 0.12} className="h-full">
          <Card className="glass-card flex h-full flex-col border-0 max-md:rounded-lg">
            <CardHeader className="max-md:p-5 max-md:pb-0">
              <CardTitle className="text-xl text-primary max-md:text-lg">{addon.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 max-md:p-5">
              <p className="text-sm text-zinc-400">{addon.description}</p>
              <p className="mt-4 text-lg font-semibold text-white">{copy.priceOnRequest}</p>
            </CardContent>
            <CardFooter className="mt-auto max-md:p-5 max-md:pt-0">
              <Button asChild className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20">
                <a href="#hero">{copy.selectPackage}</a>
              </Button>
            </CardFooter>
          </Card>
        </LazyLoadSection>
      ))}
    </div>
  )
}
