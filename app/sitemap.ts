import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://crystaldetailing.sk' // Update with actual domain
  
  // Static pages
  const routes = [
    '',
    '/calc',
    '/lokality',
    '/bratislava',
    '/pezinok',
    '/senec',
    '/chorvatsky-grob',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : route === '/calc' ? 0.9 : 0.8,
  }))

  return routes
}


