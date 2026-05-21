import { Resend } from "resend"

/**
 * Spoločný helper na odosielanie e-mailov cez Resend.
 *
 * Konfigurácia cez ENV (nastav vo Verceli):
 * - RESEND_API_KEY        – API kľúč z Resendu (povinné)
 * - LEAD_INBOX_EMAIL      – príjemca dopytov (default: kontakt@crystaldetailing.sk)
 * - RESEND_FROM           – odosielateľ; po overení domény nastav napr.
 *                           "Crystal Detailing <kontakt@crystaldetailing.sk>"
 *                           Pred overením domény nechaj prázdne – použije sa
 *                           Resend test sender "onboarding@resend.dev".
 */

const DEFAULT_FROM = "Crystal Detailing <onboarding@resend.dev>"
const DEFAULT_TO = "kontakt@crystaldetailing.sk"

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY)
}

export function getInboxEmail(): string {
  return process.env.LEAD_INBOX_EMAIL?.trim() || DEFAULT_TO
}

export function getFromAddress(): string {
  return process.env.RESEND_FROM?.trim() || DEFAULT_FROM
}

let cachedClient: Resend | null = null

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!cachedClient) {
    cachedClient = new Resend(key)
  }
  return cachedClient
}

export interface SendEmailOptions {
  subject: string
  html: string
  text: string
  /** Použité pre Reply-To, aby team mohol priamo odpovedať odosielateľovi. */
  replyTo?: string
  to?: string
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const client = getClient()
  if (!client) {
    console.warn("[email] RESEND_API_KEY is not set – skipping send.")
    return
  }
  const { subject, html, text, replyTo, to } = options
  const result = await client.emails.send({
    from: getFromAddress(),
    to: [to || getInboxEmail()],
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  })
  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message}`)
  }
}

/** Escapovanie HTML pre bezpečné vloženie userom zadaných hodnôt. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Pekné HTML telo s tabuľkou kľúč/hodnota. */
export function renderKeyValueEmail(params: {
  heading: string
  intro?: string
  rows: Array<{ label: string; value: string | null | undefined }>
  footnote?: string
}): { html: string; text: string } {
  const { heading, intro, rows, footnote } = params
  const visibleRows = rows.filter((r) => r.value != null && r.value !== "")
  const rowsHtml = visibleRows
    .map(
      (r) => `
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:14px;vertical-align:top;white-space:nowrap;">${escapeHtml(
            r.label,
          )}</td>
          <td style="padding:8px 12px;color:#111827;font-size:14px;vertical-align:top;">${escapeHtml(
            String(r.value),
          ).replace(/\n/g, "<br/>")}</td>
        </tr>`,
    )
    .join("")

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="padding:24px 24px 12px;">
          <h1 style="margin:0 0 8px;color:#111827;font-size:18px;font-weight:600;">${escapeHtml(heading)}</h1>
          ${intro ? `<p style="margin:0 0 12px;color:#4b5563;font-size:14px;line-height:1.5;">${escapeHtml(intro)}</p>` : ""}
        </td></tr>
        <tr><td style="padding:0 12px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;">
            ${rowsHtml}
          </table>
        </td></tr>
        ${
          footnote
            ? `<tr><td style="padding:12px 24px 24px;color:#9ca3af;font-size:12px;border-top:1px solid #f3f4f6;">${escapeHtml(footnote)}</td></tr>`
            : ""
        }
      </table>
    </td></tr>
  </table>
</body></html>`

  const text =
    `${heading}\n` +
    (intro ? `${intro}\n` : "") +
    "\n" +
    visibleRows.map((r) => `${r.label}: ${r.value}`).join("\n") +
    (footnote ? `\n\n${footnote}` : "")

  return { html, text }
}
