"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

export function HeroAvailabilityBadge() {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="flex justify-center"
    >
      <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/45 px-4 py-2.5 shadow-[0_0_32px_-12px_hsl(var(--primary)/0.3)] backdrop-blur-md sm:px-4 sm:py-2.5">
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        </span>
        <p className="text-sm font-semibold tracking-tight text-white sm:text-base">{t.hero.availabilityBadge.title}</p>
      </div>
    </motion.div>
  )
}
