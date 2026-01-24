"use client"

import { motion } from "framer-motion"
import { ChevronRight, Euro, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PriceRange, TimeRange } from "@/lib/calc-logic"

interface StickySummaryProps {
  priceRange: PriceRange
  timeRange: TimeRange
  onNext: () => void
  canProceed: boolean
}

export function StickySummary({ priceRange, timeRange, onNext, canProceed }: StickySummaryProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) {
      return `${mins} min`
    }
    if (mins === 0) {
      return `${hours} h`
    }
    return `${hours} h ${mins} min`
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">
                {priceRange.min}–{priceRange.max} €
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">
                {formatTime(timeRange.min)}–{formatTime(timeRange.max)}
              </span>
            </div>
          </div>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}



