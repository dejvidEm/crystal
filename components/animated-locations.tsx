"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

const locations = {
  en: [
    "Staré Mesto",
    "Ružinov",
    "Nové Mesto",
    "Petržalka",
    "Dúbravka",
    "Karlova Ves",
    "Rača",
    "Vajnory",
    "Devín",
    "Devínska Nová Ves",
    "Záhorská Bystrica",
    "Lamač",
    "Ivanka pri Dunaji",
    "Bernolákovo",
    "Chorvátsky Grob",
    "Svätý Jur",
    "Pezinok",
    "Modra",
  ],
  sk: [
    "Staré Mesto",
    "Ružinov",
    "Nové Mesto",
    "Petržalka",
    "Dúbravka",
    "Karlova Ves",
    "Rača",
    "Vajnory",
    "Devín",
    "Devínska Nová Ves",
    "Záhorská Bystrica",
    "Lamač",
    "Ivanka pri Dunaji",
    "Bernolákovo",
    "Chorvátsky Grob",
    "Svätý Jur",
    "Pezinok",
    "Modra",
  ],
}

export function AnimatedLocations() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentLocations = language === "sk" ? locations.sk : locations.en

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentLocations.length)
    }, 2000) // Change every 2 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentLocations.length])

  const variants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <div className="h-8 overflow-hidden relative flex justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute text-amber-400"
          aria-live="polite"
        >
          {currentLocations[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
