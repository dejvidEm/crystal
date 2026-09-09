import {
  PACKAGE_BASE_PRICE_EUR,
  packageSurchargeByVehicleType,
  upholsteryPriceByCarSize,
  calculatorVehicleToCarSize,
  type PackageKey,
} from "@/lib/pricing-data"
import type { BookingExtra, BookingService, VehicleSize } from "@/lib/booking/types"

export const BOOKING_TIMEZONE = "Europe/Bratislava"
export const MAX_SLOTS_PER_DAY = 10
export const MIN_LEAD_MINUTES = 120

export const BOOKING_PACKAGE_SERVICES: PackageKey[] = [
  "refresh",
  "essential",
  "exterior",
  "premium",
]

const EXTRA_FIXED_PRICES: Partial<Record<BookingExtra, number>> = {
  climate: 40,
  plastics: 25,
  leather: 40,
  headlights: 70,
  engine: 60,
}

export function extraPriceEur(extra: BookingExtra, vehicle: VehicleSize): number {
  if (extra === "tepovanie") {
    return upholsteryPriceByCarSize(calculatorVehicleToCarSize(vehicle))
  }
  return EXTRA_FIXED_PRICES[extra] ?? 0
}

export function servicePriceEur(service: BookingService, vehicle: VehicleSize): number {
  if (service === "tepovanie") {
    return upholsteryPriceByCarSize(calculatorVehicleToCarSize(vehicle))
  }
  return PACKAGE_BASE_PRICE_EUR[service] + packageSurchargeByVehicleType(service, vehicle)
}

export function estimateBookingPriceEur(input: {
  service: BookingService
  extras: BookingExtra[]
  vehicleSize: VehicleSize
}): number {
  const extras = input.service === "tepovanie"
    ? input.extras.filter((extra) => extra !== "tepovanie")
    : input.extras
  const extrasTotal = extras.reduce((sum, extra) => sum + extraPriceEur(extra, input.vehicleSize), 0)
  return servicePriceEur(input.service, input.vehicleSize) + extrasTotal
}

export const SERVICE_LABELS_SK: Record<BookingService, string> = {
  refresh: "REFRESH",
  essential: "INTERIÉR",
  exterior: "EXTERIÉR",
  premium: "KOMPLET",
  tepovanie: "Tepovanie",
}

export const EXTRA_LABELS_SK: Record<BookingExtra, string> = {
  tepovanie: "Tepovanie interiéru",
  climate: "Čistenie klimatizácie",
  plastics: "Impregnácia plastov",
  leather: "Impregnácia kože",
  headlights: "Renovácia svetlometov",
  engine: "Čistenie motorového priestoru",
}

export const VEHICLE_LABELS_SK: Record<VehicleSize, string> = {
  small: "Malé (Hatchback / Sedan)",
  medium: "Stredné (Kombi / Malé SUV)",
  large: "Veľké (Veľké SUV / Dodávka)",
}

export const WEEKDAY_LABELS_SK: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string> = {
  1: "Pondelok",
  2: "Utorok",
  3: "Streda",
  4: "Štvrtok",
  5: "Piatok",
  6: "Sobota",
  7: "Nedeľa",
}

export const STATUS_LABELS_SK: Record<string, string> = {
  pending: "Čaká na potvrdenie",
  confirmed: "Potvrdená",
  rejected: "Zamietnutá",
  cancelled: "Zrušená",
  completed: "Vykonaná",
}
