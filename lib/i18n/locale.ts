import type { Language } from "./language-cookie"

export type ContentLocale = Language

export function toContentLocale(language: string): ContentLocale {
  if (language === "en" || language === "de") return language
  return "sk"
}

export const LOCALE_LABELS: Record<Language, string> = {
  sk: "Slovenčina",
  en: "English",
  de: "Deutsch",
}

export const LOCALE_SHORT: Record<Language, string> = {
  sk: "SK",
  en: "EN",
  de: "DE",
}

export function dateLocale(lang: ContentLocale): string {
  if (lang === "sk") return "sk-SK"
  if (lang === "de") return "de-DE"
  return "en-GB"
}
