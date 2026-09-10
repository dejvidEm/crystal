"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/language-context"
import { createConversionTransactionId, trackGoogleAdsPurchaseConversion } from "@/lib/google-ads"

const HERO_CITIES = [
  "Bratislava",
  "Pezinok",
  "Senec",
  "Chorvátsky Grob",
  "Malacky",
  "Senica",
  "Skalica",
  "Trnava",
  "Galanta",
  "Dunajská Streda",
  "Hainburg an der Donau",
  "Bruck an der Leitha",
  "Eisenstadt",
  "Schwechat",
  "Wien",
] as const

type Status = "idle" | "submitting" | "success" | "error"

const fieldClass =
  "h-11 border-white/15 bg-zinc-950/60 text-white placeholder:text-zinc-500 focus-visible:ring-primary"

export function HeroLeadForm() {
  const { t } = useLanguage()
  const copy = t.heroLead
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [city, setCity] = useState<string>(HERO_CITIES[0])
  const [hasDiscount, setHasDiscount] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "submitting") return
    if (!consent) {
      setStatus("error")
      setErrorMessage(copy.consentRequired)
      return
    }
    setStatus("submitting")
    setErrorMessage(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "hero",
          name,
          email,
          phone,
          message,
          city,
          discountCode: hasDiscount ? discountCode : "",
        }),
      })
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Submit failed")
      }
      setStatus("success")
      trackGoogleAdsPurchaseConversion(createConversionTransactionId())
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error && err.message ? err.message : copy.errorGeneric,
      )
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/35 px-6 py-10 text-center shadow-2xl backdrop-blur-sm">
        <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-2xl font-semibold text-white">{copy.successTitle}</h3>
        <p className="max-w-sm text-sm text-zinc-400">{copy.successText}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/35 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-7">
      <h2 className="text-xl font-bold text-white sm:text-2xl">{copy.formTitle}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{copy.formSubtitle}</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
        <Field id="hero-lead-name" label={copy.nameLabel} required>
          <Input
            id="hero-lead-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "submitting"}
            placeholder={copy.namePlaceholder}
            className={fieldClass}
          />
        </Field>

        <Field id="hero-lead-phone" label={copy.phoneLabel} required>
          <Input
            id="hero-lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === "submitting"}
            placeholder={copy.phonePlaceholder}
            className={fieldClass}
          />
        </Field>

        <Field id="hero-lead-email" label={copy.emailLabel} required>
          <Input
            id="hero-lead-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            placeholder={copy.emailPlaceholder}
            className={fieldClass}
          />
        </Field>

        <Field id="hero-lead-message" label={copy.messageLabel}>
          <Textarea
            id="hero-lead-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === "submitting"}
            placeholder={copy.messagePlaceholder}
            className="min-h-[84px] border-white/15 bg-zinc-950/60 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
          />
        </Field>

        <Field id="hero-lead-city" label={copy.cityLabel}>
          <div className="space-y-2">
            <select
              id="hero-lead-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={status === "submitting"}
              className="flex h-11 w-full rounded-md border border-primary/40 bg-primary/10 px-3 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {HERO_CITIES.map((option) => (
                <option key={option} value={option} className="bg-zinc-950 text-white">
                  {`${copy.citySelectedPrefix} ${option}`}
                </option>
              ))}
              <option value={copy.otherCity} className="bg-zinc-950 text-white">
                {copy.otherCity}
              </option>
            </select>
          </div>
        </Field>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-300">
          <Checkbox
            checked={hasDiscount}
            onCheckedChange={(value) => setHasDiscount(value === true)}
            disabled={status === "submitting"}
            className="mt-0.5 border-white/30"
          />
          <span>{copy.discountLabel}</span>
        </label>

        {hasDiscount ? (
          <Input
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            disabled={status === "submitting"}
            placeholder={copy.discountPlaceholder}
            className={fieldClass}
            autoComplete="off"
          />
        ) : null}

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-300">
          <Checkbox
            checked={consent}
            onCheckedChange={(value) => setConsent(value === true)}
            disabled={status === "submitting"}
            className="mt-0.5 border-white/30"
            required
          />
          <span>
            {copy.consentBeforeLink}{" "}
            <Link
              href="/ochrana-osobnych-udajov"
              className="text-primary underline-offset-2 hover:underline"
              target="_blank"
            >
              {copy.consentLink}
            </Link>
            .
          </span>
        </label>

        {errorMessage && status === "error" ? (
          <p className="text-sm text-red-400" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="h-12 w-full bg-primary text-base font-semibold text-white hover:bg-primary/90 hover:text-white"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {copy.submitting}
            </>
          ) : (
            copy.submit
          )}
        </Button>

        <p className="text-center text-xs leading-relaxed text-zinc-500">{copy.submitNote}</p>
      </form>
    </div>
  )
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-sm text-zinc-200">
        {label}
        {required ? <span className="ml-0.5 text-primary">*</span> : null}
      </Label>
      {children}
    </div>
  )
}
