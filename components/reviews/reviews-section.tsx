"use client"

import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { GoogleLogo } from "@/components/google-logo"
import { LazyLoadSection } from "@/components/lazy-section"
import { ReviewMarquee } from "@/components/review-marquee"
import { useLanguage } from "@/lib/i18n/language-context"
import { GOOGLE_REVIEWS_URL } from "@/lib/site-config"

export function ReviewsSection() {
  const { t } = useLanguage()

  return (
    <section id="reviews" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/90 to-background" />
      <div className="container relative z-10 mx-auto px-4">
        <LazyLoadSection>
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">{t.reviews.title}</h2>
            <div className="mx-auto mb-6 h-1 w-24 bg-primary" />

            <div className="mx-auto flex max-w-md flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
              <GoogleLogo />
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="text-lg font-bold text-white sm:text-xl">{t.reviews.googleRatingValue}</span>
                <div className="flex" aria-label={t.reviews.googleRatingAria}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400 sm:h-5 sm:w-5"
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-400 sm:text-sm">{t.reviews.googleReviewCount}</span>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.reviews.subtitle}</p>
          </div>
        </LazyLoadSection>

        <LazyLoadSection delay={0.2}>
          <ReviewMarquee />
        </LazyLoadSection>

        <LazyLoadSection delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Link
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:text-base"
            >
              {t.reviews.viewAllGoogleReviews}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </LazyLoadSection>
      </div>
    </section>
  )
}
