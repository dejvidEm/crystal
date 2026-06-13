"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CircleUser, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale } from "@/lib/i18n/locale"
import { getCarouselReviews } from "@/lib/review-carousel-data"

export function ReviewCarousel() {
  const { language, t } = useLanguage()
  const reviews = useMemo(() => {
    const list = getCarouselReviews(toContentLocale(language))
    return Array.isArray(list) ? list : []
  }, [language])
  const reviewCount = reviews.length
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [language, reviewCount])

  useEffect(() => {
    if (currentIndex >= reviewCount && reviewCount > 0) {
      setCurrentIndex(0)
    }
  }, [currentIndex, reviewCount])

  const nextSlide = useCallback(() => {
    if (reviewCount === 0) return
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewCount)
  }, [reviewCount])

  const prevSlide = useCallback(() => {
    if (reviewCount === 0) return
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewCount) % reviewCount)
  }, [reviewCount])

  const goToSlide = useCallback(
    (index: number) => {
      if (reviewCount === 0) return
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex, reviewCount],
  )

  useEffect(() => {
    if (!autoplay || isPaused || reviewCount === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, isPaused, nextSlide, reviewCount])

  if (reviewCount === 0) {
    return null
  }

  const activeReview = reviews[currentIndex] ?? reviews[0]

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4">
      <div
        className="relative overflow-hidden glass-card p-8 rounded-md"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Quote className="absolute top-6 left-6 text-primary/20 w-12 h-12" />

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`${language}-${currentIndex}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-8 md:flex-row"
            aria-live="polite"
          >
            <div className="flex shrink-0 flex-col items-center">
              <div
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary bg-zinc-900/60"
                aria-label={t.reviews.avatarAlt}
                role="img"
              >
                <CircleUser className="h-12 w-12 text-primary/75" strokeWidth={1.25} />
              </div>
              <div className="flex" aria-label={`Rating: ${activeReview.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < activeReview.rating ? "fill-primary text-primary" : "text-zinc-600"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <p className="mb-6 text-xl italic text-zinc-300">"{activeReview.review}"</p>
              <div>
                <p className="text-sm text-zinc-400">
                  {activeReview.car} • {activeReview.location}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 right-8 flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border-zinc-700 bg-black/30 hover:bg-black/50"
            onClick={prevSlide}
            aria-label={t.reviews.previousReview}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border-zinc-700 bg-black/30 hover:bg-black/50"
            onClick={nextSlide}
            aria-label={t.reviews.nextReview}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Review navigation">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary" : "bg-zinc-700"}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to review ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </div>
  )
}
