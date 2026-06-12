"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import {
  ArrowDown,
  Briefcase,
  Building2,
  Car as CarIcon,
  Check,
  CheckCircle,
  Truck,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackToHomeLink } from "@/components/seo/back-to-home-link"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BusinessContactForm } from "@/components/pre-firmy/business-contact-form"
import { useLanguage } from "@/lib/i18n/language-context"
import { getPreFirmyCopy } from "@/lib/pre-firmy-copy"
import { toContentLocale } from "@/lib/i18n/locale"

const audienceIcons = [Building2, CarIcon, Truck, Briefcase] as const

function scrollToContact() {
  document.getElementById("firemny-kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function PreFirmyPageClient() {
  const { language, t } = useLanguage()
  const lang = toContentLocale(language)
  const copy = getPreFirmyCopy(lang)

  const heroRef = useRef<HTMLElement>(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] items-center overflow-hidden pt-28 md:pt-32"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/60 to-background" />
          <Image
            src="/images/van-with-logo.png"
            alt=""
            fill
            className="object-cover brightness-[0.55]"
            style={{ objectPosition: "60% center" }}
            priority
            sizes="100vw"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 pb-16 pt-8">
          <BackToHomeLink />
          <PageBreadcrumbs
            items={[
              { label: t.seo.breadcrumbHome, href: "/" },
              { label: t.seo.breadcrumbServices, href: "/#services" },
              { label: copy.hero.h1 },
            ]}
          />

          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-gradient">
              {copy.hero.h1}
            </h1>
            <div className="mx-auto mb-6 h-1 w-24 bg-primary" />
            <p className="mb-10 text-lg leading-relaxed text-zinc-300 md:text-xl">{copy.hero.lead}</p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {copy.hero.cta}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <main>
        {/* Stats */}
        <section className="border-y border-white/5 bg-zinc-950/50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-2xl font-bold text-gradient md:text-3xl">
              {copy.statsTitle}
            </h2>
            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {copy.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="text-center"
                >
                  <p className="mb-2 text-4xl font-bold text-primary md:text-5xl">{stat.value}</p>
                  <p className="text-sm leading-relaxed text-zinc-400 md:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gradient md:text-4xl">{copy.audienceTitle}</h2>
              <p className="text-zinc-400">{copy.audienceIntro}</p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {copy.audience.map((item, i) => {
                const Icon = audienceIcons[i] ?? Building2
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="glass-card rounded-lg p-6 md:p-8"
                  >
                    <Icon className="mb-4 h-8 w-8 text-primary" aria-hidden />
                    <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="border-t border-white/5 bg-zinc-950/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gradient md:text-4xl">{copy.whyTitle}</h2>
                <p className="mb-6 leading-relaxed text-zinc-400">{copy.whyIntro}</p>
              </div>
              <ul className="space-y-4">
                {copy.whyReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-zinc-300">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Package */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gradient md:text-4xl">{copy.packageTitle}</h2>
              <p className="text-zinc-400">{copy.packageIntro}</p>
            </div>

            <div className="mx-auto max-w-lg">
              <Card className="glass-card relative flex flex-col overflow-visible border border-primary/45 shadow-[0_0_28px_-6px_hsl(var(--primary)/0.35)]">
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                  <span className="whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-black shadow-md">
                    {t.nav.forBusiness}
                  </span>
                </div>
                <CardHeader className="pt-10">
                  <CardTitle className="text-2xl text-primary">{copy.packageName}</CardTitle>
                  <CardDescription className="text-zinc-400">{copy.packageSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <p className="text-2xl font-semibold text-primary">{copy.packagePriceLabel}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {lang === "sk"
                        ? "Podľa počtu vozidiel a rozsahu služieb"
                        : lang === "de"
                          ? "Nach Fahrzeuganzahl und Leistungsumfang"
                          : "Based on fleet size and scope"}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {copy.packageFeatures.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 shrink-0 text-primary" aria-hidden />
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={scrollToContact}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    {copy.packageCta}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="firemny-kontakt" className="scroll-mt-28 border-t border-white/5 bg-zinc-950/40 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gradient md:text-4xl">{copy.contactTitle}</h2>
              <p className="text-zinc-400">{copy.contactIntro}</p>
            </div>
            <BusinessContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PreFirmyPageClient
