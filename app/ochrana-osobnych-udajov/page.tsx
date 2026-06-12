import type { Metadata } from "next"
import { LegalDocumentPage } from "@/components/legal/legal-document-page"
import { getPrivacyCopy, privacyMetadataSk } from "@/lib/legal-pages-data"
import { buildPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildPageMetadata({
  title: privacyMetadataSk.title,
  description: privacyMetadataSk.description,
  pathname: "/ochrana-osobnych-udajov",
  socialTitle: `${privacyMetadataSk.title} | Crystal Detailing`,
})

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage getCopy={getPrivacyCopy} />
}
