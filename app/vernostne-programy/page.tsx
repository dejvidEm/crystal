import type { Metadata } from "next"
import LoyaltyProgramsPageClient from "@/components/loyalty/loyalty-programs-page-client"
import { getLoyaltyProgramsCopy } from "@/lib/loyalty-programs-copy"
import { buildPageMetadata } from "@/lib/seo-metadata"

const copy = getLoyaltyProgramsCopy("sk")

export const metadata: Metadata = buildPageMetadata({
  title: copy.metaTitle,
  description: copy.metaDescription,
  pathname: "/vernostne-programy",
  keywords: copy.keywords,
  socialTitle: `${copy.metaTitle} | Crystal Detailing`,
})

export default function LoyaltyProgramsPage() {
  return <LoyaltyProgramsPageClient />
}
