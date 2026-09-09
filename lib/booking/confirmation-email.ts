import {
  EXTRA_LABELS_SK,
  SERVICE_LABELS_SK,
  VEHICLE_LABELS_SK,
} from "@/lib/booking/catalog"
import { formatDisplayTime } from "@/lib/booking/datetime"
import type { BookingExtra, BookingRow, BookingService, VehicleSize } from "@/lib/booking/types"
import { escapeHtml, renderKeyValueEmail, sendEmail } from "@/lib/email"
import { SITE_LOGO_URL, SITE_NAME, SITE_URL } from "@/lib/seo-site"
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/site-config"

type EmailLocale = "sk" | "en" | "de"

type EmailCopy = {
  subject: (date: string, time: string) => string
  preheader: string
  confirmed: string
  greeting: (name: string) => string
  intro: string
  visit: string
  detailsTitle: string
  labels: {
    date: string
    time: string
    address: string
    vehicle: string
    service: string
    extras: string
    extrasNone: string
    name: string
    phone: string
    email: string
    notes: string
    price: string
  }
  priceNote: string
  change: string
  footer: string
}

const SERVICE_LABELS_EN: Record<BookingService, string> = {
  refresh: "REFRESH",
  essential: "INTERIOR",
  exterior: "EXTERIOR",
  premium: "COMPLETE",
  tepovanie: "Upholstery cleaning",
}

const SERVICE_LABELS_DE: Record<BookingService, string> = {
  refresh: "REFRESH",
  essential: "INTERIEUR",
  exterior: "EXTERIEUR",
  premium: "KOMPLETT",
  tepovanie: "Polsterreinigung",
}

const EXTRA_LABELS_EN: Record<BookingExtra, string> = {
  tepovanie: "Interior upholstery cleaning",
  climate: "Air-conditioning clean",
  plastics: "Plastic impregnation",
  leather: "Leather impregnation",
  headlights: "Headlight restoration",
  engine: "Engine bay cleaning",
}

const EXTRA_LABELS_DE: Record<BookingExtra, string> = {
  tepovanie: "Innenraum-Polsterreinigung",
  climate: "Klimaanlagenreinigung",
  plastics: "Kunststoffimprägnierung",
  leather: "Lederimprägnierung",
  headlights: "Scheinwerferaufbereitung",
  engine: "Motorraumreinigung",
}

const VEHICLE_LABELS_EN: Record<VehicleSize, string> = {
  small: "Small (Hatchback / Sedan)",
  medium: "Medium (Estate / Small SUV)",
  large: "Large (Large SUV / Van)",
}

const VEHICLE_LABELS_DE: Record<VehicleSize, string> = {
  small: "Klein (Kleinwagen / Limousine)",
  medium: "Mittel (Kombi / Kompakt-SUV)",
  large: "Groß (Groß-SUV / Van)",
}

const COPY: Record<EmailLocale, EmailCopy> = {
  sk: {
    subject: (date, time) => `Termín potvrdený – ${date} o ${time} | ${SITE_NAME}`,
    preheader: "Váš termín sme potvrdili. Tešíme sa na vás.",
    confirmed: "Termín je potvrdený",
    greeting: (name) => `Dobrý deň, ${name},`,
    intro:
      "ďakujeme za dôveru. Váš termín sme práve potvrdili a tešíme sa, že sa o vaše vozidlo postaráme.",
    visit: "Prídeme priamo k vám – s vlastnou vodou a elektrinou. Prosíme, aby bolo vozidlo v dohodnutom čase prístupné.",
    detailsTitle: "Zhrnutie rezervácie",
    labels: {
      date: "Dátum",
      time: "Čas",
      address: "Adresa",
      vehicle: "Vozidlo",
      service: "Služba",
      extras: "Doplnky",
      extrasNone: "Bez doplnkov",
      name: "Meno",
      phone: "Telefón",
      email: "E-mail",
      notes: "Poznámka",
      price: "Odhadovaná cena",
    },
    priceNote: "Konečnú cenu potvrdíme pred začatím práce.",
    change: "Ak potrebujete termín upraviť, odpovedzte na tento e-mail alebo nám zavolajte.",
    footer: "Mobilný detailing Bratislava",
  },
  en: {
    subject: (date, time) => `Appointment confirmed – ${date} at ${time} | ${SITE_NAME}`,
    preheader: "Your appointment is confirmed. We look forward to seeing you.",
    confirmed: "Appointment confirmed",
    greeting: (name) => `Hello ${name},`,
    intro:
      "thank you for your trust. We have just confirmed your appointment and look forward to taking care of your vehicle.",
    visit: "We come to you with our own water and power. Please have the vehicle accessible at the agreed time.",
    detailsTitle: "Booking summary",
    labels: {
      date: "Date",
      time: "Time",
      address: "Address",
      vehicle: "Vehicle",
      service: "Service",
      extras: "Add-ons",
      extrasNone: "No add-ons",
      name: "Name",
      phone: "Phone",
      email: "Email",
      notes: "Note",
      price: "Estimated price",
    },
    priceNote: "The final price is confirmed before we start.",
    change: "If you need to change the appointment, reply to this email or call us.",
    footer: "Mobile detailing Bratislava",
  },
  de: {
    subject: (date, time) => `Termin bestätigt – ${date} um ${time} | ${SITE_NAME}`,
    preheader: "Ihr Termin ist bestätigt. Wir freuen uns auf Sie.",
    confirmed: "Termin bestätigt",
    greeting: (name) => `Guten Tag ${name},`,
    intro:
      "vielen Dank für Ihr Vertrauen. Wir haben Ihren Termin soeben bestätigt und freuen uns, Ihr Fahrzeug zu pflegen.",
    visit:
      "Wir kommen zu Ihnen – mit eigenem Wasser und Strom. Bitte stellen Sie das Fahrzeug zur vereinbarten Zeit bereit.",
    detailsTitle: "Buchungsübersicht",
    labels: {
      date: "Datum",
      time: "Uhrzeit",
      address: "Adresse",
      vehicle: "Fahrzeug",
      service: "Leistung",
      extras: "Extras",
      extrasNone: "Ohne Extras",
      name: "Name",
      phone: "Telefon",
      email: "E-Mail",
      notes: "Hinweis",
      price: "Geschätzter Preis",
    },
    priceNote: "Der Endpreis wird vor Beginn bestätigt.",
    change: "Wenn Sie den Termin ändern möchten, antworten Sie auf diese E-Mail oder rufen Sie uns an.",
    footer: "Mobiles Detailing Bratislava",
  },
}

function toEmailLocale(value: string | null | undefined): EmailLocale {
  if (value === "en" || value === "de") return value
  return "sk"
}

function serviceLabel(service: BookingService, locale: EmailLocale): string {
  if (locale === "en") return SERVICE_LABELS_EN[service]
  if (locale === "de") return SERVICE_LABELS_DE[service]
  return SERVICE_LABELS_SK[service]
}

function extraLabel(extra: BookingExtra, locale: EmailLocale): string {
  if (locale === "en") return EXTRA_LABELS_EN[extra]
  if (locale === "de") return EXTRA_LABELS_DE[extra]
  return EXTRA_LABELS_SK[extra]
}

function vehicleLabel(vehicle: VehicleSize, locale: EmailLocale): string {
  if (locale === "en") return VEHICLE_LABELS_EN[vehicle]
  if (locale === "de") return VEHICLE_LABELS_DE[vehicle]
  return VEHICLE_LABELS_SK[vehicle]
}

function formatLongDate(dateIso: string, locale: EmailLocale): string {
  const [year, month, day] = dateIso.split("-").map(Number)
  if (!year || !month || !day) return dateIso
  const date = new Date(Date.UTC(year, month - 1, day, 12))
  const tag = locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "sk-SK"
  return new Intl.DateTimeFormat(tag, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

function formatPrice(value: BookingRow["estimated_price_eur"]): string | null {
  if (value == null) return null
  const amount = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(amount)) return null
  return `${amount} €`
}

function extrasList(booking: BookingRow): BookingExtra[] {
  return Array.isArray(booking.extras) ? booking.extras : []
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;color:#a3a3a3;font-size:13px;vertical-align:top;width:38%;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#f5f5f5;font-size:14px;vertical-align:top;font-weight:500;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
    </tr>`
}

export function renderBookingConfirmationEmail(booking: BookingRow): {
  subject: string
  html: string
  text: string
  to: string
} {
  const locale = toEmailLocale(booking.locale)
  const copy = COPY[locale]
  const time = formatDisplayTime(booking.booking_time)
  const date = formatLongDate(booking.booking_date, locale)
  const extras = extrasList(booking)
  const extrasValue =
    extras.length > 0
      ? extras.map((extra) => extraLabel(extra, locale)).join(", ")
      : copy.labels.extrasNone
  const price = formatPrice(booking.estimated_price_eur)
  const notes = booking.notes?.trim() || ""

  const rows = [
    { label: copy.labels.date, value: date },
    { label: copy.labels.time, value: time },
    { label: copy.labels.address, value: booking.address },
    { label: copy.labels.vehicle, value: vehicleLabel(booking.vehicle_size, locale) },
    { label: copy.labels.service, value: serviceLabel(booking.service, locale) },
    { label: copy.labels.extras, value: extrasValue },
    { label: copy.labels.name, value: booking.customer_name },
    { label: copy.labels.phone, value: booking.customer_phone },
    { label: copy.labels.email, value: booking.customer_email },
    ...(notes ? [{ label: copy.labels.notes, value: notes }] : []),
    ...(price ? [{ label: copy.labels.price, value: price }] : []),
  ]

  const html = `<!doctype html>
<html lang="${locale}">
<body style="margin:0;padding:0;background:#0b0b0c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(copy.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0b0c;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#141414;border:1px solid #2a2a2a;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:28px 28px 16px;text-align:center;background:#101010;border-bottom:1px solid #262626;">
            <a href="${SITE_URL}" style="text-decoration:none;">
              <img src="${SITE_LOGO_URL}" alt="${SITE_NAME}" width="180" style="display:block;margin:0 auto;width:180px;max-width:70%;height:auto;border:0;" />
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 28px 8px;">
            <p style="margin:0 0 8px;color:#E8B423;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">${SITE_NAME}</p>
            <h1 style="margin:0 0 18px;color:#fafafa;font-size:26px;line-height:1.25;font-weight:600;">${escapeHtml(copy.confirmed)}</h1>
            <p style="margin:0 0 12px;color:#f5f5f5;font-size:16px;line-height:1.6;">${escapeHtml(copy.greeting(booking.customer_name))}</p>
            <p style="margin:0 0 12px;color:#d4d4d4;font-size:15px;line-height:1.65;">${escapeHtml(copy.intro)}</p>
            <p style="margin:0 0 8px;color:#d4d4d4;font-size:15px;line-height:1.65;">${escapeHtml(copy.visit)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 28px 8px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#1b1b1b;border:1px solid #2d2d2d;border-radius:12px;">
              <tr>
                <td style="padding:20px 22px 8px;">
                  <p style="margin:0;color:#E8B423;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">${escapeHtml(copy.detailsTitle)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:4px 22px 18px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    ${rows.map((row) => detailRow(row.label, row.value)).join("")}
                  </table>
                  ${
                    price
                      ? `<p style="margin:8px 0 0;color:#8a8a8a;font-size:12px;line-height:1.5;">${escapeHtml(copy.priceNote)}</p>`
                      : ""
                  }
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px 8px;">
            <p style="margin:0;color:#c4c4c4;font-size:14px;line-height:1.6;">${escapeHtml(copy.change)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px 28px;">
            <p style="margin:0 0 6px;color:#f5f5f5;font-size:14px;font-weight:600;">${SITE_NAME}</p>
            <p style="margin:0 0 4px;color:#a3a3a3;font-size:13px;">${escapeHtml(copy.footer)}</p>
            <p style="margin:0;color:#a3a3a3;font-size:13px;">
              <a href="mailto:${CONTACT_EMAIL}" style="color:#E8B423;text-decoration:none;">${CONTACT_EMAIL}</a>
              &nbsp;·&nbsp;
              <a href="tel:+421918722720" style="color:#E8B423;text-decoration:none;">${CONTACT_PHONE_DISPLAY}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = [
    copy.confirmed,
    "",
    copy.greeting(booking.customer_name),
    copy.intro,
    copy.visit,
    "",
    copy.detailsTitle,
    ...rows.map((row) => `${row.label}: ${row.value}`),
    ...(price ? [copy.priceNote] : []),
    "",
    copy.change,
    "",
    SITE_NAME,
    copy.footer,
    CONTACT_EMAIL,
    CONTACT_PHONE_DISPLAY,
    SITE_URL,
  ].join("\n")

  return {
    subject: copy.subject(date, time),
    html,
    text,
    to: booking.customer_email,
  }
}

export async function sendBookingConfirmationEmail(booking: BookingRow): Promise<void> {
  const email = renderBookingConfirmationEmail(booking)
  await sendEmail({
    to: email.to,
    subject: email.subject,
    html: email.html,
    text: email.text,
    replyTo: CONTACT_EMAIL,
  })
}

export async function sendOwnerNewBookingEmail(input: {
  customerName: string
  customerPhone: string
  customerEmail: string
  address: string
  bookingDate: string
  bookingTime: string
  vehicleLabel: string
  serviceLabel: string
  extrasLabel: string
  estimatedPrice: number
  notes?: string
}): Promise<boolean> {
  const { html, text } = renderKeyValueEmail({
    heading: "Nová rezervácia na potvrdenie",
    intro: "Klient odoslal rezerváciu cez web. Potvrďte ju v administrácii.",
    rows: [
      { label: "Meno", value: input.customerName },
      { label: "Telefón", value: input.customerPhone },
      { label: "E-mail", value: input.customerEmail },
      { label: "Adresa", value: input.address },
      { label: "Dátum", value: input.bookingDate },
      { label: "Čas", value: input.bookingTime },
      { label: "Vozidlo", value: input.vehicleLabel },
      { label: "Služba", value: input.serviceLabel },
      { label: "Doplnky", value: input.extrasLabel },
      { label: "Odhad ceny", value: `${input.estimatedPrice} €` },
      { label: "Poznámka", value: input.notes || "—" },
    ],
    footnote: `Admin: ${SITE_URL}/admin`,
  })

  return sendEmail({
    to: CONTACT_EMAIL,
    subject: `Nová rezervácia – ${input.bookingDate} ${input.bookingTime}`,
    html,
    text,
    replyTo: input.customerEmail,
  })
}
