"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Euro, Clock, MapPin, CheckCircle2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceRange, TimeRange, CalculatorData } from "@/lib/calc-logic"
import { LanguageWrapper } from "@/components/language-wrapper"

interface ResultCardProps {
  priceRange: PriceRange
  timeRange: TimeRange
  data: CalculatorData
}

export function ResultCard({ priceRange, timeRange, data }: ResultCardProps) {
  return (
    <LanguageWrapper>
      {(t) => <ResultCardContent priceRange={priceRange} timeRange={timeRange} data={data} t={t} />}
    </LanguageWrapper>
  )
}

function ResultCardContent({ priceRange, timeRange, data, t }: ResultCardProps & { t: any }) {
  const [animatedPrice, setAnimatedPrice] = useState(priceRange.min)

  useEffect(() => {
    // Animate price count-up
    const duration = 1000 // 1 second
    const steps = 30
    const stepDuration = duration / steps
    const priceDiff = priceRange.max - priceRange.min
    const stepValue = priceDiff / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const newPrice = Math.round(priceRange.min + stepValue * currentStep)
      setAnimatedPrice(Math.min(newPrice, priceRange.max))

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedPrice(priceRange.max)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [priceRange])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) {
      return `${mins} ${t.calculator?.min || "min"}`
    }
    if (mins === 0) {
      return `${hours} ${t.calculator?.h || "h"}`
    }
    return `${hours} ${t.calculator?.h || "h"} ${mins} ${t.calculator?.min || "min"}`
  }

  const handleBookClick = () => {
    // Build booking URL with prefilled data
    const params = new URLSearchParams()
    if (data.vehicleType) params.set("vehicle", data.vehicleType)
    if (data.condition) params.set("condition", data.condition)
    if (data.mainService) params.set("service", data.mainService)
    if (data.addons.length > 0) params.set("addons", data.addons.join(","))
    if (data.cityOrZip) params.set("location", data.cityOrZip)
    if (data.parkingType) params.set("parking", data.parkingType)
    params.set("price", `${priceRange.min}-${priceRange.max}`)
    params.set("time", `${timeRange.min}-${timeRange.max}`)

    // Track event if analytics exist
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "booking_clicked", {
        event_category: "calculator",
        event_label: "result_card",
      })
    }

    // Get current language from localStorage or default to 'sk'
    const lang = typeof window !== "undefined" ? (localStorage.getItem("language") || "sk") : "sk"
    
    // Redirect to booking page with current language
    window.location.href = `https://services.bookio.com/crystal-detailing-ob6b7b8y/widget?lang=${lang}&${params.toString()}`
  }

  const handleContactClick = () => {
    // WhatsApp contact (you can customize this)
    const priceText = `${priceRange.min}-${priceRange.max} €`
    const timeText = `${formatTime(timeRange.min)}-${formatTime(timeRange.max)}`
    const messageTemplate = t.calculator?.whatsappMessage || "Hi! I'd like to book a detailing service. Estimated price: {price} €, Estimated time: {time}"
    const message = messageTemplate
      .replace("{price}", priceText)
      .replace("{time}", timeText)
    window.open(`https://wa.me/421912345678?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <Card className="border-2 border-primary">
      <CardHeader className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
          <CardTitle className="text-2xl">{t.calculator?.resultTitle || "Your Estimate is Ready!"}</CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg bg-primary/10 p-6 text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-2 text-muted-foreground">
            <Euro className="h-5 w-5" />
            <span className="text-sm font-medium">{t.calculator?.estimatedPrice || "Estimated Price"}</span>
          </div>
          <div className="text-4xl font-bold text-primary">
            {animatedPrice}–{priceRange.max} €
          </div>
        </motion.div>

        {/* Time Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg bg-card border border-border p-6 text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">{t.calculator?.estimatedTime || "Estimated Time"}</span>
          </div>
          <div className="text-2xl font-bold">
            {formatTime(timeRange.min)}–{formatTime(timeRange.max)}
          </div>
        </motion.div>

        {/* Location Display */}
        {data.cityOrZip && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{data.cityOrZip}</span>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground"
        >
          {t.calculator?.disclaimer || "Final price may slightly vary after on-site inspection."}
        </motion.p>

        {/* Trust Copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-center"
        >
          <p className="text-sm font-medium">
            {t.calculator?.trustCopy || "No surprises – final price confirmed before we start."}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Button
            onClick={handleBookClick}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t.calculator?.bookTime || "Book a Time"}
          </Button>
          <Button
            onClick={handleContactClick}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t.calculator?.contactUs || "Contact Us / WhatsApp"}
          </Button>
        </motion.div>

        {/* Optional: Real person signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="pt-4 border-t border-border text-center"
        >
          <p className="text-xs text-muted-foreground">
            {t.calculator?.teamSignature || "— Crystal Detailing Team"}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}

