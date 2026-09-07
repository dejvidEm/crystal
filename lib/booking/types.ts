export const VEHICLE_SIZES = ["small", "medium", "large"] as const
export type VehicleSize = (typeof VEHICLE_SIZES)[number]

export const BOOKING_SERVICES = [
  "refresh",
  "essential",
  "exterior",
  "premium",
  "tepovanie",
] as const
export type BookingService = (typeof BOOKING_SERVICES)[number]

export const BOOKING_EXTRAS = [
  "tepovanie",
  "climate",
  "plastics",
  "leather",
  "headlights",
  "engine",
] as const
export type BookingExtra = (typeof BOOKING_EXTRAS)[number]

export const BOOKING_STATUSES = ["pending", "confirmed", "rejected", "cancelled"] as const
export type BookingStatus = (typeof BOOKING_STATUSES)[number]

export const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7] as const
export type Weekday = (typeof WEEKDAYS)[number]

export type WeeklyAvailabilityRow = {
  weekday: Weekday
  enabled: boolean
  slots: string[]
}

export type BookingRow = {
  id: string
  status: BookingStatus
  vehicle_size: VehicleSize
  service: BookingService
  extras: BookingExtra[]
  address: string
  customer_name: string
  customer_phone: string
  customer_email: string
  notes: string | null
  booking_date: string
  booking_time: string
  estimated_price_eur: number | null
  locale: string
  admin_note: string | null
  created_at: string
  updated_at: string
  confirmed_at: string | null
}

export type MonthDayAvailability = {
  date: string
  weekday: Weekday
  status: "available" | "partial" | "full" | "closed" | "past"
  freeCount: number
  totalCount: number
  slots: string[]
}

export type CreateBookingInput = {
  vehicleSize: VehicleSize
  service: BookingService
  extras: BookingExtra[]
  address: string
  customerName: string
  customerPhone: string
  customerEmail: string
  notes?: string
  bookingDate: string
  bookingTime: string
  locale: "sk" | "en" | "de"
  website?: string
}
