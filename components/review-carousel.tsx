"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

type CarouselReview = {
  id: number
  avatar: string
  rating: number
  review: string
  car: string
  location: string
}

// Reviews data with translations
const getReviews = (language: "en" | "sk"): CarouselReview[] => {
  const reviews: Record<"en" | "sk", CarouselReview[]> = {
    en: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Maximum satisfaction. Great service and the car looks like new.",
        car: "Customer review",
        location: "Bratislava region",
      },
      {
        id: 2,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Great service for a fair price. The guy arrived, I unlocked the car and he took care of the rest. When I came to check, the car was spotless inside and out. We also had a nice chat. I recommend them.",
        car: "Customer review",
        location: "Bratislava region",
      },
      {
        id: 3,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Extremely professional approach and detailing—they arrived exactly on time as agreed while I was at the gym and fully cleaned the interior like new. The price is fair, comparable to car washes in malls. Top quality, I recommend to everyone.",
        car: "Customer review",
        location: "Bratislava region",
      },
      {
        id: 4,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Great service—I booked a clean while I was at a lecture at school; I just unlocked the car and after the lecture I came to check and lock it. Everything was perfect—I had no idea my car could look like new. Fully satisfied, I will definitely book again.",
        car: "Customer review",
        location: "Bratislava region",
      },
      {
        id: 5,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Absolute satisfaction. I drive my Tesla non-stop and regular hand car washes never get it this clean. I'm still skeptical of detailing companies because of bad experiences (things often get skipped), but the guys from Crystal Detailing didn't miss a thing. Big praise—I loved how simple the whole process was, I could work while they worked and I came back to a clean car :)",
        car: "Customer review",
        location: "Bratislava region",
      },
      {
        id: 6,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Brilliant idea—the guys come to you anywhere in the Bratislava region, no hassle, and quickly wash interior and exterior so the car looks like new. Professionalism on point, fair price. I recommend.",
        car: "Customer review",
        location: "Bratislava region",
      },
      {
        id: 7,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Professional approach and highly precise work. The interior and exterior look completely like new. Fair price and a friendly vibe from the company owner. The first mobile car detailing in Bratislava. Strongly recommend.",
        car: "Customer review",
        location: "Bratislava",
      },
    ],
    sk: [
      {
        id: 1,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Maximálni spokojnosť. Skvelá služba a auto vyzerá jako nové.",
        car: "Recenzia zákazníka",
        location: "Bratislavský kraj",
      },
      {
        id: 2,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Super služba za adekvátnu cenu. Chalan prišiel, otvoril som auto a o zvyšok sa postaral. Keď som to prišiel skontrolovať, auto bolo umyté do detailu z vonku aj z vnútra. Zároveň sme prehodili aj zopár dobrých slov. Odporúčam.",
        car: "Recenzia zákazníka",
        location: "Bratislavský kraj",
      },
      {
        id: 3,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Extrémne profesionálny prístup aj detailing, presne na čas ako bolo dohodnuté došli kým som bol vo fitku a vyčistili kompletne interiér ako nový. Cena férová porovnateľná s umyvárkami v nivách alebo eurovei. Extrémna kvalita, odporúčam všetkým.",
        car: "Recenzia zákazníka",
        location: "Bratislavský kraj",
      },
      {
        id: 4,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Super služba, objednal som si čistenie kým som bol v škole na prednáške, iba som odomkol auto a po prednáške prišiel skontrolovať a zamknúť. Všetko tip top ani som nevedel že moje auto môže vyzerať ako nové. Úplná spokojnosť, určite sa objednám znova.",
        car: "Recenzia zákazníka",
        location: "Bratislavský kraj",
      },
      {
        id: 5,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Absolútna spokojnosť. S teslou jazdím nonstop a bežné ručné umyvárky mi nikdy auto takto nevyčistia. Voči detailingovým firmám som stále skeptický kvôli zlým skúsenostiam (často sa niečo vynechá) ale chalpci z crystal detailing nezabudli na nič. Veľká pochvala a veľmi sa mi páčilo že proces bol úplne jednoduchý, mohol som počas toho pracovať a vrátil som sa k čistému autu :)",
        car: "Recenzia zákazníka",
        location: "Bratislavský kraj",
      },
      {
        id: 6,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Geniálny nápad, chalani dojdu za vami hocikde v BA kraji, bez problémov rýchlo umyjú interier exterier že auto vyzerá jak nové. Profesionalita na úrovni, cena fér. Odporúčam.",
        car: "Recenzia zákazníka",
        location: "Bratislavský kraj",
      },
      {
        id: 7,
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        review:
          "Profesionálny prístup a vysoko precízna robota. Interiér a exteriér auta úplne ako nový. Férová cena a priateľská atmosféra od majiteľa firmy. Prvý mobilný auto-detailing v BA. Veľmi odporúčam.",
        car: "Recenzia zákazníka",
        location: "Bratislava",
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
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                  aria-hidden
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
