import { SOCIAL_LINKS } from "@/lib/site-config"

export const SITE_URL = "https://crystaldetailing.sk" as const
export const SITE_NAME = "Crystal Detailing" as const
export const SITE_LOGO_URL = `${SITE_URL}/images/luxury_logo.png` as const
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/luxury-car.png` as const

/** Kľúčové stránky pre sitemap, interné odkazy a nápovedu pre Google sitelinks */
export const SITELINK_PAGES = [
  { pathname: "/cennik", name: "Cenník", priority: 0.92, changeFrequency: "weekly" as const },
  {
    pathname: "/mobilny-detailing",
    name: "Mobilný detailing",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { pathname: "/tepovanie", name: "Tepovanie auta", priority: 0.9, changeFrequency: "monthly" as const },
  {
    pathname: "/renovacia-svetlometov",
    name: "Renovácia svetlometov",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { pathname: "/calc", name: "Cenová kalkulačka", priority: 0.88, changeFrequency: "monthly" as const },
  { pathname: "/lokality", name: "Lokality", priority: 0.85, changeFrequency: "monthly" as const },
  { pathname: "/o-nas", name: "O nás", priority: 0.8, changeFrequency: "monthly" as const },
  { pathname: "/blog", name: "Blog", priority: 0.85, changeFrequency: "weekly" as const },
] as const

export const AREA_SERVED_CITIES = [
  "Bratislava",
  "Pezinok",
  "Senec",
  "Chorvátsky Grob",
  "Malacky",
  "Stupava",
  "Senica",
  "Skalica",
  "Trnava",
  "Galanta",
  "Dunajská Streda",
] as const

export const ORGANIZATION_SAME_AS = [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook] as const

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith("http")) return pathname
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`
}
