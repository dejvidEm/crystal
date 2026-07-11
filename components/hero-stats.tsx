"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function HeroStats() {
  const { t } = useLanguage()
  const stats = t.hero.stats

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9 }}
      className="pointer-events-none absolute bottom-16 left-0 right-0 z-10 px-4 sm:bottom-28 md:px-6"
      aria-hidden
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-1 sm:gap-4 md:grid-cols-4 md:gap-8 lg:gap-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-3 py-4 text-center md:border md:border-white/5 md:bg-zinc-900/15 md:px-5 md:py-6 md:backdrop-blur-md"
          >
            <div className="flex items-center justify-center gap-1 sm:gap-1.5">
              <p className="text-4xl font-bold leading-none text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              {stat.showStar && (
                <Star
                  className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="mt-2 text-xs font-medium uppercase leading-snug tracking-wide text-zinc-300 sm:mt-3 sm:text-sm md:text-base md:leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
