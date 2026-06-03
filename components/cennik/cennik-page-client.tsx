"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { PackagesPricingSection } from "@/components/pricing/packages-pricing-section"
import { AdditionalServicesPricingSection } from "@/components/pricing/additional-services-pricing-section"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"

export function CennikPageClient() {
  const { language, t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <PageBreadcrumbs
            items={[
              { label: t.seo.breadcrumbHome, href: "/" },
              { label: t.seo.breadcrumbPricing },
            ]}
          />

          <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl text-gradient">{t.cennikPage.h1}</h1>
            <div className="mx-auto mb-6 h-1 w-24 bg-primary" />
            <p className="text-lg text-zinc-400">{t.cennikPage.intro}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t.common.bookNow} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href="/calc">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  {t.common.getQuote}
                </Button>
              </Link>
            </div>
          </header>
        </div>

        <PackagesPricingSection
          layout="grid"
          showHeader
          title={t.cennikPage.packagesHeading}
          subtitle={t.services.subtitle}
        />

        <AdditionalServicesPricingSection
          title={t.cennikPage.addonsHeading}
          subtitle={t.additionalServices.subtitle}
        />
      </main>
      <Footer />
    </div>
  )
}
