"use client"

import { motion } from "framer-motion"
import { Calculator } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageWrapper } from "@/components/language-wrapper"

export function FloatingCalcButton() {
  return (
    <LanguageWrapper>
      {(t) => (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden"
        >
          <Link href="/calc" className="block">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/50 rounded-full px-6 py-4 h-auto min-w-[200px] flex items-center justify-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              <span className="font-semibold text-base">{t.common.getQuote || "Get Quote"}</span>
            </Button>
          </Link>
        </motion.div>
      )}
    </LanguageWrapper>
  )
}

