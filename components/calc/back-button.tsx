"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageWrapper } from "@/components/language-wrapper"

interface CalcBackButtonProps {
  isFixed?: boolean
}

export function CalcBackButton({ isFixed = true }: CalcBackButtonProps) {
  return (
    <LanguageWrapper>
      {(t) => (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={isFixed ? "fixed top-24 left-12 z-40 md:top-28" : ""}
        >
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">
                {t.calculator?.backToHome || "Return to main page"}
              </span>
            </Button>
          </Link>
        </motion.div>
      )}
    </LanguageWrapper>
  )
}

