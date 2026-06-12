"use client"

import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  austriaHubLocations,
  getHubDistrictCard,
  getLocationsHubCopy,
  slovakDistrictHubLocations,
} from "@/lib/locations-hub-data"
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale } from "@/lib/i18n/locale"

export function LocationsHubPageClient() {
  const { language } = useLanguage()
  const locale = toContentLocale(language)
  const copy = getLocationsHubCopy(locale)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">{copy.h1}</h1>
            <p className="text-xl text-zinc-300 mb-4">{copy.heroP1}</p>
            <p className="text-zinc-400">{copy.heroP2}</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gradient">
            {copy.sectionBratislavaTitle}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {copy.coreLocations.map((location) => (
              <Card key={location.slug} className="border-border bg-card hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                      <p className="text-zinc-400 mb-4">{location.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-zinc-300 mb-2">{copy.coverageAreas}</p>
                        <div className="flex flex-wrap gap-2">
                          {location.areas.map((area) => (
                            <span
                              key={area}
                              className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link href={location.slug}>
                        <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                          {copy.moreInfo} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="rakusko" className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gradient">
            {copy.sectionAustriaTitle}
          </h2>
          <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-10">{copy.sectionAustriaIntro}</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {austriaHubLocations.map((location) => {
              const card = getHubDistrictCard(location, locale)
              return (
                <Card
                  key={location.path}
                  className="border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-4">{card.description}</p>
                        <Link href={location.path}>
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            {copy.moreInfo} <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gradient">
            {copy.sectionDistrictsTitle}
          </h2>
          <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-10">{copy.sectionDistrictsIntro}</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {slovakDistrictHubLocations.map((district) => {
              const card = getHubDistrictCard(district, locale)
              return (
                <Card
                  key={district.path}
                  className="border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-4">{card.description}</p>
                        <Link href={district.path}>
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            {copy.moreInfo} <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">{copy.ctaTitle}</h2>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">{copy.ctaLead}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+421918722720">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {copy.callButton}
                  </Button>
                </a>
                <a href={CONTACT_MAILTO}>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Email: {CONTACT_EMAIL}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-zinc-400 mb-4">{copy.seeAlso}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#services" className="text-primary hover:underline">
                {copy.linkServices}
              </Link>
              <Link href="/#how-it-works" className="text-primary hover:underline">
                {copy.linkHowItWorks}
              </Link>
              <Link href="/calc" className="text-primary hover:underline">
                {copy.linkCalculator}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
