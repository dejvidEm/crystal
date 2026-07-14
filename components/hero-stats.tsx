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
      className="pointer-events-none absolute bottom-14 left-0 right-0 z-10 px-4 sm:bottom-28 md:px-6"
      aria-hidden
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-3 gap-y-0 sm:gap-4 md:max-w-5xl md:grid-cols-4 md:gap-8 lg:max-w-6xl lg:gap-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-2 py-2 text-center sm:px-3 sm:py-4 md:border md:border-white/5 md:bg-zinc-900/15 md:px-3 md:py-2.5 md:backdrop-blur-md"
          >
            <div className="flex items-center justify-center gap-1 sm:gap-1.5">
              <p className="text-3xl font-bold leading-none text-primary sm:text-4xl md:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              {stat.showStar && (
                <Star
                  className="h-3.5 w-3.5 shrink-0 text-primary sm:h-5 sm:w-5 md:h-3.5 md:w-3.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="mt-1 text-[10px] font-medium uppercase leading-tight tracking-wide text-zinc-300 sm:mt-3 sm:text-sm md:mt-1.5 md:text-[10px] md:leading-tight lg:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
