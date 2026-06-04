import type { Metadata } from "next"
import { metaDescription } from "@/lib/seo-meta"
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo-site"

export type BuildPageMetadataOptions = {
  /** Krátky SEO titulok (bez suffixu značky) – v prehliadači: „{title} | Crystal Detailing“ */
  title: string
  description: string
  pathname: string
  keywords?: string[]
  /** OG/Twitter titulok; default = title */
  socialTitle?: string
  openGraphType?: "website" | "article"
}

const googleBot = {
  index: true,
  follow: true,
  "max-video-preview": -1,
  "max-image-preview": "large" as const,
  "max-snippet": -1,
}

export function buildPageMetadata(options: BuildPageMetadataOptions): Metadata {
  const {
    title,
    description,
    pathname,
    keywords,
    socialTitle,
    openGraphType = "website",
  } = options

  const url = absoluteUrl(pathname)
  const descriptionMeta = metaDescription(description)
  const fullTitle = `${title} | ${SITE_NAME}`
  const ogTitle = socialTitle ?? title

  return {
    title: { absolute: fullTitle },
    description: descriptionMeta,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description: descriptionMeta,
      url,
      siteName: SITE_NAME,
      locale: "sk_SK",
      type: openGraphType,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} – ${ogTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${ogTitle} | ${SITE_NAME}`,
      description: descriptionMeta,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot,
    },
  }
}

export type BuildBlogArticleMetadataOptions = {
  title: string
  description: string
  slug: string
  publishedAt: string
  imagePath: string
  imageAlt: string
  keywords?: string[]
}

export function buildBlogArticleMetadata(options: BuildBlogArticleMetadataOptions): Metadata {
  const {
    title,
    description,
    slug,
    publishedAt,
    imagePath,
    imageAlt,
    keywords,
  } = options

  const pathname = `/blog/${slug}`
  const url = absoluteUrl(pathname)
  const descriptionMeta = metaDescription(description)
  const fullTitle = `${title} | Blog ${SITE_NAME}`
  const ogImage = absoluteUrl(imagePath)

  return {
    title: { absolute: fullTitle },
    description: descriptionMeta,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: descriptionMeta,
      url,
      siteName: SITE_NAME,
      locale: "sk_SK",
      type: "article",
      publishedTime: publishedAt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Blog ${SITE_NAME}`,
      description: descriptionMeta,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot,
    },
  }
}

export const blogListingMetadata = buildPageMetadata({
  title: "Blog",
  description:
    "Praktické články o mobilnom detailingu, tepovaní, renovácii svetlometov a čistení interiéru v Bratislave a okolí.",
  pathname: "/blog",
  keywords: [
    "blog detailing",
    "mobilný detailing tipy",
    "tepovanie auta rady",
    "renovácia svetlometov",
    "detailing Bratislava",
  ],
  socialTitle: "Blog Crystal Detailing",
})

export const homePageMetadataExtras = {
  metadataBase: new URL(SITE_URL),
} as const
