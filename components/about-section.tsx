"use client"

import { Check, Shield, Sparkles } from "lucide-react"
import { LazyLoadSection } from "@/components/lazy-section"
import { OptimizedImage } from "@/components/optimized-image"
import { useLanguage } from "@/lib/i18n/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  return (
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

      <div className="section-divider"></div>
      <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
    </section>
  )
}
