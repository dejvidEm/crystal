import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo-site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin", "/admin/"],
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/services/sitemap.xml`],
  }
}
