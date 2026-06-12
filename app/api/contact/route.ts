import { after, NextResponse } from "next/server"
import { renderKeyValueEmail, sendEmail } from "@/lib/email"

/**
 * Spoločný endpoint pre kontaktné formuláre (domovská stránka aj /pre-firmy).
 * Validuje vstup a pošle ho cez Resend na LEAD_INBOX_EMAIL.
 */

export const runtime = "nodejs"

type ContactPayload = {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
  fleetSize?: unknown
}

function isString(value: unknown): value is string {
  return typeof value === "string"
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== ""
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_DIGITS_MIN = 9
const MESSAGE_MAX = 2000
const NAME_MAX = 120
const COMPANY_MAX = 160
const FLEET_MIN = 1
const FLEET_MAX = 9999

function parseFleetSize(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : NaN
  if (!Number.isFinite(parsed)) return null
  return parsed
}

function isBusinessPayload(body: ContactPayload): boolean {
  return body.fleetSize !== undefined && body.fleetSize !== null && body.fleetSize !== ""
}

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  const isBusiness = isBusinessPayload(body)

  if (!isNonEmptyString(body.name) || body.name.length > NAME_MAX) {
    return NextResponse.json(
      { ok: false, error: isBusiness ? "Zadajte kontaktnú osobu." : "Zadajte svoje meno." },
      { status: 422 },
    )
  }
  if (!isNonEmptyString(body.email) || !EMAIL_RE.test(body.email)) {
    return NextResponse.json({ ok: false, error: "Zadajte platný e-mail." }, { status: 422 })
  }
  if (!isNonEmptyString(body.phone)) {
    return NextResponse.json({ ok: false, error: "Zadajte telefónne číslo." }, { status: 422 })
  }
  if (body.phone.replace(/\D/g, "").length < PHONE_DIGITS_MIN) {
    return NextResponse.json(
      { ok: false, error: "Telefónne číslo má príliš málo číslic." },
      { status: 422 },
    )
  }

  if (isBusiness) {
    if (!isNonEmptyString(body.company) || body.company.length > COMPANY_MAX) {
      return NextResponse.json({ ok: false, error: "Zadajte názov firmy." }, { status: 422 })
    }

    const fleetSize = parseFleetSize(body.fleetSize)
    if (fleetSize === null || fleetSize < FLEET_MIN || fleetSize > FLEET_MAX) {
      return NextResponse.json(
        { ok: false, error: "Zadajte platný počet vozidiel vo flotile." },
        { status: 422 },
      )
    }

    if (isString(body.message) && body.message.length > MESSAGE_MAX) {
      return NextResponse.json({ ok: false, error: "Poznámka je príliš dlhá." }, { status: 422 })
    }

    const contact = {
      company: body.company.trim(),
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      fleetSize,
      message: isString(body.message) ? body.message.trim() : "",
      receivedAt: new Date().toISOString(),
    }

    console.info("[contact/business]", contact)

    after(async () => {
      try {
        await sendBusinessNotification(contact)
      } catch (err) {
        console.error("[contact/business] notification failed:", err)
      }
    })

    return NextResponse.json({ ok: true })
  }

  if (!isNonEmptyString(body.message) || body.message.length > MESSAGE_MAX) {
    return NextResponse.json({ ok: false, error: "Napíšte krátku správu." }, { status: 422 })
  }
  if (isString(body.company) && body.company.length > COMPANY_MAX) {
    return NextResponse.json({ ok: false, error: "Názov firmy je príliš dlhý." }, { status: 422 })
  }

  const contact = {
    name: body.name.trim(),
    company: isString(body.company) ? body.company.trim() : "",
    email: body.email.trim(),
    phone: body.phone.trim(),
    message: body.message.trim(),
    receivedAt: new Date().toISOString(),
  }

  console.info("[contact]", contact)

  after(async () => {
    try {
      await sendContactNotification(contact)
    } catch (err) {
      console.error("[contact] notification failed:", err)
    }
  })

  return NextResponse.json({ ok: true })
}

type ContactMessage = {
  name: string
  company: string
  email: string
  phone: string
  message: string
  receivedAt: string
}

type BusinessMessage = {
  company: string
  name: string
  email: string
  phone: string
  fleetSize: number
  message: string
  receivedAt: string
}

async function sendContactNotification(msg: ContactMessage): Promise<void> {
  const { html, text } = renderKeyValueEmail({
    heading: "Nová správa z kontaktného formulára",
    intro: "Odoslané z webu crystaldetailing.sk.",
    rows: [
      { label: "Meno", value: msg.name },
      { label: "Firma", value: msg.company || null },
      { label: "E-mail", value: msg.email },
      { label: "Mobil", value: msg.phone },
      { label: "Správa", value: msg.message },
    ],
    footnote: `Prijaté: ${msg.receivedAt}`,
  })

  await sendEmail({
    subject: `Kontaktný formulár – ${msg.name}`,
    html,
    text,
    replyTo: msg.email,
  })
}

async function sendBusinessNotification(msg: BusinessMessage): Promise<void> {
  const { html, text } = renderKeyValueEmail({
    heading: "Nový firemný dopyt – Pre firmy",
    intro: "Odoslané z webu crystaldetailing.sk/pre-firmy.",
    rows: [
      { label: "Firma", value: msg.company },
      { label: "Kontaktná osoba", value: msg.name },
      { label: "E-mail", value: msg.email },
      { label: "Mobil", value: msg.phone },
      { label: "Počet vozidiel", value: String(msg.fleetSize) },
      { label: "Poznámka", value: msg.message || null },
    ],
    footnote: `Prijaté: ${msg.receivedAt}`,
  })

  await sendEmail({
    subject: `Firemný dopyt – ${msg.company}`,
    html,
    text,
    replyTo: msg.email,
  })
}
