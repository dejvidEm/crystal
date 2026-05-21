"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CalculatorData } from "@/lib/calc-logic"
import { useLanguage } from "@/lib/i18n/language-context"

interface LeadInquiryCardProps {
  data: CalculatorData
  priceEur: number
  timeMinutes: number
}

type Status = "idle" | "submitting" | "success" | "error"

export function LeadInquiryCard({ data, priceEur, timeMinutes }: LeadInquiryCardProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "submitting") return
    setStatus("submitting")
    setErrorMessage(null)

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          city: data.cityOrZip,
          mainService: data.mainService,
          vehicleType: data.vehicleType,
          condition: data.condition,
          addons: data.addons,
          priceEur,
          timeMinutes,
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
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : t.calculator?.leadErrorGeneric || "Niečo sa pokazilo. Skús to prosím ešte raz.",
      )
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6 text-center"
      >
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-primary" />
        <h3 className="mb-1 text-lg font-semibold">
          {t.calculator?.leadSuccessTitle || "Ďakujeme, dopyt sme prijali."}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t.calculator?.leadSuccessText ||
            "Čoskoro sa vám ozveme s nezáväznou ponukou na uvedené kontakty."}
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h3 className="mb-1 text-lg font-semibold">
        {t.calculator?.leadTitle || "Chcete nezáväznú ponuku?"}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {t.calculator?.leadSubtitle ||
          "Nechajte nám kontakt a my sa vám ozveme s presnou cenou a termínom."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="lead-phone" className="mb-1.5 block">
            {t.calculator?.leadPhoneLabel || "Mobil"}
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lead-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="+421 9xx xxx xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-9"
              disabled={status === "submitting"}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="lead-email" className="mb-1.5 block">
            {t.calculator?.leadEmailLabel || "E-mail"}
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lead-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="vas@email.sk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
              disabled={status === "submitting"}
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
              {t.calculator?.leadSubmitting || "Odosielam..."}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {t.calculator?.leadSubmit || "Odoslať nezáväzný dopyt"}
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          {t.calculator?.leadConsent ||
            "Odoslaním súhlasíte so spracovaním kontaktných údajov pre vybavenie dopytu."}
        </p>
      </form>
    </motion.div>
  )
}
