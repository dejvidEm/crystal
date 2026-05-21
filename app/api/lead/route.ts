import { NextResponse } from "next/server"
import { renderKeyValueEmail, sendEmail } from "@/lib/email"

/**
 * Endpoint pre nezáväzný dopyt z kalkulačky.
 * Validuje payload a pošle ho cez Resend na inbox tímu.
 */

export const runtime = "nodejs"

type LeadPayload = {
  email?: unknown
  phone?: unknown
  city?: unknown
  mainService?: unknown
  vehicleType?: unknown
  condition?: unknown
  addons?: unknown
  priceEur?: unknown
  timeMinutes?: unknown
}

function isString(value: unknown): value is string {
  return typeof value === "string"
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== ""
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Aspoň 9 číslic (po odstránení medzier, +, ()-)
const PHONE_DIGITS_MIN = 9

export async function POST(request: Request) {
  let body: LeadPayload
  try {
    body = (await request.json()) as LeadPayload
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  if (!isNonEmptyString(body.email) || !EMAIL_RE.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Zadajte platný e-mail." },
      { status: 422 },
    )
  }

  if (!isNonEmptyString(body.phone)) {
    return NextResponse.json(
      { ok: false, error: "Zadajte telefónne číslo." },
      { status: 422 },
    )
  }

  const phoneDigits = body.phone.replace(/\D/g, "")
  if (phoneDigits.length < PHONE_DIGITS_MIN) {
    return NextResponse.json(
      { ok: false, error: "Telefónne číslo má príliš málo číslic." },
      { status: 422 },
    )
  }

  const lead = {
    email: body.email.trim(),
    phone: body.phone.trim(),
    city: isString(body.city) ? body.city.trim() : "",
    mainService: isString(body.mainService) ? body.mainService : null,
    vehicleType: isString(body.vehicleType) ? body.vehicleType : null,
    condition: isString(body.condition) ? body.condition : null,
    addons: Array.isArray(body.addons) ? body.addons.filter(isString) : [],
    priceEur: typeof body.priceEur === "number" ? body.priceEur : null,
    timeMinutes: typeof body.timeMinutes === "number" ? body.timeMinutes : null,
    receivedAt: new Date().toISOString(),
  }

  console.info("[lead]", lead)

  try {
    await sendLeadNotification(lead)
  } catch (err) {
    console.error("[lead] notification failed:", err)
  }

  return NextResponse.json({ ok: true })
}

type Lead = {
  email: string
  phone: string
  city: string
  mainService: string | null
  vehicleType: string | null
  condition: string | null
  addons: string[]
  priceEur: number | null
  timeMinutes: number | null
  receivedAt: string
}

const PACKAGE_LABELS: Record<string, string> = {
  refresh: "REFRESH (39 €)",
  essential: "INTERIÉR (79 €)",
  premium: "KOMPLET (119 €)",
  ultimate: "TEPOVANIE (49 €)",
}
const VEHICLE_LABELS: Record<string, string> = {
  small: "Malé (Hatchback / Sedan)",
  medium: "Stredné (Kombi / Malé SUV)",
  large: "Veľké (Veľké SUV / Dodávka)",
}
const CONDITION_LABELS: Record<string, string> = {
  normal: "Normálny",
  dirty: "Špinavé",
  extreme: "Extrémne znečistenie",
}
const ADDON_LABELS: Record<string, string> = {
  seats: "Tepovanie sedačiek",
  carpets: "Tepovanie koberčekov",
  leather: "Impregnácia kožených sedačiek a častí",
  headlights: "Renovácia svetlometov",
}

function labelOrRaw(map: Record<string, string>, key: string | null): string {
  if (!key) return ""
  return map[key] || key
}

function formatMinutes(min: number | null): string {
  if (min == null) return ""
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}

async function sendLeadNotification(lead: Lead): Promise<void> {
  const addonText = lead.addons
    .map((a) => ADDON_LABELS[a] || a)
    .join(", ")

  const { html, text } = renderKeyValueEmail({
    heading: "Nový nezáväzný dopyt z kalkulačky",
    intro: "Klient prešiel kalkulačkou na webe a žiada nezáväznú ponuku.",
    rows: [
      { label: "E-mail", value: lead.email },
      { label: "Mobil", value: lead.phone },
      { label: "Mesto / PSČ", value: lead.city || null },
      { label: "Balík", value: labelOrRaw(PACKAGE_LABELS, lead.mainService) },
      { label: "Veľkosť vozidla", value: labelOrRaw(VEHICLE_LABELS, lead.vehicleType) },
      { label: "Stav vozidla", value: labelOrRaw(CONDITION_LABELS, lead.condition) },
      { label: "Doplnky (orientačne)", value: addonText || null },
      {
        label: "Vypočítaná cena",
        value: lead.priceEur != null ? `${lead.priceEur} €` : null,
      },
      {
        label: "Odhadovaný čas",
        value: lead.timeMinutes != null ? formatMinutes(lead.timeMinutes) : null,
      },
    ],
    footnote: `Prijaté: ${lead.receivedAt}`,
  })

  await sendEmail({
    subject: `Dopyt z kalkulačky – ${lead.email}`,
    html,
    text,
    replyTo: lead.email,
  })
}
