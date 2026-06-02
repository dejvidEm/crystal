import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://crystaldetailing.sk'

  const routes = [
    '',
    '/calc',
    '/lokality',
    '/o-nas',
    '/blog',
    '/ochrana-osobnych-udajov',
    '/obchodne-podmienky',
    '/bratislava',
    '/pezinok',
    '/senec',
    '/chorvatsky-grob',
    '/malacky',
    '/senica',
    '/skalica',
    '/trnava',
    '/galanta',
    '/dunajska-streda',
  ] as const

  const legalRoutes = ['/ochrana-osobnych-udajov', '/obchodne-podmienky']

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === ''
        ? ('weekly' as const)
        : route === '/blog'
          ? ('weekly' as const)
          : legalRoutes.includes(route)
            ? ('yearly' as const)
            : ('monthly' as const),
    priority:
      route === ''
        ? 1
        : route === '/calc'
          ? 0.9
          : route === '/blog'
            ? 0.85
            : legalRoutes.includes(route)
              ? 0.3
              : 0.8,
  }))

  const blogEntries = getAllPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
