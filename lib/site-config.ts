/** Jednotná konfigurácia kontaktov, sociálnych sietí a rezervácie naprieč webom. */

/** Kontaktný e-mail */
export const CONTACT_EMAIL = "kontakt@crystaldetailing.sk" as const
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}` as const

/** Telefón – zobrazovaný formát a strojový (E.164) formát pre tel:/WhatsApp */
export const CONTACT_PHONE_DISPLAY = "+421 918 722 720" as const
export const CONTACT_PHONE_E164 = "+421918722720" as const
export const CONTACT_PHONE_TEL = `tel:${CONTACT_PHONE_E164}` as const

/** WhatsApp číslo bez "+" (wa.me formát) */
export const WHATSAPP_NUMBER = "421918722720" as const

/** Vytvorí WhatsApp odkaz, voliteľne s predvyplnenou správou. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Bookio rezervačný widget */
export const BOOKIO_WIDGET_BASE =
  "https://services.bookio.com/crystal-detailing-ob6b7b8y/widget" as const

/** Vytvorí Bookio odkaz so správnym jazykom (sk/en). */
export function bookioUrl(lang?: string): string {
  const normalized = lang === "en" ? "en" : "sk"
  return `${BOOKIO_WIDGET_BASE}?lang=${normalized}`
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
