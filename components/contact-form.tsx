"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Building2, CheckCircle2, Loader2, Mail, MessageSquare, Phone, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/language-context"
import { createConversionTransactionId, trackGoogleAdsPurchaseConversion } from "@/lib/google-ads"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "submitting") return
    setStatus("submitting")
    setErrorMessage(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, message }),
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
        err instanceof Error && err.message
          ? err.message
          : t.contactForm?.errorGeneric || "Niečo sa pokazilo. Skúste to prosím ešte raz.",
      )
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex h-full flex-col items-center justify-center rounded-md p-8 text-center shadow-2xl sm:p-12"
      >
        <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-2xl font-semibold text-gradient">
          {t.contactForm?.successTitle || "Ďakujeme, správa odoslaná."}
        </h3>
        <p className="text-sm text-zinc-400">
          {t.contactForm?.successText ||
            "Ozveme sa vám čo najskôr – obvykle v priebehu pracovného dňa."}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="glass-card h-full rounded-md p-8 shadow-2xl sm:p-10">
      <h3 className="mb-2 text-2xl font-bold text-gradient sm:text-3xl">
        {t.contactForm?.title || "Napíšte nám"}
      </h3>
      <p className="mb-6 text-sm text-zinc-400">
        {t.contactForm?.subtitle ||
          "Máte otázku alebo špecifickú požiadavku? Pošlite správu a my sa vám ozveme."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <IconField
            id="contact-name"
            label={t.contactForm?.nameLabel || "Meno"}
            icon={<User className="h-4 w-4" />}
          >
            <Input
              id="contact-name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "submitting"}
              placeholder={t.contactForm?.namePlaceholder || "Vaše meno"}
              className="pl-9"
            />
          </IconField>
          <IconField
            id="contact-company"
            label={
              <>
                {t.contactForm?.companyLabel || "Názov firmy"}
                <span className="ml-1 text-xs font-normal text-zinc-500">
                  ({t.contactForm?.optional || "voliteľné"})
                </span>
              </>
            }
            icon={<Building2 className="h-4 w-4" />}
          >
            <Input
              id="contact-company"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={status === "submitting"}
              placeholder={t.contactForm?.companyPlaceholder || "Vaša firma"}
              className="pl-9"
            />
          </IconField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <IconField
            id="contact-email"
            label={t.contactForm?.emailLabel || "E-mail"}
            icon={<Mail className="h-4 w-4" />}
          >
            <Input
              id="contact-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              placeholder="vas@email.sk"
              className="pl-9"
            />
          </IconField>
          <IconField
            id="contact-phone"
            label={t.contactForm?.phoneLabel || "Mobil"}
            icon={<Phone className="h-4 w-4" />}
          >
            <Input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === "submitting"}
              placeholder="+421 9xx xxx xxx"
              className="pl-9"
            />
          </IconField>
        </div>

        <div>
          <Label htmlFor="contact-message" className="mb-1.5 block">
            {t.contactForm?.messageLabel || "Správa"}
          </Label>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "submitting"}
              placeholder={
                t.contactForm?.messagePlaceholder ||
                "Stručne nám napíšte, čo potrebujete..."
              }
              className="pl-9"
            />
          </div>
        </div>

        {errorMessage && status === "error" && (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.contactForm?.submitting || "Odosielam..."}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {t.contactForm?.submit || "Odoslať"}
            </>
          )}
        </Button>

        <p className="text-center text-xs text-zinc-500">
          {t.contactForm?.consent ||
            "Odoslaním súhlasíte so spracovaním kontaktných údajov pre vybavenie dopytu."}
        </p>
      </form>
    </div>
  )
}

function IconField({
  id,
  label,
  icon,
  children,
}: {
  id: string
  label: React.ReactNode
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block">
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}
