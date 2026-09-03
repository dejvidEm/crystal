"use client"

import { WhatsAppLogo } from "@/components/whatsapp-logo"
import { useLanguage } from "@/lib/i18n/language-context"
import { trackAnalyticsEvent } from "@/lib/analytics-events"
import { whatsappQuoteUrl } from "@/lib/site-config"

export function WhatsAppFloatingButton() {
  const { language, t } = useLanguage()
  const href = whatsappQuoteUrl(language)
  const label =
    t.common.whatsappAriaLabel ?? "Kontaktovať cez WhatsApp – napísať správu"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={() => trackAnalyticsEvent("click_whatsapp", { location: "floating_button" })}
      className="fixed z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_-4px_rgba(37,211,102,0.55)] transition-transform hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background right-4 max-md:bottom-[calc(5.75rem+env(safe-area-inset-bottom))] md:bottom-6 md:right-6 md:h-16 md:w-16 [[data-mobile-nav-open]_&]:pointer-events-none [[data-mobile-nav-open]_&]:invisible"
    >
      <WhatsAppLogo className="h-8 w-8 md:h-9 md:w-9" aria-hidden />
    </a>
  )
}
