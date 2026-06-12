"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import {
  Briefcase,
  Building2,
  Car as CarIcon,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/language-context"
import { createConversionTransactionId, trackGoogleAdsPurchaseConversion } from "@/lib/google-ads"

type Status = "idle" | "submitting" | "success" | "error"

export function BusinessContactForm() {
  const { t } = useLanguage()
  const bc = t.businessContactForm
  const [company, setCompany] = useState("")
  const [industry, setIndustry] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [fleetSize, setFleetSize] = useState("")
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
        body: JSON.stringify({
          company,
          industry,
          name,
          email,
          phone,
          fleetSize: Number.parseInt(fleetSize, 10),
          message,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
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
          : bc?.errorGeneric || "Niečo sa pokazilo. Skúste to prosím ešte raz.",
      )
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mx-auto flex max-w-2xl flex-col items-center justify-center rounded-lg p-8 text-center sm:p-12"
      >
        <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-2xl font-semibold text-gradient">
          {bc?.successTitle || "Ďakujeme, dopyt odoslaný."}
        </h3>
        <p className="text-sm text-zinc-400">
          {bc?.successText ||
            "Pripravíme firemnú ponuku a ozveme sa vám čo najskôr."}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="glass-card mx-auto max-w-2xl rounded-lg p-8 sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <IconField
          id="business-company"
          label={bc?.companyLabel || "Názov firmy"}
          icon={<Building2 className="h-4 w-4" />}
        >
          <Input
            id="business-company"
            required
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={status === "submitting"}
            placeholder={bc?.companyPlaceholder || "Názov vašej firmy"}
            className="pl-9"
          />
        </IconField>

        <IconField
          id="business-industry"
          label={
            <>
              {bc?.industryLabel || "Segment alebo odvetvie"}
              <span className="ml-1 text-xs font-normal text-zinc-500">
                ({bc?.optional || "voliteľné"})
              </span>
            </>
          }
          icon={<Briefcase className="h-4 w-4" />}
        >
          <Input
            id="business-industry"
            autoComplete="organization-title"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            disabled={status === "submitting"}
            placeholder={
              bc?.industryPlaceholder ||
              "napr. preprava osôb, stavebníctvo, gastro..."
            }
            className="pl-9"
          />
        </IconField>

        <div className="grid gap-4 sm:grid-cols-2">
          <IconField
            id="business-name"
            label={bc?.nameLabel || "Kontaktná osoba"}
            icon={<User className="h-4 w-4" />}
          >
            <Input
              id="business-name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "submitting"}
              placeholder={bc?.namePlaceholder || "Meno a priezvisko"}
              className="pl-9"
            />
          </IconField>
          <IconField
            id="business-fleet"
            label={bc?.fleetLabel || "Počet vozidiel vo flotile"}
            icon={<CarIcon className="h-4 w-4" />}
          >
            <Input
              id="business-fleet"
              type="number"
              inputMode="numeric"
              min={1}
              max={9999}
              required
              value={fleetSize}
              onChange={(e) => setFleetSize(e.target.value)}
              disabled={status === "submitting"}
              placeholder={bc?.fleetPlaceholder || "napr. 12"}
              className="pl-9"
            />
          </IconField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <IconField
            id="business-email"
            label={bc?.emailLabel || "E-mail"}
            icon={<Mail className="h-4 w-4" />}
          >
            <Input
              id="business-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              placeholder="firma@email.sk"
              className="pl-9"
            />
          </IconField>
          <IconField
            id="business-phone"
            label={bc?.phoneLabel || "Mobil"}
            icon={<Phone className="h-4 w-4" />}
          >
            <Input
              id="business-phone"
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
          <Label htmlFor="business-message" className="mb-1.5 block">
            {bc?.messageLabel || "Poznámka"}
            <span className="ml-1 text-xs font-normal text-zinc-500">
              ({bc?.optional || "voliteľné"})
            </span>
          </Label>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="business-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "submitting"}
              placeholder={
                bc?.messagePlaceholder ||
                "Typ vozidiel, frekvencia starostlivosti, preferované termíny..."
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
              {bc?.submitting || "Odosielam..."}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {bc?.submit || "Odoslať dopyt"}
            </>
          )}
        </Button>

        <p className="text-center text-xs text-zinc-500">
          {bc?.consent ||
            "Odoslaním súhlasíte so spracovaním údajov pre vybavenie firemného dopytu."}
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
