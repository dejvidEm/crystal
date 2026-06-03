import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { buildCennikPageJsonLd } from "@/lib/seo-structured-data"
import { cennikMetadataSk } from "@/lib/service-pages-data"

export const metadata: Metadata = cennikMetadataSk

export default function CennikLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildCennikPageJsonLd()} />
      {children}
    </>
  )
}
