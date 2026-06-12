"use client"

import Link from "next/link"
import { ArrowRight, Check, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackToHomeLink } from "@/components/seo/back-to-home-link"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { useLanguage } from "@/lib/i18n/language-context"
import { getServicePageCopy, type ServicePageSlug } from "@/lib/service-pages-data"
import { toContentLocale } from "@/lib/i18n/locale"
import { bookioUrl } from "@/lib/site-config"

type ServiceLandingPageProps = {
  slug: ServicePageSlug
}

export function ServiceLandingPage({ slug }: ServiceLandingPageProps) {
  const { language, t } = useLanguage()
  const lang = toContentLocale(language)
  const copy = getServicePageCopy(slug, lang)
  if (!copy) return null

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="pb-20 pt-32 md:pt-36">
        <div className="container relative z-10 mx-auto px-4">
          <BackToHomeLink />
          <PageBreadcrumbs
            items={[
              { label: t.seo.breadcrumbHome, href: "/" },
              { label: t.seo.breadcrumbServices, href: "/#services" },
              { label: copy.h1 },
            ]}
          />

          <header className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl text-gradient">{copy.h1}</h1>
            <div className="mx-auto mb-6 h-1 w-24 bg-primary" />
            <p className="text-lg leading-relaxed text-zinc-300">{copy.lead}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t.servicePage.bookNow} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href="/calc">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  {t.servicePage.getQuote}
                </Button>
              </Link>
            </div>
          </header>

          <section className="mx-auto mb-16 max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gradient">{t.servicePage.highlightsTitle}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {copy.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {copy.sections.map((section) => (
            <section key={section.title} className="mx-auto mb-12 max-w-3xl">
              <h2 className="mb-4 text-2xl font-bold text-white">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mb-4 leading-relaxed text-zinc-300">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="mx-auto mb-16 max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gradient">{copy.includesTitle}</h2>
            <Card className="border-border bg-card/50">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {copy.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-zinc-300">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mx-auto mb-16 max-w-3xl">
            <h2 className="mb-4 text-xl font-semibold text-zinc-400">{t.servicePage.relatedTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {copy.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">{copy.ctaTitle}</h2>
            <p className="mb-6 text-zinc-400">{copy.ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/cennik">
                <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                  {t.nav.pricing}
                </Button>
              </Link>
              <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t.servicePage.bookNow}
                </Button>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
