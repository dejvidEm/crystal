"use client"

import { lazy, Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, Check, ChevronRight, Clock, MapPin, Shield, Sparkles, Truck, Calculator } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { LazyLoadSection } from "@/components/lazy-section"
import { OptimizedImage } from "@/components/optimized-image"
import { Footer } from "@/components/footer"
import { LanguageWrapper } from "@/components/language-wrapper"
import { VideoBackground } from "@/components/video-background"
import { CarSizeSelector } from "@/components/car-size-selector"
import { PricingPackageCard } from "@/components/pricing-package-card"
import { AdditionalServicesTable } from "@/components/additional-services-table"
import { packages } from "@/lib/pricing-data"
import { MobileServiceBanner } from "@/components/mobile-service-banner"
import { CustomerGallery } from "@/components/customer-gallery"
import { FloatingCalcButton } from "@/components/floating-calc-button"
import { ServiceStructuredData } from "@/components/structured-data"

// Lazy load components that are not needed immediately
const ReviewCarousel = lazy(() =>
  import("@/components/review-carousel").then((mod) => ({ default: mod.ReviewCarousel })),
)

export default function Home() {
  // Scroll to section function
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <LanguageWrapper>
      {(t) => (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          {/* Structured Data for Services */}
          <ServiceStructuredData
            serviceType="Mobilný detailing áut"
            description="Prémiové mobilné detailingové služby pre luxusné vozidlá v Bratislave a okolí. Kompletná starostlivosť o exteriér a interiér vozidla."
            areas={["Bratislava", "Pezinok", "Senec", "Chorvátsky Grob"]}
          />
          <ServiceStructuredData
            serviceType="Tepovanie áut"
            description="Profesionálne hĺbkové čistenie a tepovanie textilných a kožených sedadiel. Odstránenie zápachov a znečistenia."
            areas={["Bratislava", "Pezinok", "Senec", "Chorvátsky Grob"]}
          />
          <ServiceStructuredData
            serviceType="Keramická ochrana"
            description="Aplikácia keramických povlakov na ochranu laku vozidla. Dlhodobá ochrana pred škodlivými vplyvmi."
            areas={["Bratislava", "Pezinok", "Senec", "Chorvátsky Grob"]}
          />

          <Navbar />

          {/* Hero Section */}
          <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <VideoBackground />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
                    <BadgeCheck className="h-4 w-4 text-yellow-400" />
                    Prvý v Bratislave
                  </span>
                </motion.div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="text-gradient">
                    {t.hero.title} <br className="hidden sm:block" />
                    {t.hero.titleHighlight}
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-zinc-300 sm:text-xl">{t.hero.subtitle}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              >
                <a href="https://services.bookio.com/crystal-detailing-ob6b7b8y/widget?lang=sk" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {t.common.bookNow} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/calc">
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
                onClick={() => scrollToSection("how-it-works")}
                className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors cursor-pointer"
                role="button"
                aria-label="Scroll to how it works section"
              >
                <ChevronRight className="h-10 w-10 rotate-90" />
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

                    <div className="flex h-full flex-col items-center text-center bg-background p-8 pt-12 rounded-md relative z-0 opacity-100 border border-border/50">
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

                    <div className="flex h-full flex-col items-center text-center bg-background p-8 pt-12 rounded-md relative z-0 border border-border/50">
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

                    <div className="flex h-full flex-col items-center text-center bg-background p-8 pt-12 rounded-md relative z-0 border border-border/50">
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

          {/* Mobile Service Banner */}
          <MobileServiceBanner />

          {/* About Us Section */}
          <section id="about" className="relative overflow-hidden py-24">
            <div className="container relative z-10 mx-auto px-4">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <LazyLoadSection>
                  <div className="mb-6">
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{t.about.title}</h2>
                    <div className="h-1 w-24 bg-primary"></div>
                  </div>
                  <div className="space-y-6 text-zinc-300">
                    <p>{t.about.paragraph1}</p>
                    <p>{t.about.paragraph2}</p>
                    <p>{t.about.paragraph3}</p>
                    <div className="flex flex-wrap gap-6 pt-4">
                      <div className="flex items-center gap-2 bg-primary/50 p-2 rounded-tl-2xl rounded-br-2xl">
                        <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span>{t.about.fullyInsured}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-primary/50 p-2 rounded-tl-2xl rounded-br-2xl">
                        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span>{t.about.premiumProducts}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-primary/50 p-2 rounded-tl-2xl rounded-br-2xl">
                        <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span>{t.about.certifiedDetailers}</span>
                      </div>
                    </div>
                  </div>
                </LazyLoadSection>

                <LazyLoadSection delay={0.3}>
                  <div className="relative mx-auto overflow-hidden">
                    <div className="relative z-0 flex h-full items-center justify-center p-8">
                      <OptimizedImage
                        src="/images/porsche.jpg"
                        alt="Luxusné vozidlo po prémiovom mobilnom detailingovom ošetrení v Bratislave"
                        width={700}
                        height={500}
                        className="object-contain rounded-tl-3xl rounded-br-3xl"
                        priority
                        sizes="(max-width: 768px) 120vw, 700px"
                        quality={90}
                      />
                    </div>
                  </div>
                </LazyLoadSection>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="section-divider"></div>
            <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background"></div>
            <div className="container mx-auto px-4 relative z-10">
              <LazyLoadSection>
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{t.services.title}</h2>
                  <div className="h-1 w-24 mx-auto bg-primary"></div>
                  <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.services.subtitle}</p>
                  <CarSizeSelector />
                </div>
              </LazyLoadSection>

              <div className="grid gap-8 md:grid-cols-3">
                <LazyLoadSection delay={0.2}>
                  <PricingPackageCard packageData={packages.essential} />
                </LazyLoadSection>

                <LazyLoadSection delay={0.4}>
                  <PricingPackageCard packageData={packages.premium} />
                </LazyLoadSection>

                <LazyLoadSection delay={0.6}>
                  <PricingPackageCard packageData={packages.ultimate} />
                </LazyLoadSection>
              </div>
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
                  <CarSizeSelector />
                </div>
              </LazyLoadSection>

              <LazyLoadSection delay={0.2}>
                <AdditionalServicesTable />
                <p className="mt-6 text-sm text-zinc-400 text-center">{t.additionalServices.note}</p>
              </LazyLoadSection>
            </div>
          </section>

          {/* What to Expect Section */}
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
                <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading reviews...</div>}>
                  <ReviewCarousel />
                </Suspense>
              </LazyLoadSection>
            </div>
          </section>

          {/* Booking CTA Section */}
          <section id="booking" className="py-24">
            <div className="container mx-auto px-4">
              <LazyLoadSection>
                <div className="mx-auto max-w-3xl glass-card p-8 text-center shadow-2xl sm:p-12 rounded-md">
                  <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{t.booking.title}</h2>
                  <p className="mb-8 text-zinc-400">{t.booking.description}</p>
                  <a target="_blank" href="https://services.bookio.com/crystal-detailing-ob6b7b8y/widget?lang=sk" rel="noopener noreferrer">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {t.booking.bookAppointment} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </LazyLoadSection>
            </div>
          </section>

          {/* Footer */}
          <Footer />

          {/* Floating Calculator Button (Mobile Only) */}
          <FloatingCalcButton />
        </div>
      )}
    </LanguageWrapper>
  )
}
