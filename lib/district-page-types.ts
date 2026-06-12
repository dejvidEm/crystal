export type DistrictFaq = { question: string; answer: string }

/** Obsah district stránky – bez Next.js metadata (bezpečné pre client komponenty). */
export type DistrictPageContent = {
  path: string
  h1: string
  lead: string
  areas: string[]
  faqs: DistrictFaq[]
  areasHeading?: string
  ctaLead?: string
}

export type DistrictPageDefinition = DistrictPageContent & {
  metadata: import("next").Metadata
}

export function toDistrictPageContent(data: DistrictPageDefinition): DistrictPageContent {
  const { metadata: _metadata, ...content } = data
  return content
}
