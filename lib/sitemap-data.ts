import type { MetadataRoute } from "next"
import { getAllPostSlugs } from "@/lib/blog-data"
import { SITELINK_PAGES, SITE_URL } from "@/lib/seo-site"

type SitemapEntry = MetadataRoute.Sitemap[number]

function entry(
  pathname: string,
  options: {
    priority: number
    changeFrequency: SitemapEntry["changeFrequency"]
    lastModified?: Date
  },
): SitemapEntry {
  return {
    url: `${SITE_URL}${pathname}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  }
}

const SERVICE_SITEMAP_PATHS = [
  "/cennik",
  "/mobilny-detailing",
  "/tepovanie",
  "/renovacia-svetlometov",
] as const

const LEGAL_ROUTES = ["/ochrana-osobnych-udajov", "/obchodne-podmienky"] as const

const DISTRICT_ROUTES = [
  "/bratislava",
  "/pezinok",
  "/senec",
  "/chorvatsky-grob",
  "/malacky",
  "/senica",
  "/skalica",
  "/trnava",
  "/galanta",
  "/dunajska-streda",
] as const

/** Hlavná mapa stránok – homepage, lokality, blog, právne stránky */
export function getMainSitemapEntries(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    entry("", { priority: 1, changeFrequency: "weekly" }),
    ...SITELINK_PAGES.map((page) =>
      entry(page.pathname, {
        priority: page.priority,
        changeFrequency: page.changeFrequency,
      }),
    ),
    ...DISTRICT_ROUTES.map((route) =>
      entry(route, { priority: 0.75, changeFrequency: "monthly" }),
    ),
    ...LEGAL_ROUTES.map((route) =>
      entry(route, { priority: 0.3, changeFrequency: "yearly" }),
    ),
  ]

  const blogIndex = entry("/blog", { priority: 0.85, changeFrequency: "weekly" })
  const blogPosts = getAllPostSlugs().map((slug) =>
    entry(`/blog/${slug}`, { priority: 0.7, changeFrequency: "monthly" }),
  )

  return [...core, blogIndex, ...blogPosts]
}

/** Samostatná mapa služieb a cenníka – pre Search Console a sitelinks */
export function getServicesSitemapEntries(): MetadataRoute.Sitemap {
  return SITELINK_PAGES.filter((page) =>
    (SERVICE_SITEMAP_PATHS as readonly string[]).includes(page.pathname),
  ).map((page) =>
    entry(page.pathname, {
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    }),
  )
}
