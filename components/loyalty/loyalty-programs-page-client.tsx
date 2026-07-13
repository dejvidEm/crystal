"use client"

import { ArrowRight, CalendarCheck, Car, Check, CreditCard, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackToHomeLink } from "@/components/seo/back-to-home-link"
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale } from "@/lib/i18n/locale"
import { getLoyaltyProgramsCopy } from "@/lib/loyalty-programs-copy"
import { bookioUrl, CONTACT_MAILTO } from "@/lib/site-config"

const stepIcons = [Sparkles, CreditCard, CalendarCheck, Car] as const

export default function LoyaltyProgramsPageClient() {
  const { language, t } = useLanguage()
  const copy = getLoyaltyProgramsCopy(toContentLocale(language))

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="pt-28 pb-20 md:pt-32">
        <div className="container mx-auto px-4">
          <BackToHomeLink />
          <PageBreadcrumbs
            items={[
              { label: t.seo.breadcrumbHome, href: "/" },
              { label: copy.breadcrumb },
            ]}
          />

          <header className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-gradient">{copy.hero.h1}</h1>
            <div className="mx-auto mb-6 h-1 w-24 bg-primary" />
            <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">{copy.hero.lead}</p>
          </header>
        </div>

        <section className="border-y border-white/5 bg-zinc-950/50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gradient md:text-4xl">{copy.howTitle}</h2>
              <p className="text-zinc-400">{copy.howIntro}</p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.steps.map((step, index) => {
                const Icon = stepIcons[index] ?? Sparkles
                return (
                  <div key={step.title} className="glass-card rounded-lg p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-primary">0{index + 1}</p>
                    <h3 className="mb-2 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gradient md:text-4xl">{copy.programsTitle}</h2>
              <p className="text-zinc-400">{copy.programsIntro}</p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
              {copy.programs.map((program) => (
                <div key={program.key} className="relative h-full">
                  <Card
                    className={`glass-card relative flex h-full flex-col overflow-visible ${
                      program.mostPopular
                        ? "border border-primary/45 shadow-[0_0_28px_-6px_hsl(var(--primary)/0.35)]"
                        : "border-0"
                    }`}
                  >
                    {program.mostPopular && (
                      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                        <span className="whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-black shadow-md">
                          {t.services.mostPopularLabel}
                        </span>
                      </div>
                    )}
                    <CardHeader className={program.mostPopular ? "pt-10" : undefined}>
                      <CardTitle className="text-2xl text-primary">{program.title}</CardTitle>
                      <CardDescription className="text-zinc-400">{program.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-6 space-y-2">
                        <p className="text-2xl font-bold text-white">{program.prepayLabel}</p>
                        <p className="text-sm text-zinc-400">{program.monthlyLabel}</p>
                        <p className="text-sm font-medium text-primary">{program.savingsLabel}</p>
                        <p className="text-xs text-zinc-500">{program.frequencyLabel}</p>
                        <p className="text-xs text-zinc-500">{copy.carSizeNote}</p>
                      </div>
                      <ul className="space-y-3">
                        {program.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="mr-2 h-5 w-5 shrink-0 text-primary" aria-hidden />
                            <span className="text-zinc-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button
                        asChild
                        className={`w-full ${
                          program.mostPopular
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
                          {copy.ctaButton}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-zinc-950/30 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gradient md:text-4xl">{copy.benefitsTitle}</h2>
                <ul className="space-y-4">
                  {copy.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                      <span className="text-zinc-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-lg p-6 md:p-8">
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.noteTitle}</h3>
                <p className="leading-relaxed text-zinc-400">{copy.noteBody}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="glass-card mx-auto max-w-3xl rounded-lg p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-gradient">{copy.ctaTitle}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-zinc-400">{copy.ctaBody}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {copy.ctaButton} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href={CONTACT_MAILTO}>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    {copy.ctaSecondary}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
