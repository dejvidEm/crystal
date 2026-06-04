import {
  AREA_SERVED_CITIES,
  ORGANIZATION_SAME_AS,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_URL,
  SITELINK_PAGES,
  absoluteUrl,
} from "@/lib/seo-site"
import { CONTACT_EMAIL, CONTACT_PHONE_E164 } from "@/lib/site-config"
import {
  getCategoryById,
  type BlogPost,
} from "@/lib/blog-data"
import { getServicePageCopy, type ServicePageSlug } from "@/lib/service-pages-data"
import { metaDescription } from "@/lib/seo-meta"

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_E164,
    sameAs: [...ORGANIZATION_SAME_AS],
  }
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: metaDescription(
      "Prémiový mobilný detailing v Bratislave a na západnom Slovensku. Cenník, tepovanie, renovácia svetlometov a výjazd priamo k vám.",
    ),
    inLanguage: ["sk-SK", "en"],
    publisher: { "@id": ORGANIZATION_ID },
    hasPart: SITELINK_PAGES.map((page) => ({
      "@type": "WebPage",
      "@id": absoluteUrl(page.pathname),
      name: page.name,
      url: absoluteUrl(page.pathname),
      isPartOf: { "@id": WEBSITE_ID },
    })),
  }
}

/** Nápoveda pre Google k hlavným odkazom v SERP (sitelinks – výber algoritmom) */
export function buildSiteNavigationSchema() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#primary-navigation`,
    name: "Hlavná navigácia",
    itemListElement: SITELINK_PAGES.map((page, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: page.name,
      url: absoluteUrl(page.pathname),
    })),
  }
}

export function buildSiteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      buildSiteNavigationSchema(),
      buildLocalBusinessSchema(),
    ],
  }
}

export function buildLocalBusinessSchema() {
  return {
    "@type": "AutoDetailing",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    image: [`${SITE_URL}/images/luxury-car.png`, `${SITE_URL}/images/porsche.jpg`],
    telephone: CONTACT_PHONE_E164,
    email: CONTACT_EMAIL,
    priceRange: "€€",
    areaServed: AREA_SERVED_CITIES.map((name) => ({ "@type": "City", name })),
    parentOrganization: { "@id": ORGANIZATION_ID },
    sameAs: [...ORGANIZATION_SAME_AS],
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildWebPageJsonLd(options: {
  pathname: string
  title: string
  description: string
}) {
  const url = absoluteUrl(options.pathname)
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.title,
    description: metaDescription(options.description),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "sk-SK",
  }
}

export function buildServiceJsonLd(slug: ServicePageSlug) {
  const copy = getServicePageCopy(slug, "sk")
  if (!copy) return null

  const url = absoluteUrl(`/${slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: copy.h1,
    description: metaDescription(copy.metaDescription),
    url,
    serviceType: copy.h1,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: AREA_SERVED_CITIES.map((name) => ({ "@type": "City", name })),
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/cennik"),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  }
}

export function buildServicePageGraphJsonLd(slug: ServicePageSlug) {
  const copy = getServicePageCopy(slug, "sk")
  if (!copy) return null

  const pathname = `/${slug}`
  const url = absoluteUrl(pathname)

  return [
    buildWebPageJsonLd({
      pathname,
      title: copy.metaTitle,
      description: copy.metaDescription,
    }),
    buildBreadcrumbJsonLd([
      { name: "Domov", url: SITE_URL },
      { name: "Služby", url: `${SITE_URL}/#services` },
      { name: copy.h1, url },
    ]),
    buildServiceJsonLd(slug),
  ]
}

export function buildBlogPostPageJsonLd(post: BlogPost) {
  const pathname = `/blog/${post.slug}`
  const url = absoluteUrl(pathname)
  const title = post.title.sk
  const description = post.excerpt.sk
  const category = getCategoryById(post.category)

  return [
    buildWebPageJsonLd({
      pathname,
      title,
      description,
    }),
    buildBreadcrumbJsonLd([
      { name: "Domov", url: SITE_URL },
      { name: "Blog", url: absoluteUrl("/blog") },
      { name: title, url },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: title,
      description: metaDescription(description),
      image: absoluteUrl(post.image),
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: "sk-SK",
      articleSection: category?.label.sk,
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      isPartOf: { "@id": WEBSITE_ID },
    },
  ]
}

export function buildCennikPageJsonLd() {
  const title = "Cenník mobilného detailingu"
  const description =
    "Cenník balíkov REFRESH, INTERIÉR, KOMPLET, TEPOVANIE a doplnkových služieb Crystal Detailing v Bratislave a okolí."

  return [
    buildWebPageJsonLd({ pathname: "/cennik", title, description }),
    buildBreadcrumbJsonLd([
      { name: "Domov", url: SITE_URL },
      { name: title, url: absoluteUrl("/cennik") },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Cenník služieb Crystal Detailing",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Balík REFRESH", url: absoluteUrl("/cennik") },
        { "@type": "ListItem", position: 2, name: "Balík INTERIÉR", url: absoluteUrl("/cennik") },
        { "@type": "ListItem", position: 3, name: "Balík KOMPLET", url: absoluteUrl("/cennik") },
        { "@type": "ListItem", position: 4, name: "Balík TEPOVANIE", url: absoluteUrl("/cennik") },
      ],
    },
  ]
}
