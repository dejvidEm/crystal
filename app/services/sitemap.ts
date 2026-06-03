import type { MetadataRoute } from "next"
import { getServicesSitemapEntries } from "@/lib/sitemap-data"

export default function sitemap(): MetadataRoute.Sitemap {
  return getServicesSitemapEntries()
}
