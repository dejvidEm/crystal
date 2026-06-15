"use client"

import { useCallback, useEffect, useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowRight, X } from "lucide-react"
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "crystal_first_visit_promo_seen"

export function FirstVisitPromoModal() {
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch (error) {
      console.error("Error saving welcome promo state:", error)
    }
    setOpen(false)
  }, [])

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
      const timer = window.setTimeout(() => setOpen(true), 600)
      return () => window.clearTimeout(timer)
    } catch (error) {
      console.error("Error reading welcome promo state:", error)
    }
  }, [])

  const promo = t.welcomePromo

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) dismiss()
      }}
    >
      <DialogPortal>
        <DialogOverlay className="z-[120]" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[120] w-[calc(100%-2.5rem)] max-w-[18rem] translate-x-[-50%] translate-y-[-50%] border-0 bg-transparent p-0 shadow-none duration-200 sm:max-w-[21rem] md:max-w-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
          aria-describedby="welcome-promo-body"
        >
          <DialogTitle className="sr-only">{promo.discountSubtitle}</DialogTitle>

          <button
            type="button"
            onClick={dismiss}
            className="mb-2 ml-auto flex h-8 w-8 items-center justify-center rounded-sm bg-zinc-900 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white sm:mb-3 sm:h-9 sm:w-9"
            aria-label={promo.closeLabel}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="overflow-hidden border border-white/10 bg-black shadow-2xl">
            <div className="bg-primary px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-black sm:px-4 sm:py-2.5 sm:text-[11px] sm:tracking-[0.2em]">
              {promo.badge}
            </div>

            <div className="px-5 pb-6 pt-5 text-center sm:px-8 sm:pb-8 sm:pt-7">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:mb-5 sm:text-[11px] sm:tracking-[0.22em]">
                {promo.eyebrow}
              </p>

              <p className="text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
                {promo.discount}
              </p>
              <p className="mt-1.5 text-2xl font-semibold leading-tight text-white sm:mt-2 sm:text-3xl md:text-4xl">
                {promo.discountSubtitle}
              </p>

              <p
                id="welcome-promo-body"
                className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-zinc-300 sm:mt-6 sm:text-sm"
              >
                {promo.body}
              </p>

              <a
                href={bookioUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="mt-5 flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-primary/90 sm:mt-8 sm:px-6 sm:py-4 sm:text-sm"
              >
                {promo.cta}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>

              <button
                type="button"
                onClick={dismiss}
                className="mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-300 sm:mt-5 sm:text-[11px] sm:tracking-[0.18em]"
              >
                {promo.dismiss}
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
