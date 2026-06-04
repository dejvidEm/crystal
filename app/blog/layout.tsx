import type { Metadata } from "next"
import { blogListingMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = blogListingMetadata

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
