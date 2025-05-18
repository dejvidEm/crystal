"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

// Reviews data with translations
const getReviews = (language: "en" | "sk") => {
  const reviews = {
    en: [
      {
        id: 1,
        name: "Martin Novák",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Absolutely incredible service! They came to my office and transformed my BMW while I was in meetings. The ceramic coating they applied makes my car look better than when I bought it.",
        location: "Bratislava",
        car: "BMW M5",
      },
      {
        id: 2,
        name: "Zuzana Kováčová",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "As a busy professional, I don't have time to take my car to a detailing shop. LuxDetail's mobile service is perfect - they came to my home and did an amazing job while I worked remotely.",
        location: "Košice",
        car: "Mercedes-Benz E-Class",
      },
      {
        id: 3,
        name: "Peter Horváth",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "I've tried many detailing services before, but none compare to the level of attention and care that LuxDetail provides. Their Ultimate package is worth every euro!",
        location: "Žilina",
        car: "Audi RS6",
      },
      {
        id: 4,
        name: "Jana Tóthová",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 4,
        review:
          "The convenience of having professional detailers come to my apartment complex is unmatched. My Tesla has never looked better, and the team was professional and courteous.",
        location: "Nitra",
        car: "Tesla Model 3",
      },
      {
        id: 5,
        name: "Tomáš Balog",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "I was skeptical about mobile detailing at first, but LuxDetail changed my mind completely. The results are outstanding, and the ceramic coating has made maintenance so much easier.",
        location: "Banská Bystrica",
        car: "Porsche 911",
      },
    ],
    sk: [
      {
        id: 1,
        name: "Martin Novák",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Absolútne neuveriteľná služba! Prišli do mojej kancelárie a transformovali moje BMW, zatiaľ čo som bol na stretnutiach. Keramický povlak, ktorý aplikovali, robí moje auto krajším, než keď som ho kúpil.",
        location: "Bratislava",
        car: "BMW M5",
      },
      {
        id: 2,
        name: "Zuzana Kováčová",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Ako zaneprázdnená profesionálka nemám čas voziť svoje auto do detailingovej dielne. Mobilná služba Crystal detailing je dokonalá - prišli ku mne domov a odviedli úžasnú prácu, zatiaľ čo som pracovala na diaľku.",
        location: "Košice",
        car: "Mercedes-Benz E-Class",
      },
      {
        id: 3,
        name: "Peter Horváth",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Vyskúšal som už mnoho detailingových služieb, ale žiadna sa nevyrovná úrovni pozornosti a starostlivosti, ktorú poskytuje LuxDetail. Ich Ultimátny balík stojí za každé euro!",
        location: "Žilina",
        car: "Audi RS6",
      },
      {
        id: 4,
        name: "Jana Tóthová",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 4,
        review:
          "Pohodlie mať profesionálnych detailerov, ktorí prídu do môjho bytového komplexu, je neprekonateľné. Moja Tesla nikdy nevyzerala lepšie a tím bol profesionálny a zdvorilý.",
        location: "Nitra",
        car: "Tesla Model 3",
      },
      {
        id: 5,
        name: "Tomáš Balog",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Spočiatku som bol skeptický voči mobilnému detailingu, ale Crystal úplne zmenil môj názor. Výsledky sú vynikajúce a keramický povlak uľahčil údržbu.",
        location: "Banská Bystrica",
        car: "Porsche 911",
      },
    ],
  }

  return reviews[language]
}

export function ReviewCarousel() {
  const { language, t } = useLanguage()
  const reviews = getReviews(language as "en" | "sk")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }, [reviews.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex],
  )

  // Optimize autoplay with useEffect
  useEffect(() => {
    if (!autoplay || isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, isPaused, nextSlide])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
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
            key={currentIndex}
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
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary">
                <Image
                  src={reviews[currentIndex].avatar || "/placeholder.svg"}
                  alt={reviews[currentIndex].name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex" aria-label={`Rating: ${reviews[currentIndex].rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < reviews[currentIndex].rating ? "fill-primary text-primary" : "text-zinc-600"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <p className="mb-6 text-xl italic text-zinc-300">"{reviews[currentIndex].review}"</p>
              <div>
                <p className="font-semibold text-primary text-lg">{reviews[currentIndex].name}</p>
                <p className="text-sm text-zinc-400">
                  {reviews[currentIndex].car} • {reviews[currentIndex].location}
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
