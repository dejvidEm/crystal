import type { PackageKey } from "./pricing-data"

/**
 * Čistý čas práce podľa balíka (v minútach).
 * KOMPLET (premium) = 2 hodiny, všetko ostatné = 1 hodina.
 */
export const CALC_PACKAGE_DURATION_MINUTES: Record<PackageKey, number> = {
  refresh: 60,
  essential: 60,
  premium: 120,
  ultimate: 60,
}

/** Každý zaškrtnutý doplnok pridá tento čas. */
export const ADDON_DURATION_MINUTES_EACH = 30

/** Prirážka za veľké vozidlo (krok 1) – +20 min. */
export const LARGE_VEHICLE_DURATION_MINUTES = 20

/** Prirážka za extrémne znečistenie (krok 2) – +20 min. */
export const EXTREME_CONDITION_DURATION_MINUTES = 20

/**
 * Fixné ceny balíkov v kalkulačke (musia sa zhodovať s cenníkom na webe).
 * Rovnaké pre všetky veľkosti vozidiel – rozdiel rieši samostatná prirážka nižšie.
 */
export const PACKAGE_PRICES_EUR: Record<PackageKey, number> = {
  refresh: 39,
  essential: 79,
  premium: 119,
  ultimate: 49,
}

/** Prirážka za veľké vozidlo (krok 1: výber veľkosti = "large"). */
export const LARGE_VEHICLE_SURCHARGE_EUR = 10

/** Prirážka za extrémne znečistenie (krok 2: stav = "extreme"). */
export const EXTREME_CONDITION_SURCHARGE_EUR = 10

/**
 * Doplnky v poslednom kroku sú IBA INFORMATÍVNE.
 * Nezapočítavajú sa do finálnej ceny – cena = balík + prípadné prirážky vyššie.
 */
export const CALC_INFO_ADDONS = ["seats", "carpets", "leather", "headlights"] as const
export type InfoAddon = (typeof CALC_INFO_ADDONS)[number]

export function isInfoAddon(value: unknown): value is InfoAddon {
  return (
    typeof value === "string" &&
    (CALC_INFO_ADDONS as readonly string[]).includes(value as string)
  )
}

export type Addon = InfoAddon
export type VehicleType = "small" | "medium" | "large"
export type Condition = "normal" | "dirty" | "extreme"
export type MainService = PackageKey
export type ParkingType = "private" | "public"

export interface CalculatorData {
  vehicleType: VehicleType | null
  condition: Condition | null
  mainService: MainService | null
  addons: Addon[]
  cityOrZip: string
  parkingType: ParkingType | null
}

export interface PriceRange {
  min: number
  max: number
}

export interface TimeRange {
  /** v minútach */
  min: number
  /** v minútach */
  max: number
}

export interface PriceBreakdown {
  packageEur: number
  largeVehicleEur: number
  extremeConditionEur: number
  totalEur: number
}

/**
 * Vráti detailný rozpis ceny: základ balíka + prirážky.
 * Doplnky NIKDY neovplyvňujú cenu.
 */
export function getPriceBreakdown(data: CalculatorData): PriceBreakdown {
  if (!data.mainService) {
    return { packageEur: 0, largeVehicleEur: 0, extremeConditionEur: 0, totalEur: 0 }
  }
  const packageEur = PACKAGE_PRICES_EUR[data.mainService] ?? 0
  const largeVehicleEur = data.vehicleType === "large" ? LARGE_VEHICLE_SURCHARGE_EUR : 0
  const extremeConditionEur = data.condition === "extreme" ? EXTREME_CONDITION_SURCHARGE_EUR : 0
  return {
    packageEur,
    largeVehicleEur,
    extremeConditionEur,
    totalEur: packageEur + largeVehicleEur + extremeConditionEur,
  }
}

/**
 * Cena pre UI = fixná suma = základ balíka (+10 € pri large) (+10 € pri extreme).
 * Žiadne doplnky, žiadne rozpätie ±%.
 */
export function calculatePrice(data: CalculatorData): PriceRange {
  if (!data.vehicleType || !data.mainService) {
    return { min: 0, max: 0 }
  }
  const { totalEur } = getPriceBreakdown(data)
  return { min: totalEur, max: totalEur }
}

/**
 * Odhad času:
 * - Balík KOMPLET = 120 min, ostatné balíky = 60 min.
 * - Každý zvolený doplnok pripočíta +30 min.
 * - Veľké vozidlo: +20 min. Extrémne znečistenie: +20 min.
 */
export function calculateTime(data: CalculatorData): TimeRange {
  if (!data.vehicleType || !data.mainService) {
    return { min: 0, max: 0 }
  }
  let minutes = CALC_PACKAGE_DURATION_MINUTES[data.mainService] ?? 0
  if (data.vehicleType === "large") minutes += LARGE_VEHICLE_DURATION_MINUTES
  if (data.condition === "extreme") minutes += EXTREME_CONDITION_DURATION_MINUTES

  const seen = new Set<InfoAddon>()
  for (const addon of data.addons) {
    if (!isInfoAddon(addon) || seen.has(addon)) continue
    seen.add(addon)
    minutes += ADDON_DURATION_MINUTES_EACH
  }

  return { min: minutes, max: minutes }
}
