"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, ChevronRight, Clock, Instagram, MapPin, Phone, Sparkles, Truck, Calculator } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { LazyLoadSection } from "@/components/lazy-section"
import { OptimizedImage } from "@/components/optimized-image"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { VideoBackground } from "@/components/video-background"
import { HeroStats } from "@/components/hero-stats"
import { CarSizeSelector } from "@/components/car-size-selector"
import { PricingPackageCard } from "@/components/pricing-package-card"
import { PackagesTravelNote } from "@/components/pricing/packages-travel-note"
import { PackagesAvailabilityBadge } from "@/components/pricing/packages-availability-badge"
import { AdditionalServicesTable } from "@/components/additional-services-table"
import { getPackages } from "@/lib/pricing-data"
import { toContentLocale } from "@/lib/i18n/locale"
import { CustomerGallery } from "@/components/customer-gallery"
import { FloatingCalcButton } from "@/components/floating-calc-button"
import { ServiceStructuredData } from "@/components/structured-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BentoVideo } from "@/components/bento-video"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { BlogHomeSection } from "@/components/blog/blog-home-section"
import { ContactForm } from "@/components/contact-form"
import { bookioUrl, CONTACT_PHONE_TEL, SOCIAL_LINKS } from "@/lib/site-config"

import { ReviewCarousel } from "@/components/review-carousel"

export default function Home() {
  const { language, t } = useLanguage()

  // Scroll to section function
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const pkgs = getPackages(toContentLocale(language))

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
          {/* Structured Data for Services */}
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

          {/* Hero Section */}
          <section id="hero" className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <VideoBackground />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-44 text-center md:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <div className="mb-6 flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-100 backdrop-blur-sm shadow-[0_0_24px_-8px_rgba(251,191,36,0.45)]">
                      <Sparkles className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
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
                className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
              >
                <div className="flex items-center justify-center gap-3 sm:contents">
                  <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
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
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    {t.common.getQuote || "Get Quote"}
                  </Button>
                </Link>
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
                    typeof window !== "undefined" &&
                    window.matchMedia("(max-width: 767px)").matches
                  scrollToSection(mobile ? "handover-showcase" : "how-it-works")
                }}
                className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors cursor-pointer"
                role="button"
                aria-label="Scroll to results section"
              >
                <ChevronRight className="h-10 w-10 rotate-90" />
              </motion.div>
            </div>
          </section>

          {/* Handover showcase — full-width before / after */}
          <section
            id="handover-showcase"
            className="relative w-full overflow-hidden py-16 md:hidden"
          >
            <div className="pointer-events-none absolute inset-0">
              <Image
                src="/images/handover-after.png"
                alt={t.handoverShowcase.decorativeBackgroundAlt}
                fill
                className="object-cover opacity-[0.22]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className="mb-10 text-center md:mb-14"
              >
                <h2 className="text-balance text-3xl font-bold tracking-tight text-gradient sm:text-4xl md:text-5xl">
                  {t.handoverShowcase.title}
                </h2>
                <div className="mx-auto mt-5 h-1 w-24 bg-primary" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.08 }}
              >
                <BeforeAfterSlider
                  beforeSrc="/images/handover-before.png"
                  afterSrc="/images/handover-after.png"
                  beforeLabel={t.handoverShowcase.beforeLabel}
                  afterLabel={t.handoverShowcase.afterLabel}
                  beforeImageAlt={t.handoverShowcase.beforeImageAlt}
                  afterImageAlt={t.handoverShowcase.afterImageAlt}
                  dragHint={t.handoverShowcase.dragHint}
                />
              </motion.div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-24">
            <div className="container mx-auto px-4">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                    {t.howItWorks.title}
                  </h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.howItWorks.subtitle}</p>
                </div>
              </LazyLoadSection>

              <div className="relative grid gap-12 md:grid-cols-3">
                {/* Connecting lines between cards (visible on md screens and up) */}
                <div className="absolute top-1/2 left-0 right-0 hidden md:block">
                  <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
                </div>

                {/* Step 1 */}
                <LazyLoadSection delay={0.2}>
                  <div className="relative h-full">
                    {/* Step number */}
                    <div className="absolute -top-8 -left-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-black shadow-lg">
                      1
                    </div>

                    <div className="flex h-full flex-col items-center text-center bg-background p-8 pt-12 rounded-md relative z-0 opacity-100 border-4 border-border">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-10 w-10" aria-hidden="true" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold">{t.howItWorks.step1Title}</h3>
                      <p className="text-zinc-400">
                        {t.howItWorks.step1Description}
                      </p>
                    </div>
                  </div>
                </LazyLoadSection>

                {/* Step 2 */}
                <LazyLoadSection delay={0.4}>
                  <div className="relative h-full">
                    {/* Step number */}
                    <div className="absolute -top-8 -left-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-black shadow-lg">
                      2
                    </div>

                    <div className="flex h-full flex-col items-center text-center bg-background p-8 pt-12 rounded-md relative z-0 border-4 border-border">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-10 w-10" aria-hidden="true" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold">{t.howItWorks.step2Title}</h3>
                      <p className="text-zinc-400">
                        {t.howItWorks.step2Description}
                      </p>
                    </div>
                  </div>
                </LazyLoadSection>

                {/* Step 3 */}
                <LazyLoadSection delay={0.6}>
                  <div className="relative h-full">
                    {/* Step number */}
                    <div className="absolute -top-8 -left-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-black shadow-lg">
                      3
                    </div>

                    <div className="flex h-full flex-col items-center text-center bg-background p-8 pt-12 rounded-md relative z-0 border-4 border-border">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Truck className="h-10 w-10" aria-hidden="true" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold">{t.howItWorks.step3Title}</h3>
                      <p className="text-zinc-400">
                        {t.howItWorks.step3Description}
                      </p>
                    </div>
                  </div>
                </LazyLoadSection>
              </div>

              <LazyLoadSection delay={0.8}>
                <div className="mt-16 flex justify-center">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => scrollToSection("booking")}
                  >
                    {t.howItWorks.bookAppointment} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </LazyLoadSection>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <WhyChooseUsSection />

          {/* Services Section */}
          <section id="services" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background"></div>
            <div className="container mx-auto px-4 relative z-10">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <PackagesAvailabilityBadge />
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{t.services.title}</h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.services.subtitle}</p>
                  <CarSizeSelector />
                </div>
              </LazyLoadSection>

              <div className="grid gap-8 overflow-visible pt-4 md:grid-cols-2 lg:grid-cols-4">
                <LazyLoadSection delay={0.1} className="h-full">
                  <PricingPackageCard packageKey="refresh" packageData={pkgs.refresh} />
                </LazyLoadSection>

                <LazyLoadSection delay={0.2} className="h-full">
                  <PricingPackageCard packageKey="essential" packageData={pkgs.essential} />
                </LazyLoadSection>

                <LazyLoadSection delay={0.3} className="h-full">
                  <PricingPackageCard packageKey="exterior" packageData={pkgs.exterior} />
                </LazyLoadSection>

                <LazyLoadSection delay={0.4} className="h-full">
                  <PricingPackageCard packageKey="premium" packageData={pkgs.premium} />
                </LazyLoadSection>
              </div>
              <PackagesTravelNote />
            </div>
          </section>

          {/* Additional Services Section */}
          <section id="additional-services" className="py-24">
            <div className="container mx-auto px-4">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                    {t.additionalServices.title}
                  </h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.additionalServices.subtitle}</p>
                </div>
              </LazyLoadSection>

              <LazyLoadSection delay={0.2}>
                <AdditionalServicesTable />
                <p className="mt-6 text-sm text-zinc-400 text-center">{t.additionalServices.note}</p>
              </LazyLoadSection>
            </div>
          </section>

          {/* Sekcia „Čo môžete očakávať“ — dočasne skrytá */}
          {false && (
          <section id="what-to-expect" className="py-24">
            <div className="container mx-auto px-4">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                    {t.whatToExpect.title}
                  </h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.whatToExpect.subtitle}</p>
                </div>
              </LazyLoadSection>

              <div className="grid gap-8 md:grid-cols-2">
                <LazyLoadSection delay={0.2}>
                  <div className="group relative overflow-hidden rounded-lg h-80">
                    {/* Background image with zoom effect */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
                      <Image
                        src="/stvrta.jpg"
                        alt="Profesionálna konzultácia mobilného detailingu v Bratislave"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-primary mb-2">{t.whatToExpect.consultation.title}</h3>
                      <p className="text-zinc-200">{t.whatToExpect.consultation.description}</p>
                    </div>
                  </div>
                </LazyLoadSection>

                <LazyLoadSection delay={0.3}>
                  <div className="group relative overflow-hidden rounded-lg h-80">
                    {/* Background image with zoom effect */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
                      <Image
                        src="/druha.jpg"
                        alt="Dôsledná pozornosť detailom pri mobilnom detailingovom ošetrení"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-primary mb-2">{t.whatToExpect.attention.title}</h3>
                      <p className="text-zinc-200">{t.whatToExpect.attention.description}</p>
                    </div>
                  </div>
                </LazyLoadSection>

                <LazyLoadSection delay={0.4}>
                  <div className="group relative overflow-hidden rounded-lg h-80">
                    {/* Background image with zoom effect */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
                      <Image
                        src="/jedna.jpg"
                        alt="Prémiové produkty a vybavenie pre mobilný detailing"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-primary mb-2">{t.whatToExpect.products.title}</h3>
                      <p className="text-zinc-200">{t.whatToExpect.products.description}</p>
                    </div>
                  </div>
                </LazyLoadSection>

                <LazyLoadSection delay={0.5}>
                  <div className="group relative overflow-hidden rounded-lg h-80">
                    {/* Background image with zoom effect */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
                      <Image
                        src="/tretia.jpg"
                        alt="Pohodlie a flexibilita mobilného detailingu v Bratislave"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-primary mb-2">{t.whatToExpect.convenience.title}</h3>
                      <p className="text-zinc-200">{t.whatToExpect.convenience.description}</p>
                    </div>
                  </div>
                </LazyLoadSection>
              </div>
            </div>
          </section>
          )}

          {/* Media Bento Section */}
          <section id="media-bento" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background"></div>
            <div className="container mx-auto px-4 relative z-10">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                    {t.mediaBento?.title || "Výsledky v detailoch"}
                  </h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                    {t.mediaBento?.subtitle || "Viac z našej práce si môžete pozrieť na našom Instagrame."}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        <Instagram className="mr-2 h-5 w-5" />
                        {t.mediaBento?.instagramCta || "Sledujte nás na Instagrame"}
                      </Button>
                    </a>
                  </div>
                </div>
              </LazyLoadSection>

              <LazyLoadSection delay={0.2}>
                <div className="grid grid-flow-dense grid-cols-2 auto-rows-[110px] gap-4 sm:grid-cols-4 lg:grid-cols-8">
                  {/* Video 1 — portrait */}
                  <div className="group relative col-span-2 row-span-4 overflow-hidden rounded-xl border border-white/10 sm:col-span-1 lg:col-span-2 lg:row-span-5">
                    <BentoVideo
                      src="/bento/video/one.mov"
                      fallbackImage="/bento/photo/IMG_1814.jpg"
                      fallbackAlt={t.mediaBento.videoFallbackAlt}
                      fallbackSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute bottom-4 left-4 right-4">
                      <p className="text-sm font-medium text-white/90">
                        {t.mediaBento?.labels?.mobileStudio || "Mobilné štúdio v akcii"}
                      </p>
                    </div>
                  </div>

                  <div className="group relative col-span-2 row-span-4 overflow-hidden rounded-xl border border-white/10 sm:col-span-1 lg:col-span-2 lg:row-span-5">
                    <Image
                      src="/bento/photo/IMG_1813.jpg"
                      alt={t.mediaBento.photoAlts[0]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={82}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="group relative col-span-2 row-span-3 overflow-hidden rounded-xl border border-white/10 lg:col-span-4 lg:row-span-3">
                    <Image
                      src="/bento/photo/IMG_1814.jpg"
                      alt={t.mediaBento.photoAlts[1]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={82}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="group relative col-span-2 row-span-4 overflow-hidden rounded-xl border border-white/10 sm:col-span-1 lg:col-span-2 lg:row-span-4">
                    <Image
                      src="/bento/photo/IMG_1815.jpg"
                      alt={t.mediaBento.photoAlts[2]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={82}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Video 2 — portrait */}
                  <div className="group relative col-span-2 row-span-4 overflow-hidden rounded-xl border border-white/10 sm:col-span-1 lg:col-span-2 lg:row-span-4">
                    <BentoVideo
                      src="/bento/video/two.mov"
                      fallbackImage="/bento/photo/IMG_1817.jpg"
                      fallbackAlt={t.mediaBento.videoFallbackAlt}
                      fallbackSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="group relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-white/10 lg:col-span-2 lg:row-span-2">
                    <Image
                      src="/bento/photo/IMG_1816.jpg"
                      alt={t.mediaBento.photoAlts[3]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      quality={82}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="group relative col-span-2 row-span-2 overflow-hidden rounded-xl border border-white/10 lg:col-span-2 lg:row-span-2">
                    <Image
                      src="/bento/photo/IMG_1817.jpg"
                      alt={t.mediaBento.photoAlts[4]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      quality={82}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </LazyLoadSection>
            </div>
          </section>

          {/* Customer Gallery Section - Temporarily Commented Out
          <section id="gallery" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background"></div>
            <div className="container mx-auto px-4 relative z-10">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                    {t.gallery?.title || "Customer Showcase"}
                  </h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                    {t.gallery?.subtitle || "Explore our portfolio of premium detailing work on customer vehicles"}
                  </p>
                </div>
              </LazyLoadSection>

              <LazyLoadSection delay={0.2}>
                <CustomerGallery />
              </LazyLoadSection>
            </div>
          </section>
          */}

          {/* Blog Section */}
          <BlogHomeSection />

          {/* FAQ Section */}
          <section id="faq" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background"></div>
            <div className="container mx-auto px-4 relative z-10">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                    {t.faq?.title || "Často kladené otázky"}
                  </h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                    {t.faq?.subtitle || "Všetko dôležité o našom mobilnom detailingu na jednom mieste"}
                  </p>
                </div>
              </LazyLoadSection>

              <LazyLoadSection delay={0.2}>
                <Accordion type="single" collapsible defaultValue="faq-item-0" className="mx-auto flex w-full max-w-4xl flex-col gap-3">
                  {(t.faq?.items || []).map((item: { question: string; answer: string }, index: number) => (
                    <AccordionItem
                      key={index}
                      value={`faq-item-${index}`}
                      className="overflow-hidden rounded-xl border border-white/10 border-b-white/10 bg-black/30 backdrop-blur-md"
                    >
                      <AccordionTrigger className="px-4 py-4 text-left text-base text-white hover:no-underline sm:px-6 sm:text-lg">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-zinc-300 sm:px-6 sm:text-base">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </LazyLoadSection>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background"></div>
            <div className="container mx-auto px-4 relative z-10">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{t.reviews.title}</h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.reviews.subtitle}</p>
                </div>
              </LazyLoadSection>

              <LazyLoadSection delay={0.2}>
                <ReviewCarousel />
              </LazyLoadSection>
            </div>
          </section>

          {/* Booking CTA + Contact Form Section */}
          <section id="booking" className="py-24">
            <div className="container mx-auto px-4">
              <LazyLoadSection>
                <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-2">
                  <div className="glass-card flex flex-col justify-center rounded-md p-8 text-center shadow-2xl sm:p-12">
                    <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                      {t.booking.title}
                    </h2>
                    <p className="mb-8 text-zinc-400">{t.booking.description}</p>
                    <a
                      target="_blank"
                      href={bookioUrl(language)}
                      rel="noopener noreferrer"
                      className="inline-flex justify-center"
                    >
                      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {t.booking.bookAppointment} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                  <ContactForm />
                </div>
              </LazyLoadSection>
            </div>
          </section>

          {/* Footer */}
          <Footer />

          {/* Floating Calculator Button (Mobile Only) */}
          <FloatingCalcButton />
        </div>
  )
}
