import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { PageTransitions } from "@/components/page-transitions"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { parseLanguage } from "@/lib/i18n/language-cookie"
import { LanguageTransition } from "@/components/language-transition"
import { CookieConsent } from "@/components/cookie-consent"
import { FirstVisitPromoModal } from "@/components/first-visit-promo-modal"
import { SiteGraphJsonLd } from "@/components/seo/site-graph-json-ld"
import { LocalBusinessStructuredData } from "@/components/structured-data"
import { metaDescription } from "@/lib/seo-meta"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAds } from "@/components/analytics/google-ads"

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
    default: "Crystal Detailing | Mobilný detailing",
    template: "%s | Crystal Detailing",
  },
  description: metaDescription(
    "Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám. Profesionálny detailing v Bratislave, Pezinoku, Senci a okolí.",
  ),
  keywords: [
    "mobilný detailing",
    "detailing auta",
    "detailing aut",
    "detailing áut",
    "detailing áut Bratislava",
    "detailing áut Pezinok",
    "detailing áut Senec",
    "detailing áut Bratislava",
    "detailing áut Pezinok",
    "detailing áut Senec",
    "detailing auta Bratislava",
    "tepovanie áut",
    "čistenie interiéru",
    "keramická ochrana",
    "korekcia laku",
    "mobilný detailing Pezinok",
    "mobilný detailing Senec",
    "výjazdové čistenie áut",
    "luxusný detailing",
    "detailing áut Chorvátsky Grob",
    "Renovácia svetlometov",
    "Renovácia kože",
    "Renovácia plastov",
    "Renovácia interiéru",
    "mobilný detailing Hainburg",
    "mobilný detailing Wien",
    "mobilný detailing Rakúsko",
    "mobile Autopflege Wien",
    "Auto detailing Schwechat",
    "Fahrzeugaufbereitung Burgenland",
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
    title: "Crystal Detailing | Mobilný detailing",
    description: metaDescription(
      "Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám. Profesionálny detailing v Bratislave a okolí.",
    ),
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
    title: "Crystal Detailing | Mobilný detailing",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const initialLanguage = parseLanguage(cookieStore.get("language")?.value)

  return (
    <html lang={initialLanguage} suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <SiteGraphJsonLd />
        <LocalBusinessStructuredData />
        <LanguageProvider initialLanguage={initialLanguage}>
          <LanguageTransition />
          <PageTransitions>{children}</PageTransitions>
          <FirstVisitPromoModal />
          <CookieConsent />
        </LanguageProvider>
        <Analytics />
        <GoogleAds />
      </body>
    </html>
  )
}
