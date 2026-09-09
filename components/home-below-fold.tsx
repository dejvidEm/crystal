"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock, Instagram, MapPin, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LazyLoadSection } from "@/components/lazy-section"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { CarSizeSelector } from "@/components/car-size-selector"
import { PricingPackageCard } from "@/components/pricing-package-card"
import { PackagesTravelNote } from "@/components/pricing/packages-travel-note"
import { PackagesAvailabilityBadge } from "@/components/pricing/packages-availability-badge"
import { AdditionalServicesTable } from "@/components/additional-services-table"
import { getPackages } from "@/lib/pricing-data"
import { toContentLocale } from "@/lib/i18n/locale"
import { MediaGallery } from "@/components/media-gallery"
import { FloatingCalcButton } from "@/components/floating-calc-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { BlogHomeSection } from "@/components/blog/blog-home-section"
import { ContactForm } from "@/components/contact-form"
import { bookioUrl, SOCIAL_LINKS } from "@/lib/site-config"
import { ReviewsSection } from "@/components/reviews/reviews-section"

export function HomeBelowFold() {
  const { language, t } = useLanguage()
  const pkgs = getPackages(toContentLocale(language))

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section id="handover-showcase" className="relative w-full overflow-hidden py-16 md:hidden">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/handover-after.png"
            alt={t.handoverShowcase.decorativeBackgroundAlt}
            fill
            className="object-cover opacity-[0.22]"
            sizes="100vw"
            quality={70}
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
              beforeSrc="/images/desktop-ba-interior-before.jpg"
              afterSrc="/images/desktop-ba-interior-after.jpg"
              beforeLabel={t.handoverShowcase.beforeLabel}
              afterLabel={t.handoverShowcase.afterLabel}
              beforeImageAlt={t.handoverShowcase.beforeImageAlt}
              afterImageAlt={t.handoverShowcase.afterImageAlt}
              dragHint={t.handoverShowcase.dragHint}
            />
          </motion.div>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={bookioUrl(language)}>
                {t.handoverShowcase.sameResultCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="handover-showcase-desktop" className="relative hidden w-full overflow-hidden py-20 md:block">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/handover-after.png"
            alt={t.handoverShowcase.decorativeBackgroundAlt}
            fill
            className="object-cover opacity-[0.22]"
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mb-12 text-center"
          >
            <h2 className="text-balance text-4xl font-bold tracking-tight text-gradient md:text-5xl">
              {t.handoverShowcase.title}
            </h2>
            <div className="mx-auto mt-5 h-1 w-24 bg-primary" />
          </motion.div>

          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <BeforeAfterSlider
                beforeSrc="/images/desktop-ba-trunk-before.jpg"
                afterSrc="/images/desktop-ba-trunk-after.jpg"
                beforeLabel={t.handoverShowcase.beforeLabel}
                afterLabel={t.handoverShowcase.afterLabel}
                beforeImageAlt={t.handoverShowcase.beforeImageAlt}
                afterImageAlt={t.handoverShowcase.afterImageAlt}
                className="aspect-[16/10] max-h-[min(42vh,440px)]"
                sizes="(min-width: 768px) 46vw, 100vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              <BeforeAfterSlider
                beforeSrc="/images/desktop-ba-interior-before.jpg"
                afterSrc="/images/desktop-ba-interior-after.jpg"
                beforeLabel={t.handoverShowcase.beforeLabel}
                afterLabel={t.handoverShowcase.afterLabel}
                beforeImageAlt={t.handoverShowcase.beforeImageAlt}
                afterImageAlt={t.handoverShowcase.afterImageAlt}
                className="aspect-[16/10] max-h-[min(42vh,440px)]"
                sizes="(min-width: 768px) 46vw, 100vw"
              />
            </motion.div>
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={bookioUrl(language)}>
                {t.handoverShowcase.sameResultCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section id="services" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background" />
        <div className="container relative z-10 mx-auto px-4">
          <LazyLoadSection>
            <div className="mb-16 text-center">
              <PackagesAvailabilityBadge />
              <h2 className="mb-4 text-3xl font-bold text-gradient sm:text-4xl md:text-5xl">{t.services.title}</h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
              <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.services.subtitle}</p>
              <CarSizeSelector />
            </div>
          </LazyLoadSection>

          <div className="grid gap-6 overflow-visible pt-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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

      <section id="additional-services" className="py-24">
        <div className="container mx-auto px-4">
          <LazyLoadSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gradient sm:text-4xl md:text-5xl">
                {t.additionalServices.title}
              </h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
              <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.additionalServices.subtitle}</p>
            </div>
          </LazyLoadSection>
          <LazyLoadSection delay={0.2}>
            <AdditionalServicesTable />
            <p className="mt-6 text-center text-sm text-zinc-400">{t.additionalServices.note}</p>
          </LazyLoadSection>
        </div>
      </section>

      <section id="media-bento" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background" />
        <div className="container relative z-10 mx-auto px-4">
          <LazyLoadSection>
            <div className="mb-8 text-center md:mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gradient sm:text-4xl md:text-5xl">
                {t.mediaBento?.title || "Výsledky v detailoch"}
              </h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
              <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                {t.mediaBento?.subtitle || "Viac z našej práce si môžete pozrieť na našom Instagrame."}
              </p>
              <div className="mt-8 flex justify-center">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Instagram className="mr-2 h-5 w-5" />
                    {t.mediaBento?.instagramCta || "Sledujte nás na Instagrame"}
                  </Button>
                </a>
              </div>
            </div>
          </LazyLoadSection>
          <LazyLoadSection delay={0.2}>
            <MediaGallery />
          </LazyLoadSection>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <LazyLoadSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
                {t.howItWorks.title}
              </h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
              <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.howItWorks.subtitle}</p>
            </div>
          </LazyLoadSection>

          <div className="relative grid gap-12 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-1/2 hidden md:block">
              <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            </div>

            <LazyLoadSection delay={0.2}>
              <div className="relative h-full">
                <div className="absolute -left-4 -top-8 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-black shadow-lg">
                  1
                </div>
                <div className="relative z-0 flex h-full flex-col items-center rounded-md border-4 border-border bg-background p-8 pt-12 text-center opacity-100">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{t.howItWorks.step1Title}</h3>
                  <p className="text-zinc-400">{t.howItWorks.step1Description}</p>
                </div>
              </div>
            </LazyLoadSection>

            <LazyLoadSection delay={0.4}>
              <div className="relative h-full">
                <div className="absolute -left-4 -top-8 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-black shadow-lg">
                  2
                </div>
                <div className="relative z-0 flex h-full flex-col items-center rounded-md border-4 border-border bg-background p-8 pt-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{t.howItWorks.step2Title}</h3>
                  <p className="text-zinc-400">{t.howItWorks.step2Description}</p>
                </div>
              </div>
            </LazyLoadSection>

            <LazyLoadSection delay={0.6}>
              <div className="relative h-full">
                <div className="absolute -left-4 -top-8 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-black shadow-lg">
                  3
                </div>
                <div className="relative z-0 flex h-full flex-col items-center rounded-md border-4 border-border bg-background p-8 pt-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Truck className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{t.howItWorks.step3Title}</h3>
                  <p className="text-zinc-400">{t.howItWorks.step3Description}</p>
                </div>
              </div>
            </LazyLoadSection>
          </div>

          <LazyLoadSection delay={0.8}>
            <div className="mt-16 flex justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={scrollToBooking}
              >
                {t.howItWorks.bookAppointment} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </LazyLoadSection>
        </div>
      </section>

      <WhyChooseUsSection />

      <BlogHomeSection />

      <section id="faq" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background" />
        <div className="container relative z-10 mx-auto px-4">
          <LazyLoadSection>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gradient sm:text-4xl md:text-5xl">
                {t.faq?.title || "Často kladené otázky"}
              </h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
              <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
                {t.faq?.subtitle || "Všetko dôležité o našom mobilnom detailingu na jednom mieste"}
              </p>
            </div>
          </LazyLoadSection>
          <LazyLoadSection delay={0.2}>
            <Accordion
              type="single"
              collapsible
              defaultValue="faq-item-0"
              className="mx-auto flex w-full max-w-4xl flex-col gap-3"
            >
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

      <section id="booking" className="py-24">
        <div className="container mx-auto px-4">
          <LazyLoadSection>
            <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-2">
              <div className="glass-card flex flex-col justify-center rounded-md p-8 text-center shadow-2xl sm:p-12">
                <h2 className="mb-6 text-3xl font-bold text-gradient sm:text-4xl md:text-5xl">{t.booking.title}</h2>
                <p className="mb-8 text-zinc-400">{t.booking.description}</p>
                <a href={bookioUrl(language)} className="inline-flex justify-center">
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

      <Footer />
      <FloatingCalcButton />
    </>
  )
}
