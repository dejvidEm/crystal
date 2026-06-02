export type Language = "en" | "sk"

export const LANGUAGE_COOKIE = "language"
const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function parseLanguage(value: string | undefined): Language {
  return value === "en" ? "en" : "sk"
}

export function setLanguageCookie(language: Language): void {
  document.cookie = `${LANGUAGE_COOKIE}=${language};path=/;max-age=${LANGUAGE_COOKIE_MAX_AGE};SameSite=Lax`
}
