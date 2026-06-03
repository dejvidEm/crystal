/** Konzervatívny limit (~1000 px v SEO nástrojoch pre slovenčinu). */
export const META_DESCRIPTION_MAX_LENGTH = 158

export function metaDescription(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim()
  if (normalized.length <= META_DESCRIPTION_MAX_LENGTH) return normalized

  const cut = normalized.slice(0, META_DESCRIPTION_MAX_LENGTH - 1)
  const lastSpace = cut.lastIndexOf(" ")
  const base = lastSpace > 100 ? cut.slice(0, lastSpace) : cut
  return `${base}…`
}
