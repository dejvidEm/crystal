import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { preFirmyMetadataSk } from "@/lib/pre-firmy-data"
import { buildPreFirmyPageJsonLd } from "@/lib/seo-structured-data"

export const metadata: Metadata = preFirmyMetadataSk

export default function PreFirmyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildPreFirmyPageJsonLd()} />
      {children}
    </>
  )
}
