import type { Metadata } from "next"
import { LegalDocumentPage } from "@/components/legal/legal-document-page"
import { getTermsCopy, termsMetadataSk } from "@/lib/legal-pages-data"
import { buildPageMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildPageMetadata({
  title: termsMetadataSk.title,
  description: termsMetadataSk.description,
  pathname: "/obchodne-podmienky",
  socialTitle: `${termsMetadataSk.title} | Crystal Detailing`,
})

export default function TermsPage() {
  return <LegalDocumentPage getCopy={getTermsCopy} />
}
