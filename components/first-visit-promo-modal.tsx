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
            "fixed left-[50%] top-[50%] z-[120] w-full max-w-md translate-x-[-50%] translate-y-[-50%] border-0 bg-transparent p-0 shadow-none duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
          aria-describedby="welcome-promo-body"
        >
          <DialogTitle className="sr-only">{promo.discountSubtitle}</DialogTitle>

          <button
            type="button"
            onClick={dismiss}
            className="mb-3 ml-auto flex h-9 w-9 items-center justify-center rounded-sm bg-zinc-900 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label={promo.closeLabel}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="overflow-hidden border border-white/10 bg-black shadow-2xl">
            <div className="bg-primary px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              {promo.badge}
            </div>

            <div className="px-8 pb-8 pt-7 text-center">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {promo.eyebrow}
              </p>

              <p className="text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl">
                {promo.discount}
              </p>
              <p className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {promo.discountSubtitle}
              </p>

              <p id="welcome-promo-body" className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-zinc-300">
                {promo.body}
              </p>

              <a
                href={bookioUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="mt-8 flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-primary/90"
              >
                {promo.cta}
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={dismiss}
                className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-300"
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
