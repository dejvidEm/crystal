"use client"

import { useMemo } from "react"
import { CircleUser, Star } from "lucide-react"
import { GoogleLogo } from "@/components/google-logo"
import { Marquee } from "@/components/ui/marquee"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale } from "@/lib/i18n/locale"
import { getCarouselReviews, type CarouselReview } from "@/lib/review-carousel-data"

function ReviewMarqueeCard({ review }: { review: CarouselReview }) {
  const { t } = useLanguage()

  return (
    <article className="glass-card flex w-[min(85vw,22rem)] shrink-0 flex-col rounded-lg border border-white/10 p-5 sm:w-[24rem] sm:p-6">
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
        <GoogleLogo className="mt-0.5 h-4 w-4" aria-hidden />
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-base">"{review.review}"</p>
      <p className="text-xs text-zinc-500 sm:text-sm">
        {review.car} • {review.location}
      </p>
      <span className="sr-only">{t.reviews.avatarAlt}</span>
    </article>
  )
}

function ReviewMarqueeTrack({
  reviews,
  reverse = false,
}: {
  reviews: CarouselReview[]
  reverse?: boolean
}) {
  if (reviews.length === 0) {
    return null
  }

  return (
    <Marquee
      pauseOnHover
      reverse={reverse}
      repeat={3}
      className="[--duration:55s] [--gap:1rem] py-2 sm:[--gap:1.25rem]"
    >
      {reviews.map((review) => (
        <ReviewMarqueeCard key={review.id} review={review} />
      ))}
    </Marquee>
  )
}

export function ReviewMarquee() {
  const { language } = useLanguage()
  const reviews = useMemo(() => getCarouselReviews(toContentLocale(language)), [language])

  if (reviews.length === 0) {
    return null
  }

  const splitIndex = Math.ceil(reviews.length / 2)
  const firstRowReviews = reviews.slice(0, splitIndex)
  const secondRowReviews = reviews.slice(splitIndex)

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div className="flex flex-col gap-3 sm:hidden">
        <ReviewMarqueeTrack reviews={firstRowReviews} />
        {secondRowReviews.length > 0 ? (
          <ReviewMarqueeTrack reviews={secondRowReviews} reverse />
        ) : null}
      </div>

      <div className="hidden sm:block">
        <ReviewMarqueeTrack reviews={reviews} />
      </div>
    </div>
  )
}
