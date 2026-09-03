"use client"

import { CircleUser, Star } from "lucide-react"
import { GoogleLogo } from "@/components/google-logo"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale } from "@/lib/i18n/locale"
import { getFeaturedReviews, type CarouselReview } from "@/lib/review-carousel-data"

function ReviewCard({ review }: { review: CarouselReview }) {
  const { t } = useLanguage()

  return (
    <article className="glass-card flex h-full flex-col rounded-lg border border-white/10 p-5 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-zinc-900/60"
          aria-hidden
        >
          <CircleUser className="h-6 w-6 text-primary/80" strokeWidth={1.25} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-semibold text-white">{review.name}</p>
          <div className="flex" aria-label={`${review.rating} / 5`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-3.5 w-3.5 ${
                  index < review.rating ? "fill-primary text-primary" : "text-zinc-600"
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>
        <GoogleLogo className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-base">"{review.review}"</p>
      <p className="text-xs text-zinc-500 sm:text-sm">
        {review.car} • {review.location}
      </p>
      <span className="sr-only">{t.reviews.avatarAlt}</span>
    </article>
  )
}

export function ReviewsGrid() {
  const { language } = useLanguage()
  const reviews = getFeaturedReviews(toContentLocale(language))

  if (reviews.length === 0) {
    return null
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
