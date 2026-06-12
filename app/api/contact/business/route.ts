import { after, NextResponse } from "next/server"
import { renderKeyValueEmail, sendEmail } from "@/lib/email"

export const runtime = "nodejs"

type BusinessContactPayload = {
  company?: unknown
  name?: unknown
  email?: unknown
  phone?: unknown
  fleetSize?: unknown
  message?: unknown
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== ""
}

function isString(value: unknown): value is string {
  return typeof value === "string"
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_DIGITS_MIN = 9
const MESSAGE_MAX = 2000
const NAME_MAX = 120
const COMPANY_MAX = 160
const FLEET_MIN = 1
const FLEET_MAX = 9999

export async function POST(request: Request) {
  let body: BusinessContactPayload
  try {
    body = (await request.json()) as BusinessContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  if (!isNonEmptyString(body.company) || body.company.length > COMPANY_MAX) {
    return NextResponse.json({ ok: false, error: "Zadajte názov firmy." }, { status: 422 })
  }
  if (!isNonEmptyString(body.name) || body.name.length > NAME_MAX) {
    return NextResponse.json({ ok: false, error: "Zadajte kontaktnú osobu." }, { status: 422 })
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

  const fleetSize =
    typeof body.fleetSize === "number"
      ? body.fleetSize
      : typeof body.fleetSize === "string"
        ? Number.parseInt(body.fleetSize, 10)
        : NaN

  if (!Number.isFinite(fleetSize) || fleetSize < FLEET_MIN || fleetSize > FLEET_MAX) {
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

type BusinessMessage = {
  company: string
  name: string
  email: string
  phone: string
  fleetSize: number
  message: string
  receivedAt: string
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
