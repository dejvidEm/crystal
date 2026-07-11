import type { Metadata } from "next"
import LegalPageRenderer from "@/components/legal/legal-page-renderer"
import { termsCopyByLocale, termsMetadataSk } from "@/lib/legal-pages-data"
import { buildPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildPageMetadata({
  title: termsMetadataSk.title,
  description: termsMetadataSk.description,
  pathname: "/obchodne-podmienky",
  socialTitle: `${termsMetadataSk.title} | Crystal Detailing`,
})

export default function TermsPage() {
  return <LegalPageRenderer copies={termsCopyByLocale} showPrivacyLink />
}
