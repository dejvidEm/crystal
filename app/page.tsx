"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calculator, ChevronRight, Phone, Sparkles } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { HomeBelowFold } from "@/components/home-below-fold"
import { useLanguage } from "@/lib/i18n/language-context"
import { VideoBackground } from "@/components/video-background"
import { HeroStats } from "@/components/hero-stats"
import { HeroAvailabilityBadge } from "@/components/hero-availability-badge"
import { ServiceStructuredData } from "@/components/structured-data"
import { bookioUrl, CONTACT_PHONE_TEL } from "@/lib/site-config"

export default function Home() {
  const { language, t } = useLanguage()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const serviceAreas = [
    "Bratislava",
    "Pezinok",
    "Senec",
    "Chorvátsky Grob",
    "Malacky",
    "Senica",
    "Skalica",
    "Trnava",
    "Galanta",
    "Dunajská Streda",
    "Hainburg an der Donau",
    "Bruck an der Leitha",
    "Eisenstadt",
    "Schwechat",
    "Wien",
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ServiceStructuredData
        serviceType="Mobilný detailing áut"
        description="Prémiové mobilné detailingové služby pre luxusné vozidlá v Bratislave a okolí. Kompletná starostlivosť o exteriér a interiér vozidla."
        areas={serviceAreas}
      />
      <ServiceStructuredData
        serviceType="Tepovanie áut"
        description="Profesionálne hĺbkové čistenie a tepovanie textilných a kožených sedadiel. Odstránenie zápachov a znečistenia."
        areas={serviceAreas}
      />
      <ServiceStructuredData
        serviceType="Keramická ochrana"
        description="Aplikácia keramických povlakov na ochranu laku vozidla. Dlhodobá ochrana pred škodlivými vplyvmi."
        areas={serviceAreas}
      />

      <Navbar />

      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <VideoBackground />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-44 text-center md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="hidden flex-col items-center gap-3 md:mb-6 md:flex">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-5 py-2.5 text-sm font-semibold text-amber-100 shadow-[0_0_28px_-8px_rgba(251,191,36,0.5)] backdrop-blur-sm sm:px-6 sm:py-3 sm:text-base">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-300 sm:h-5 sm:w-5" aria-hidden />
                  {t.hero.promoBadge}
                </span>
              </motion.div>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-gradient">
                {t.hero.title}
                {t.hero.titleHighlight ? (
                  <>
                    {" "}
                    <br className="hidden sm:block" />
                    {t.hero.titleHighlight}
                  </>
                ) : null}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-300 sm:text-xl">{t.hero.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col items-center gap-4 md:gap-6"
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <div className="flex items-center justify-center gap-3 sm:contents">
                <a href={bookioUrl(language)}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t.common.bookNow} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href={CONTACT_PHONE_TEL} className="shrink-0 md:hidden" aria-label={t.common.callNow}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-11 w-11 shrink-0 border-white/25 bg-white/5 p-0 text-white hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5" aria-hidden />
                  </Button>
                </a>
              </div>
              <Link href="/calc" id="hero-get-quote">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Calculator className="mr-2 h-4 w-4" />
                  {t.common.getQuote || "Get Quote"}
                </Button>
              </Link>
            </div>
            <HeroAvailabilityBadge />
          </motion.div>
        </div>
        <HeroStats />
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              delay: 1,
              duration: 2,
              y: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            onClick={() => {
              const mobile =
                typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
              scrollToSection(mobile ? "handover-showcase" : "how-it-works")
            }}
            className="flex cursor-pointer items-center gap-2 text-zinc-400 transition-colors hover:text-primary"
            role="button"
            aria-label="Scroll to results section"
          >
            <ChevronRight className="h-10 w-10 rotate-90" />
          </motion.div>
        </div>
      </section>

      <HomeBelowFold />
    </div>
  )
}
