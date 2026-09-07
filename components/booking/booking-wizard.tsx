"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { BookingMonthCalendar } from "@/components/booking/month-calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { estimateBookingPriceEur, extraPriceEur, servicePriceEur } from "@/lib/booking/catalog"
import { formatDateInBratislava, monthKeyFromDate } from "@/lib/booking/datetime"
import type { BookingExtra, BookingService, MonthDayAvailability, VehicleSize } from "@/lib/booking/types"
import { useLanguage } from "@/lib/i18n/language-context"
import { toContentLocale } from "@/lib/i18n/locale"
import { cn } from "@/lib/utils"

const TOTAL_STEPS = 5

const SERVICE_OPTIONS: { key: BookingService; title: string; popular?: boolean }[] = [
  { key: "refresh", title: "REFRESH" },
  { key: "essential", title: "INTERIÉR" },
  { key: "exterior", title: "EXTERIÉR" },
  { key: "premium", title: "KOMPLET", popular: true },
  { key: "tepovanie", title: "Tepovanie" },
]

const EXTRA_OPTIONS: BookingExtra[] = [
  "tepovanie",
  "climate",
  "plastics",
  "leather",
  "headlights",
  "engine",
]

type FormState = {
  vehicleSize: VehicleSize | null
  service: BookingService | null
  extras: BookingExtra[]
  address: string
  customerName: string
  customerPhone: string
  customerEmail: string
  notes: string
  bookingDate: string | null
  bookingTime: string | null
  website: string
}

const EMPTY_FORM: FormState = {
  vehicleSize: null,
  service: null,
  extras: [],
  address: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  notes: "",
  bookingDate: null,
  bookingTime: null,
  website: "",
}

function isVehicleSize(value: string | null): value is VehicleSize {
  return value === "small" || value === "medium" || value === "large"
}

function isBookingService(value: string | null): value is BookingService {
  return (
    value === "refresh" ||
    value === "essential" ||
    value === "exterior" ||
    value === "premium" ||
    value === "tepovanie"
  )
}

function isBookingExtra(value: string | null): value is BookingExtra {
  return EXTRA_OPTIONS.includes(value as BookingExtra)
}

function formatEur(amount: number, locale: string): string {
  return locale === "sk" ? `${amount} €` : `€${amount}`
}

export function BookingWizard({
  prefill,
}: {
  prefill?: { vehicle?: string; service?: string; extra?: string }
}) {
  const { t, language } = useLanguage()
  const locale = toContentLocale(language)
  const copy = t.bookingFlow
  const presetVehicle = isVehicleSize(prefill?.vehicle ?? null) ? prefill!.vehicle : null
  const presetService = isBookingService(prefill?.service ?? null) ? prefill!.service : null
  const presetExtra = isBookingExtra(prefill?.extra ?? null) ? prefill!.extra : null

  const [step, setStep] = useState(() => {
    if (presetVehicle && presetService) return 3
    if (presetVehicle) return 2
    return 1
  })
  const [month, setMonth] = useState(() => monthKeyFromDate(formatDateInBratislava()))
  const [days, setDays] = useState<MonthDayAvailability[]>([])
  const [loadingDays, setLoadingDays] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY_FORM,
    vehicleSize: presetVehicle,
    service: presetService,
    extras: presetExtra ? [presetExtra] : [],
  }))

  useEffect(() => {
    if (step < 5) return
    let cancelled = false
    setLoadingDays(true)
    fetch(`/api/booking/availability?month=${month}`)
      .then((res) => res.json())
      .then((payload) => {
        if (!cancelled) setDays(Array.isArray(payload?.days) ? payload.days : [])
      })
      .catch(() => {
        if (!cancelled) setDays([])
      })
      .finally(() => {
        if (!cancelled) setLoadingDays(false)
      })
    return () => {
      cancelled = true
    }
  }, [month, step])

  const extras = form.extras ?? []
  const visibleExtras = EXTRA_OPTIONS.filter(
    (extra) => extra !== "tepovanie" || form.service !== "tepovanie",
  )
  const selectedDay = (days ?? []).find((day) => day.date === form.bookingDate)
  const estimate =
    form.vehicleSize && form.service
      ? estimateBookingPriceEur({
          service: form.service,
          extras,
          vehicleSize: form.vehicleSize,
        })
      : 0

  const canNext =
    (step === 1 && Boolean(form.vehicleSize)) ||
    (step === 2 && Boolean(form.service)) ||
    step === 3 ||
    (step === 4 &&
      form.address.trim().length >= 8 &&
      form.customerName.trim().length >= 2 &&
      form.customerPhone.replace(/\D/g, "").length >= 9 &&
      form.customerEmail.includes("@")) ||
    (step === 5 && Boolean(form.bookingDate && form.bookingTime))

  const extraCopy = (extra: BookingExtra) => {
    const titles: Record<BookingExtra, { title: string; desc: string }> = {
      tepovanie: { title: copy.extraTepovanie, desc: copy.extraTepovanieDesc },
      climate: { title: copy.extraClimate, desc: copy.extraClimateDesc },
      plastics: { title: copy.extraPlastics, desc: copy.extraPlasticsDesc },
      leather: { title: copy.extraLeather, desc: copy.extraLeatherDesc },
      headlights: { title: copy.extraHeadlights, desc: copy.extraHeadlightsDesc },
      engine: { title: copy.extraEngine, desc: copy.extraEngineDesc },
    }
    return titles[extra]
  }

  const selectVehicle = (value: VehicleSize) => {
    setForm((prev) => ({ ...prev, vehicleSize: value }))
    setStep(2)
  }

  const selectService = (value: BookingService) => {
    setForm((prev) => ({
      ...prev,
      service: value,
      extras: value === "tepovanie" ? (prev.extras ?? []).filter((item) => item !== "tepovanie") : (prev.extras ?? []),
    }))
    setStep(3)
  }

  const toggleExtra = (extra: BookingExtra, checked: boolean) => {
    setForm((prev) => {
      const current = prev.extras ?? []
      return {
        ...prev,
        extras: checked ? [...new Set([...current, extra])] : current.filter((item) => item !== extra),
      }
    })
  }

  const submit = async () => {
    if (!form.vehicleSize || !form.service || !form.bookingDate || !form.bookingTime) return
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleSize: form.vehicleSize,
          service: form.service,
          extras,
          address: form.address,
          customerName: form.customerName,
          customerPhone: form.customerPhone,
          customerEmail: form.customerEmail,
          notes: form.notes,
          bookingDate: form.bookingDate,
          bookingTime: form.bookingTime,
          locale,
          website: form.website,
        }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        setError(payload.error || copy.errorGeneric)
        return
      }
      setSubmitted(true)
    } catch {
      setError(copy.errorGeneric)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="p-6 text-center sm:p-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Check className="h-6 w-6" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold">{copy.successTitle}</h2>
          <p className="mb-6 text-muted-foreground">{copy.successText}</p>
          <Button asChild>
            <Link href="/">{copy.successBack}</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className="mb-6 text-center sm:mb-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">{copy.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">{copy.subtitle}</p>
      </div>
      <div className="mb-6 sm:mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {copy.step} {step} {copy.of} {TOTAL_STEPS}
          </span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
      </div>

      {step === 1 && (
          <div>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">{copy.stepVehicle}</h2>
                <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                  <ChoiceCard
                    selected={form.vehicleSize === "small"}
                    title={copy.vehicleSmall}
                    description={copy.vehicleSmallDesc}
                    onClick={() => selectVehicle("small")}
                  />
                  <ChoiceCard
                    selected={form.vehicleSize === "medium"}
                    title={copy.vehicleMedium}
                    description={copy.vehicleMediumDesc}
                    onClick={() => selectVehicle("medium")}
                  />
                  <ChoiceCard
                    selected={form.vehicleSize === "large"}
                    title={copy.vehicleLarge}
                    description={copy.vehicleLargeDesc}
                    onClick={() => selectVehicle("large")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">{copy.stepService}</h2>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {SERVICE_OPTIONS.map((option) => {
                    const price = form.vehicleSize
                      ? formatEur(servicePriceEur(option.key, form.vehicleSize), locale)
                      : ""
                    return (
                      <ChoiceCard
                        key={option.key}
                        selected={form.service === option.key}
                        title={option.key === "tepovanie" ? copy.serviceTepovanie : option.title}
                        description={option.key === "tepovanie" ? `${copy.serviceTepovanieDesc}${price ? ` · ${price}` : ""}` : price}
                        popular={option.popular}
                        onClick={() => selectService(option.key)}
                      />
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold sm:text-xl">{copy.stepExtras}</h2>
                <p className="mb-4 text-sm text-muted-foreground sm:mb-6">{copy.stepExtrasSubtitle}</p>
                <div className="space-y-3">
                  {visibleExtras.map((extra) => {
                    const meta = extraCopy(extra)
                    const price = form.vehicleSize
                      ? formatEur(extraPriceEur(extra, form.vehicleSize), locale)
                      : ""
                    const checked = extras.includes(extra)
                    return (
                      <label
                        key={extra}
                        htmlFor={`extra-${extra}`}
                        className={cn(
                          "flex min-h-14 cursor-pointer items-start gap-3 rounded-lg border p-4 touch-manipulation transition-colors",
                          checked ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/20",
                        )}
                      >
                        <Checkbox
                          id={`extra-${extra}`}
                          checked={checked}
                          onCheckedChange={(value) => toggleExtra(extra, value === true)}
                          className="mt-0.5 h-5 w-5"
                        />
                        <div className="flex-1">
                          <p className="font-medium">
                            {meta.title}
                            {price ? <span className="ml-2 text-primary">{price}</span> : null}
                          </p>
                          <p className="text-sm text-muted-foreground">{meta.desc}</p>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div>
            <Card>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <h2 className="text-lg font-semibold sm:text-xl">{copy.stepAddress}</h2>
                <div className="space-y-2">
                  <Label htmlFor="address">{copy.addressLabel}</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                    placeholder={copy.addressPlaceholder}
                  />
                  <p className="text-sm text-muted-foreground">{copy.addressHint}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{copy.nameLabel}</Label>
                    <Input
                      id="name"
                      autoComplete="name"
                      value={form.customerName}
                      onChange={(event) => setForm((prev) => ({ ...prev, customerName: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{copy.phoneLabel}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.customerPhone}
                      onChange={(event) => setForm((prev) => ({ ...prev, customerPhone: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{copy.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.customerEmail}
                    onChange={(event) => setForm((prev) => ({ ...prev, customerEmail: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">{copy.notesLabel}</Label>
                  <Textarea
                    id="notes"
                    rows={2}
                    value={form.notes}
                    onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                    placeholder={copy.notesPlaceholder}
                  />
                </div>
                <div className="hidden" aria-hidden="true">
                  <Input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 5 && (
          <div>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">{copy.stepWhen}</h2>
                {loadingDays ? (
                  <p className="text-sm text-muted-foreground">…</p>
                ) : (
                  <BookingMonthCalendar
                    month={month}
                    days={days ?? []}
                    selectedDate={form.bookingDate}
                    onMonthChange={(next) => {
                      setMonth(next)
                      setForm((prev) => ({ ...prev, bookingDate: null, bookingTime: null }))
                    }}
                    onSelectDate={(date) => setForm((prev) => ({ ...prev, bookingDate: date, bookingTime: null }))}
                    prevLabel={copy.monthPrev}
                    nextLabel={copy.monthNext}
                  />
                )}

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <Legend swatch="border-primary/70 bg-primary/15" label={copy.legendAvailable} />
                  <Legend swatch="border-primary/35 bg-white/5" label={copy.legendPartial} />
                  <Legend swatch="border-white/10 bg-white/[0.03]" label={copy.legendFull} />
                  <Legend swatch="border-transparent bg-transparent" label={copy.legendClosed} />
                </div>

                <div className="mt-6">
                  {!form.bookingDate && <p className="text-sm text-muted-foreground">{copy.pickDay}</p>}
                  {form.bookingDate && selectedDay && (selectedDay.slots ?? []).length === 0 && (
                    <p className="text-sm text-muted-foreground">{copy.noSlots}</p>
                  )}
                  {selectedDay && (selectedDay.slots ?? []).length > 0 && (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {(selectedDay.slots ?? []).map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, bookingTime: slot }))}
                          className={cn(
                            "min-h-11 rounded-md border px-3 py-2 text-sm touch-manipulation transition-colors",
                            form.bookingTime === slot
                              ? "border-primary bg-primary text-black"
                              : "border-white/15 hover:border-primary/50",
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {estimate > 0 && (
                  <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-muted-foreground">{copy.estimate}</p>
                    <p className="text-2xl font-semibold text-primary">{formatEur(estimate, locale)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{copy.estimateNote}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/95 px-4 pt-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:z-auto sm:mt-6 sm:border-0 sm:bg-transparent sm:px-0 sm:pt-0 sm:backdrop-blur-none sm:pb-0">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Button
            variant="outline"
            className="h-11 min-w-0 flex-1 touch-manipulation sm:flex-none sm:px-6"
            disabled={step === 1}
            onClick={() => setStep((value) => Math.max(1, value - 1))}
          >
            {copy.back}
          </Button>
          {step < TOTAL_STEPS ? (
            <Button
              className="h-11 min-w-0 flex-1 touch-manipulation sm:flex-none sm:px-6"
              disabled={!canNext}
              onClick={() => setStep((value) => Math.min(TOTAL_STEPS, value + 1))}
            >
              {copy.next}
            </Button>
          ) : (
            <Button
              className="h-11 min-w-0 flex-1 touch-manipulation sm:flex-none sm:px-6"
              disabled={!canNext || submitting}
              onClick={submit}
            >
              {submitting ? copy.submitting : copy.submit}
            </Button>
          )}
        </div>
      </div>
      {step === 5 && <p className="mt-3 text-xs text-muted-foreground">{copy.consent}</p>}
    </div>
  )
}

function ChoiceCard({
  title,
  description,
  selected,
  popular,
  onClick,
}: {
  title: string
  description: string
  selected: boolean
  popular?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full min-h-[4.5rem] touch-manipulation rounded-lg border p-4 text-left transition-colors",
        selected ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/25",
      )}
    >
      {popular && (
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-black">
          ★
        </span>
      )}
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </button>
  )
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-3 w-3 rounded-sm border", swatch)} />
      {label}
    </span>
  )
}
