"use client"

import { LazyLoadSection } from "@/components/lazy-section"
import { OptimizedImage } from "@/components/optimized-image"
import { useLanguage } from "@/lib/i18n/language-context"

export function WhyChooseUsSection() {
  const { t } = useLanguage()

  return (
    <section id="why-choose-us" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-4">
        <LazyLoadSection>
          <div className="mb-16 text-center md:mb-20">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
              {t.whyChooseUs.title}
            </h2>
            <div className="mx-auto h-1 w-24 bg-primary"></div>
          </div>
        </LazyLoadSection>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-14">
          <LazyLoadSection delay={0.1} className="mx-auto w-full max-w-[300px] shrink-0 md:mx-0 md:max-w-none md:w-[320px] lg:w-[360px]">
            <div className="relative w-full">
              <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 rounded-full bg-primary/45 blur-[64px] md:blur-[56px]"
                aria-hidden
              />
              <div className="relative aspect-[819/1024] w-full overflow-hidden rounded-tl-3xl rounded-br-3xl">
                <OptimizedImage
                  src="/images/why-choose-us-team.png"
                  alt={t.whyChooseUs.imageAlt}
                  fill
                  className="relative h-full w-full"
                  loadingClassName="h-full w-full object-cover object-center"
                  sizes="(max-width: 768px) 300px, 360px"
                  quality={90}
                />
              </div>
            </div>
          </LazyLoadSection>

          <div className="min-w-0 flex-1 space-y-12 md:pl-4 lg:pl-6">
            {t.whyChooseUs.items.map((item, index) => (
              <LazyLoadSection key={item.title} delay={0.15 + index * 0.08}>
                <div className="relative">
                  <span
                    className="pointer-events-none absolute -left-2 -top-6 select-none text-[5.5rem] font-bold leading-none text-primary/[0.08] sm:-left-3 sm:-top-8 sm:text-[6.5rem] md:text-[7.5rem]"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div className="relative z-10">
                    <h3 className="mb-3 text-xl font-semibold text-primary sm:text-2xl">{item.title}</h3>
                    <p className="text-zinc-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </LazyLoadSection>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider"></div>
      <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
    </section>
  )
}
