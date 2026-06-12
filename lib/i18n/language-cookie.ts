export type Language = "en" | "sk" | "de"

export const LANGUAGE_COOKIE = "language"
const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const LANGUAGES: Language[] = ["sk", "en", "de"]

export function isLanguage(value: string | undefined): value is Language {
  return value !== undefined && (LANGUAGES as string[]).includes(value)
}

export function parseLanguage(value: string | undefined): Language {
  return isLanguage(value) ? value : "sk"
}

export function setLanguageCookie(language: Language): void {
  document.cookie = `${LANGUAGE_COOKIE}=${language};path=/;max-age=${LANGUAGE_COOKIE_MAX_AGE};SameSite=Lax`
}
