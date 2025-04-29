import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { PageTransitions } from "@/components/page-transitions"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { LanguageTransition } from "@/components/language-transition"
import { CookieConsent } from "@/components/cookie-consent"

// Optimize font loading
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Crystal Detailing | Premium Mobile Car Detailing in Slovakia",
  description:
    "Slovakia's first luxury mobile car detailing service that comes to your location. Professional detailing for high-end vehicles throughout Bratislava and surrounding areas.",
  keywords: "car detailing, mobile detailing, luxury car care, Bratislava, Slovakia, ceramic coating, paint correction",
  authors: [{ name: "Crystal Detailing" }],
  openGraph: {
    title: "Crystal Detailing | Premium Mobile Car Detailing in Slovakia",
    description: "Slovakia's first luxury mobile car detailing service that comes to your location.",
    url: "https://crystaldetailing.sk",
    siteName: "Crystal Detailing",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <LanguageTransition />
          <PageTransitions>{children}</PageTransitions>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
