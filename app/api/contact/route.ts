import { after, NextResponse } from "next/server"
import { renderKeyValueEmail, sendEmail } from "@/lib/email"

/**
 * Endpoint pre kontaktný formulár v sekcii „Ste pripravení…".
 * Validuje vstup a pošle ho cez Resend na inbox tímu.
 */

export const runtime = "nodejs"

type ContactPayload = {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
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

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  if (!isNonEmptyString(body.name) || body.name.length > NAME_MAX) {
    return NextResponse.json({ ok: false, error: "Zadajte svoje meno." }, { status: 422 })
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

  // Resend volanie posúvame za odpoveď, nech používateľ nečaká na sieťový
  // round-trip k e-mailovej službe. `after()` (Next.js 15) garantuje, že
  // úloha dobehne v rámci toho istého serverless invocation-u.
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
