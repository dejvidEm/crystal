/** Jednotná konfigurácia kontaktov, sociálnych sietí a rezervácie naprieč webom. */

/** Kontaktný e-mail */
export const CONTACT_EMAIL = "kontakt@crystaldetailing.sk" as const
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}` as const

/** Telefón – zobrazovaný formát a strojový (E.164) formát pre tel:/WhatsApp */
export const CONTACT_PHONE_DISPLAY = "+421 918 722 720" as const
export const CONTACT_PHONE_E164 = "+421918722720" as const
export const CONTACT_PHONE_TEL = `tel:${CONTACT_PHONE_E164}` as const

/** Google recenzie – profil / zdieľaný odkaz */
export const GOOGLE_REVIEWS_URL = "https://share.google/YZISypzCwKXNKtRM7" as const

/** WhatsApp číslo bez "+" (wa.me formát) */
export const WHATSAPP_NUMBER = "421918722720" as const

/** Vytvorí WhatsApp odkaz, voliteľne s predvyplnenou správou. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const WHATSAPP_QUOTE_MESSAGES = {
  sk: "Dobrý deň, mám záujem o mobilné čistenie auta. Posielam fotky vozidla a prosím o odhad ceny a najbližší voľný termín.",
  en: "Hello, I am interested in mobile car cleaning. I am sending photos of my vehicle and would like a price estimate and the next available appointment.",
  de: "Guten Tag, ich interessiere mich für eine mobile Autoreinigung. Ich sende Fotos meines Fahrzeugs und bitte um eine Preiseinschätzung und den nächsten freien Termin.",
} as const

/** WhatsApp odkaz s predvyplnenou správou pre rýchly dopyt. */
export function whatsappQuoteUrl(lang?: string): string {
  const normalized = lang === "en" ? "en" : lang === "de" ? "de" : "sk"
  return whatsappUrl(WHATSAPP_QUOTE_MESSAGES[normalized])
}

/** Interný rezervačný tok (nahrádza Bookio). */
export const BOOKING_PATH = "/rezervacia" as const

export type BookingPrefill = {
  service?: string
  vehicle?: string
  extra?: string
}

/** Odkaz na vlastný rezervačný proces, voliteľne s predvyplnenou službou. */
export function bookioUrl(_lang?: string, prefill?: BookingPrefill): string {
  const params = new URLSearchParams()
  if (prefill?.service) params.set("service", prefill.service)
  if (prefill?.vehicle) params.set("vehicle", prefill.vehicle)
  if (prefill?.extra) params.set("extra", prefill.extra)
  const query = params.toString()
  return query ? `${BOOKING_PATH}?${query}` : BOOKING_PATH
}

/** Sociálne siete */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/crystal_bratislava/",
  facebook: "https://www.facebook.com/profile.php?id=61550688610034",
} as const

/** Firemné / fakturačné údaje */
export const COMPANY_LEGAL = {
  name: "INVEST M, s.r.o.",
  ico: "36685984",
  dic: "2022258535",
} as const
