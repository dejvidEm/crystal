"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Calculator } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

export function FloatingCalcButton() {
  const { t } = useLanguage()
  const [showFloating, setShowFloating] = useState(false)

  useEffect(() => {
    const heroQuoteBtn = document.getElementById("hero-get-quote")
    if (!heroQuoteBtn) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(heroQuoteBtn)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {showFloating && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-6 left-0 right-0 z-[100] px-4 md:hidden [[data-mobile-nav-open]_&]:pointer-events-none [[data-mobile-nav-open]_&]:invisible"
        >
          <div className="flex justify-center">
            <Link href="/calc" className="block w-full max-w-[280px]">
              <Button
                size="lg"
                className="flex h-auto w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-primary-foreground shadow-2xl shadow-primary/50 hover:bg-primary/90"
              >
                <Calculator className="h-5 w-5" />
                <span className="text-base font-semibold">{t.common.getQuote || "Get Quote"}</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
