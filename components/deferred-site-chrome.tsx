"use client"

import dynamic from "next/dynamic"

const LanguageTransition = dynamic(
  () => import("@/components/language-transition").then((mod) => mod.LanguageTransition),
  { ssr: false },
)
const WhatsAppFloatingButton = dynamic(
  () => import("@/components/whatsapp-floating-button").then((mod) => mod.WhatsAppFloatingButton),
  { ssr: false },
)
const CookieConsent = dynamic(
  () => import("@/components/cookie-consent").then((mod) => mod.CookieConsent),
  { ssr: false },
)

export function DeferredSiteChrome() {
  return (
    <>
      <LanguageTransition />
      <WhatsAppFloatingButton />
      <CookieConsent />
    </>
  )
}
