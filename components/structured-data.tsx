"use client"

import { useEffect } from 'react'

interface LocalBusinessSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  logo: string
  image: string[]
  telephone: string
  email: string
  priceRange: string
  address?: {
    '@type': string
    addressCountry: string
    addressRegion: string
    addressLocality: string
  }
  areaServed: Array<{
    '@type': string
    name: string
  }>
  openingHoursSpecification?: Array<{
    '@type': string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  sameAs?: string[]
}

interface ServiceSchema {
  '@context': string
  '@type': string
  serviceType: string
  provider: {
    '@type': string
    name: string
  }
  areaServed: Array<{
    '@type': string
    name: string
  }>
  description: string
}

interface FAQPageSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

export function LocalBusinessStructuredData() {
  useEffect(() => {
    const schema: LocalBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Crystal Detailing',
      description:
        'Prvá mobilná služba detailingu luxusných áut na Slovensku, ktorá príde k vám. Profesionálny detailing pre luxusné vozidlá v celej Bratislave a okolí.',
      url: 'https://crystaldetailing.sk',
      logo: 'https://crystaldetailing.sk/images/luxury_logo.png',
      image: [
        'https://crystaldetailing.sk/images/luxury-car.png',
        'https://crystaldetailing.sk/images/porsche.jpg',
      ],
      telephone: '+421918722720',
      email: 'crystalbratislava@gmail.com',
      priceRange: '€€',
      areaServed: [
        {
          '@type': 'City',
          name: 'Bratislava',
        },
        {
          '@type': 'City',
          name: 'Pezinok',
        },
        {
          '@type': 'City',
          name: 'Senec',
        },
        {
          '@type': 'City',
          name: 'Chorvátsky Grob',
        },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      sameAs: [
        // Add actual social media URLs when available
        // 'https://www.facebook.com/crystaldetailing',
        // 'https://www.instagram.com/crystaldetailing',
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    script.id = 'local-business-schema'
    
    // Remove existing if present
    const existing = document.getElementById('local-business-schema')
    if (existing) {
      existing.remove()
    }
    
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('local-business-schema')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return null
}

export function ServiceStructuredData({
  serviceType,
  description,
  areas,
}: {
  serviceType: string
  description: string
  areas: string[]
}) {
  useEffect(() => {
    const schema: ServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Crystal Detailing',
      },
      areaServed: areas.map((area) => ({
        '@type': 'City',
        name: area,
      })),
      description,
    }

    const scriptId = `service-schema-${serviceType.replace(/\s+/g, '-').toLowerCase()}`
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    script.id = scriptId

    // Remove existing if present
    const existing = document.getElementById(scriptId)
    if (existing) {
      existing.remove()
    }

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById(scriptId)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [serviceType, description, areas])

  return null
}

export function FAQPageStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return

    const schema: FAQPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    script.id = 'faq-schema'

    // Remove existing if present
    const existing = document.getElementById('faq-schema')
    if (existing) {
      existing.remove()
    }

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('faq-schema')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [faqs])

  return null
}


