"use client"

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Clock3, Inbox, LogOut, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  EXTRA_LABELS_SK,
  MAX_SLOTS_PER_DAY,
  SERVICE_LABELS_SK,
  STATUS_LABELS_SK,
  VEHICLE_LABELS_SK,
  WEEKDAY_LABELS_SK,
} from "@/lib/booking/catalog"
import { formatDisplayTime, formatSlovakDate, monthKeyFromDate, formatDateInBratislava } from "@/lib/booking/datetime"
import type { BookingRow, BookingStatus, WeeklyAvailabilityRow } from "@/lib/booking/types"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type Tab = "settings" | "calendar" | "requests"

export function AdminApp() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("requests")
  const [days, setDays] = useState<WeeklyAvailabilityRow[]>([])
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [month, setMonth] = useState(() => monthKeyFromDate(formatDateInBratislava()))
  const [draftDays, setDraftDays] = useState<WeeklyAvailabilityRow[]>([])
  const [loading, setLoading] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)
  const [newSlot, setNewSlot] = useState<Record<number, string>>({})
  const [error, setError] = useState<string | null>(null)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      const [availabilityRes, bookingsRes] = await Promise.all([
        fetch("/api/admin/availability", { cache: "no-store" }),
        fetch("/api/admin/bookings", { cache: "no-store" }),
      ])
      if (availabilityRes.status === 401 || bookingsRes.status === 401) {
        router.replace("/admin/login")
        return
      }
      const availabilityJson = await availabilityRes.json()
      const bookingsJson = await bookingsRes.json()
      if (availabilityJson.ok) {
        setDays(availabilityJson.days)
        setDraftDays(availabilityJson.days)
      }
      if (bookingsJson.ok) setBookings(bookingsJson.bookings)
    } catch {
      setError("Dáta sa nepodarilo načítať.")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    void load()
  }, [load])

  const selected = bookings.find((row) => row.id === selectedId) ?? null
  const pending = bookings.filter((row) => row.status === "pending")
  const monthBookings = useMemo(() => {
    return bookings.filter((row) => row.booking_date.startsWith(month) && row.status !== "rejected")
  }, [bookings, month])
  const settingsDirty = useMemo(
    () => JSON.stringify(days) !== JSON.stringify(draftDays),
    [days, draftDays],
  )

  const patchDraftDay = (weekday: number, patch: Partial<WeeklyAvailabilityRow>) => {
    setDraftDays((prev) =>
      prev.map((day) => (day.weekday === weekday ? { ...day, ...patch } : day)),
    )
    setSaveMessage(null)
  }

  const saveSettings = async () => {
    setSavingSettings(true)
    setError(null)
    setSaveMessage(null)
    const payloadDays = draftDays.map((day) => {
      const slots = [...new Set(day.slots)].sort()
      const enabled = day.enabled && slots.length > 0
      return { weekday: day.weekday, enabled, slots: enabled ? slots : [] }
    })
    const response = await fetch("/api/admin/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days: payloadDays }),
    })
    const payload = await response.json()
    if (!payload.ok) {
      setError(payload.error || "Uloženie zlyhalo.")
    } else {
      const saved = payload.days ?? payloadDays
      setDays(saved)
      setDraftDays(saved)
      setSaveMessage("Nastavenia sú uložené.")
    }
    setSavingSettings(false)
  }

  const setStatus = async (id: string, status: BookingStatus) => {
    setError(null)
    const response = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    const payload = await response.json()
    if (!payload.ok) {
      setError(payload.error || "Zmena stavu zlyhala.")
      return
    }
    const updated = payload.booking as BookingRow
    setBookings((prev) => prev.map((row) => (row.id === id ? { ...row, ...updated } : row)))
  }

  const logout = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Crystal Detailing</p>
            <h1 className="text-lg font-semibold">Admin</h1>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Odhlásiť sa
          </Button>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 px-4 pb-3">
          <TabButton active={tab === "settings"} onClick={() => setTab("settings")} icon={<Settings2 className="h-4 w-4" />}>
            Nastavenia
          </TabButton>
          <TabButton active={tab === "calendar"} onClick={() => setTab("calendar")} icon={<CalendarDays className="h-4 w-4" />}>
            Kalendár
          </TabButton>
          <TabButton active={tab === "requests"} onClick={() => setTab("requests")} icon={<Inbox className="h-4 w-4" />}>
            Requesty
            {pending.length > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-black">
                {pending.length}
              </span>
            )}
          </TabButton>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section>
          {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
          {loading ? (
            <p className="text-sm text-muted-foreground">Načítavam…</p>
          ) : tab === "settings" ? (
            <SettingsPanel
              days={draftDays}
              newSlot={newSlot}
              dirty={settingsDirty}
              saving={savingSettings}
              saveMessage={saveMessage}
              onNewSlot={(weekday, value) => setNewSlot((prev) => ({ ...prev, [weekday]: value }))}
              onToggle={(day, enabled) =>
                patchDraftDay(day.weekday, {
                  enabled,
                  slots: enabled && day.slots.length === 0 ? ["09:00"] : day.slots,
                })
              }
              onAddSlot={(day) => {
                const slot = (newSlot[day.weekday] || "").trim()
                if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(slot)) return
                if (day.slots.length >= MAX_SLOTS_PER_DAY) return
                patchDraftDay(day.weekday, {
                  enabled: true,
                  slots: [...new Set([...day.slots, slot])].sort(),
                })
                setNewSlot((prev) => ({ ...prev, [day.weekday]: "" }))
              }}
              onRemoveSlot={(day, slot) => {
                const slots = day.slots.filter((item) => item !== slot)
                patchDraftDay(day.weekday, {
                  slots,
                  enabled: slots.length > 0,
                })
              }}
              onSave={saveSettings}
            />
          ) : tab === "calendar" ? (
            <CalendarPanel
              month={month}
              onMonthChange={setMonth}
              bookings={monthBookings}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          ) : (
            <RequestsPanel bookings={pending} selectedId={selectedId} onSelect={setSelectedId} />
          )}
        </section>

        <aside className="rounded-xl border border-white/10 bg-black/30 p-5">
          {selected ? (
            <BookingDetail booking={selected} onStatus={setStatus} />
          ) : (
            <p className="text-sm text-muted-foreground">Vyberte rezerváciu pre detail.</p>
          )}
        </aside>
      </main>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-primary text-black" : "text-zinc-400 hover:bg-white/5 hover:text-white",
      )}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </button>
  )
}

function SettingsPanel({
  days,
  newSlot,
  dirty,
  saving,
  saveMessage,
  onNewSlot,
  onToggle,
  onAddSlot,
  onRemoveSlot,
  onSave,
}: {
  days: WeeklyAvailabilityRow[]
  newSlot: Record<number, string>
  dirty: boolean
  saving: boolean
  saveMessage: string | null
  onNewSlot: (weekday: number, value: string) => void
  onToggle: (day: WeeklyAvailabilityRow, enabled: boolean) => void
  onAddSlot: (day: WeeklyAvailabilityRow) => void
  onRemoveSlot: (day: WeeklyAvailabilityRow, slot: string) => void
  onSave: () => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Otváracie dni a sloty</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Úpravy sa uložia až po kliknutí na Uložiť. Vypnutý deň alebo deň bez slotov sa klientom nezobrazí. Maximum je {MAX_SLOTS_PER_DAY} časov na deň.
        </p>
      </div>
      {days.map((day) => (
        <div key={day.weekday} className="rounded-xl border border-white/10 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">{WEEKDAY_LABELS_SK[day.weekday]}</p>
              <p className="text-xs text-muted-foreground">
                {day.enabled && day.slots.length > 0
                  ? `${day.slots.length} slotov`
                  : "Deň je vypnutý"}
              </p>
            </div>
            <Switch
              checked={day.enabled && day.slots.length > 0}
              onCheckedChange={(checked) => onToggle(day, checked)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {day.slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onRemoveSlot(day, slot)}
                className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-sm text-primary hover:border-red-400 hover:text-red-300"
                title="Odstrániť slot"
              >
                {slot} ×
              </button>
            ))}
            {day.slots.length === 0 && <span className="text-sm text-zinc-500">Žiadne sloty</span>}
          </div>
          {day.slots.length < MAX_SLOTS_PER_DAY && (
            <div className="mt-3 flex gap-2">
              <Input
                type="time"
                value={newSlot[day.weekday] || ""}
                onChange={(event) => onNewSlot(day.weekday, event.target.value)}
                className="max-w-[140px]"
              />
              <Button type="button" variant="outline" size="sm" onClick={() => onAddSlot(day)}>
                Pridať čas
              </Button>
            </div>
          )}
        </div>
      ))}
      <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-white/10 bg-background/95 py-4 backdrop-blur">
        <Button type="button" disabled={!dirty || saving} onClick={onSave}>
          {saving ? "Ukladám…" : "Uložiť nastavenia"}
        </Button>
        {dirty && <span className="text-sm text-amber-300">Máte neuložené zmeny</span>}
        {saveMessage && <span className="text-sm text-primary">{saveMessage}</span>}
      </div>
    </div>
  )
}

function CalendarPanel({
  month,
  onMonthChange,
  bookings,
  selectedId,
  onSelect,
}: {
  month: string
  onMonthChange: (month: string) => void
  bookings: BookingRow[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const [year, monthNum] = month.split("-").map(Number)
  const label = new Date(year, monthNum - 1, 1).toLocaleDateString("sk-SK", {
    month: "long",
    year: "numeric",
  })
  const count = new Date(year, monthNum, 0).getDate()
  const startBlank = (() => {
    const day = new Date(year, monthNum - 1, 1).getDay()
    return day === 0 ? 6 : day - 1
  })()
  const byDate = new Map<string, BookingRow[]>()
  for (const booking of bookings) {
    const list = byDate.get(booking.booking_date) ?? []
    list.push(booking)
    byDate.set(booking.booking_date, list)
  }

  const shift = (delta: number) => {
    const next = new Date(year, monthNum - 1 + delta, 1)
    onMonthChange(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">{label}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => shift(-1)}>
            ←
          </Button>
          <Button variant="outline" size="sm" onClick={() => shift(1)}>
            →
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-[11px] uppercase text-zinc-500">
        {["Po", "Ut", "St", "Št", "Pi", "So", "Ne"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {Array.from({ length: startBlank }).map((_, index) => (
          <div key={`b-${index}`} />
        ))}
        {Array.from({ length: count }, (_, index) => {
          const date = `${month}-${String(index + 1).padStart(2, "0")}`
          const items = byDate.get(date) ?? []
          return (
            <div key={date} className="min-h-[92px] rounded-md border border-white/10 p-1.5 text-left">
              <p className="mb-1 text-xs text-zinc-400">{index + 1}</p>
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className={cn(
                      "block w-full truncate rounded px-1 py-0.5 text-[11px]",
                      item.status === "pending" ? "bg-amber-400/20 text-amber-200" : "bg-primary/15 text-primary",
                      selectedId === item.id && "ring-1 ring-primary",
                    )}
                  >
                    {formatDisplayTime(item.booking_time)} {item.customer_name}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RequestsPanel({
  bookings,
  selectedId,
  onSelect,
}: {
  bookings: BookingRow[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  if (bookings.length === 0) {
    return <p className="text-sm text-muted-foreground">Žiadne nepotvrdené rezervácie.</p>
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Nepotvrdené rezervácie</h2>
      {bookings.map((booking) => (
        <button
          key={booking.id}
          type="button"
          onClick={() => onSelect(booking.id)}
          className={cn(
            "w-full rounded-xl border p-4 text-left transition-colors",
            selectedId === booking.id ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/25",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium">{booking.customer_name}</p>
            <span className="text-sm text-primary">
              {formatSlovakDate(booking.booking_date)} · {formatDisplayTime(booking.booking_time)}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {SERVICE_LABELS_SK[booking.service]} · {VEHICLE_LABELS_SK[booking.vehicle_size]}
          </p>
        </button>
      ))}
    </div>
  )
}

function BookingDetail({
  booking,
  onStatus,
}: {
  booking: BookingRow
  onStatus: (id: string, status: BookingStatus) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wider text-primary">{STATUS_LABELS_SK[booking.status]}</p>
        <h3 className="text-xl font-semibold">{booking.customer_name}</h3>
      </div>
      <DetailRow icon={<CalendarDays className="h-4 w-4" />} label="Termín">
        {formatSlovakDate(booking.booking_date)} o {formatDisplayTime(booking.booking_time)}
      </DetailRow>
      <DetailRow icon={<Clock3 className="h-4 w-4" />} label="Služba">
        {SERVICE_LABELS_SK[booking.service]}
      </DetailRow>
      <div className="space-y-1 text-sm">
        <p className="text-zinc-400">Vozidlo</p>
        <p>{VEHICLE_LABELS_SK[booking.vehicle_size]}</p>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-zinc-400">Doplnky</p>
        <p>
          {booking.extras.length
            ? booking.extras.map((extra) => EXTRA_LABELS_SK[extra] ?? extra).join(", ")
            : "Žiadne"}
        </p>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-zinc-400">Adresa</p>
        <p>{booking.address}</p>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-zinc-400">Kontakt</p>
        <p>
          <a className="text-primary hover:underline" href={`tel:${booking.customer_phone}`}>
            {booking.customer_phone}
          </a>
        </p>
        <p>
          <a className="text-primary hover:underline" href={`mailto:${booking.customer_email}`}>
            {booking.customer_email}
          </a>
        </p>
      </div>
      {booking.notes && (
        <div className="space-y-1 text-sm">
          <p className="text-zinc-400">Poznámka klienta</p>
          <p>{booking.notes}</p>
        </div>
      )}
      {booking.estimated_price_eur != null && (
        <div className="space-y-1 text-sm">
          <p className="text-zinc-400">Odhad ceny</p>
          <p className="text-lg font-semibold text-primary">{booking.estimated_price_eur} €</p>
        </div>
      )}
      <div className="flex flex-col gap-2 pt-2">
        {booking.status === "pending" && (
          <>
            <Button onClick={() => onStatus(booking.id, "confirmed")}>Potvrdiť a obsadiť termín</Button>
            <Button variant="outline" onClick={() => onStatus(booking.id, "rejected")}>
              Zamietnuť
            </Button>
          </>
        )}
        {booking.status === "confirmed" && (
          <Button variant="outline" onClick={() => onStatus(booking.id, "cancelled")}>
            Zrušiť rezerváciu
          </Button>
        )}
      </div>
    </div>
  )
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1 text-sm">
      <p className="inline-flex items-center gap-2 text-zinc-400">
        {icon}
        {label}
      </p>
      <p>{children}</p>
    </div>
  )
}
