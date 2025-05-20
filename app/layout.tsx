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
  title: "Crystal Detailing | Prémiový mobilný detailing v Bratislave",
  description:
    "Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám. Profesionálny detailing pre luxusné vozidlá v celej Bratislave a okolí.",
  keywords: "detailing auta, mobilný detailing, luxusná starostlivosť o auto, Bratislava, Slovensko, keramický náter, korekcia laku",
  authors: [{ name: "Crystal Detailing" }],
  openGraph: {
    title: "Crystal Detailing | Prémiový mobilný detailing v Bratislave",
    description: "Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám.",
    url: "https://crystaldetailing.sk",
    siteName: "Crystal Detailing",
    locale: "sk_SK",
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
    <html lang="sk" suppressHydrationWarning className="scroll-smooth">
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
