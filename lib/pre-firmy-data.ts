import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/seo-metadata"
import { preFirmyCopyEn, preFirmyCopySk } from "@/lib/pre-firmy-copy"

export const preFirmyMetadataSk: Metadata = buildPageMetadata({
  title: preFirmyCopySk.metaTitle,
  description: preFirmyCopySk.metaDescription,
  pathname: "/pre-firmy",
  keywords: preFirmyCopySk.keywords,
  socialTitle: "Detailing pre firmy | Crystal Detailing",
})

export const preFirmyMetadataEn: Metadata = buildPageMetadata({
  title: preFirmyCopyEn.metaTitle,
  description: preFirmyCopyEn.metaDescription,
  pathname: "/pre-firmy",
  keywords: preFirmyCopyEn.keywords,
  socialTitle: "Business detailing | Crystal Detailing",
})
