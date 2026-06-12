"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FAQPageStructuredData } from "@/components/structured-data"
import type { DistrictPageContent } from "@/lib/district-page-types"
import { getDistrictPageUi, getLocalizedDistrictData } from "@/lib/district-pages-i18n"
import { CONTACT_MAILTO, bookioUrl } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale } from "@/lib/i18n/locale"

export function DistrictSeoPage({ data }: { data: DistrictPageContent }) {
  const { language } = useLanguage()
  const locale = toContentLocale(language)
  const ui = getDistrictPageUi(locale)
  const page = getLocalizedDistrictData(data, locale)

  return (
    <>
      <FAQPageStructuredData faqs={page.faqs} />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />

        <main className="pt-24 pb-16">
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link href="/lokality" className="text-primary hover:underline text-sm mb-4 inline-block">
                  {ui.backToLocations}
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">{page.h1}</h1>
              <p className="text-xl text-zinc-300 mb-6 leading-relaxed">{page.lead}</p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+421918722720">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Phone className="mr-2 h-5 w-5" />
                    {ui.callButton}
                  </Button>
                </a>
                <a href={CONTACT_MAILTO}>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Mail className="mr-2 h-5 w-5" />
                    {ui.email}
                  </Button>
                </a>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient flex items-center gap-2">
                <MapPin className="h-8 w-8 text-primary" aria-hidden />
                {page.areasHeading ?? ui.areasHeadingDefault}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {page.areas.map((area) => (
                  <div key={area} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">{ui.whyTitle}</h2>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {ui.whyItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-300">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gradient">{ui.faqTitle}</h2>
              <div className="space-y-4">
                {page.faqs.map((faq, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                      <p className="text-zinc-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">{ui.ctaTitle}</h2>
                <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                  {page.ctaLead ?? ui.ctaLeadDefault}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {ui.bookButton}
                    </Button>
                  </a>
                  <Link href="/calc">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      {ui.quoteButton}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-zinc-400 mb-4">{ui.seeAlso}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#services" className="text-primary hover:underline">
                  {ui.ourServices}
                </Link>
                <Link href="/lokality" className="text-primary hover:underline">
                  {ui.allLocations}
                </Link>
                <Link href="/bratislava" className="text-primary hover:underline">
                  {ui.bratislavaLink}
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
