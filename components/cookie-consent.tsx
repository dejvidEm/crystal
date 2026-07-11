"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

export function CookieConsent() {
  const { t } = useLanguage()
  const [showBanner, setShowBanner] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookieConsent")
      setShowBanner(!consent)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted")
    } catch (error) {
      console.error("Error setting cookie consent:", error)
    }
    setShowBanner(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem("cookieConsent", "declined")
    } catch (error) {
      console.error("Error setting cookie consent:", error)
    }
    setShowBanner(false)
  }

  if (showBanner !== true) return null

  const copy = t.cookieConsent

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] border-t border-white/10 bg-black/95 p-4 shadow-lg backdrop-blur-md md:z-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-zinc-300">{copy.message}</p>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="border-zinc-600 bg-transparent text-sm text-zinc-200 hover:bg-white/10 hover:text-white"
          >
            {copy.decline}
          </Button>
          <Button
            onClick={handleAccept}
            className="bg-primary text-sm text-primary-foreground hover:bg-primary/90"
          >
            {copy.accept}
          </Button>
        </div>
      </div>
    </div>
  )
}
