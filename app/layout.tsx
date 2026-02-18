import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { PageTransitions } from "@/components/page-transitions"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { LanguageTransition } from "@/components/language-transition"
import { CookieConsent } from "@/components/cookie-consent"
import { LocalBusinessStructuredData } from "@/components/structured-data"
import { Analytics } from "@vercel/analytics/next"

// Optimize font loading
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
})

const baseUrl = 'https://crystaldetailing.sk' // Update with actual production domain

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Crystal Detailing | Prémiový mobilný detailing v Bratislave",
    template: "%s | Crystal Detailing",
  },
  description:
    "Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám. Profesionálny detailing pre luxusné vozidlá v celej Bratislave, Pezinoku, Sencu a okolí.",
  keywords: [
    "mobilný detailing",
    "detailing auta Bratislava",
    "tepovanie áut",
    "čistenie interiéru",
    "keramická ochrana",
    "korekcia laku",
    "mobilný detailing Pezinok",
    "mobilný detailing Senec",
    "výjazdové čistenie áut",
    "luxusný detailing",
  ],
  authors: [{ name: "Crystal Detailing" }],
  creator: "Crystal Detailing",
  publisher: "Crystal Detailing",
  alternates: {
    canonical: baseUrl,
    languages: {
      'sk-SK': baseUrl,
      'en-US': `${baseUrl}/en`,
    },
  },
  openGraph: {
    title: "Crystal Detailing | Prémiový mobilný detailing v Bratislave",
    description: "Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám. Profesionálny detailing pre luxusné vozidlá v celej Bratislave a okolí.",
    url: baseUrl,
    siteName: "Crystal Detailing",
    locale: "sk_SK",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/luxury-car.png`,
        width: 1200,
        height: 630,
        alt: "Crystal Detailing - Prémiový mobilný detailing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crystal Detailing | Prémiový mobilný detailing v Bratislave",
    description: "Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám.",
    images: [`${baseUrl}/images/luxury-car.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <LocalBusinessStructuredData />
        <LanguageProvider>
          <LanguageTransition />
          <PageTransitions>{children}</PageTransitions>
          <CookieConsent />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
