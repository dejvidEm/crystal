import type { PackageKey } from "./pricing-data"

export type VehicleType = "small" | "medium" | "large"
export type Condition = "normal" | "dirty" | "extreme"
export type MainService = PackageKey
export type Addon = "wax" | "ozone" | "plastics" | "seats" | "headlights"
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
  min: number // in minutes
  max: number // in minutes
}

// Base prices by vehicle type and package (tuned so estimate range aligns with “from €X” on the site)
const BASE_PRICES: Record<VehicleType, Record<MainService, number>> = {
  small: {
    refresh: 79,
    essential: 125,
    premium: 168,
    ultimate: 90,
  },
  medium: {
    refresh: 89,
    essential: 135,
    premium: 178,
    ultimate: 100,
  },
  large: {
    refresh: 99,
    essential: 145,
    premium: 188,
    ultimate: 110,
  },
}

// Base times by vehicle type and package (minutes)
const BASE_TIMES: Record<VehicleType, Record<MainService, number>> = {
  small: {
    refresh: 95,
    essential: 150,
    premium: 210,
    ultimate: 125,
  },
  medium: {
    refresh: 110,
    essential: 165,
    premium: 235,
    ultimate: 140,
  },
  large: {
    refresh: 125,
    essential: 180,
    premium: 260,
    ultimate: 155,
  },
}

// Condition modifiers (percentage increase)
const CONDITION_MODIFIERS: Record<Condition, number> = {
  normal: 0,
  dirty: 0.15,
  extreme: 0.3,
}

// Addon prices and times
const ADDON_PRICES: Record<Addon, number> = {
  wax: 25,
  ozone: 15,
  plastics: 10,
  seats: 30,
  headlights: 45,
}

const ADDON_TIMES: Record<Addon, number> = {
  wax: 30,
  ozone: 20,
  plastics: 20,
  seats: 60,
  headlights: 30,
}

// Parking time addition
const PUBLIC_PARKING_TIME = 15 // minutes

export function calculatePrice(data: CalculatorData): PriceRange {
  if (!data.vehicleType || !data.condition || !data.mainService) {
    return { min: 0, max: 0 }
  }

  // Get base price
  let basePrice = BASE_PRICES[data.vehicleType][data.mainService]

  // Apply condition modifier
  const conditionModifier = CONDITION_MODIFIERS[data.condition]
  basePrice = basePrice * (1 + conditionModifier)

  // Add addon prices
  let addonPrice = 0
  data.addons.forEach((addon) => {
    addonPrice += ADDON_PRICES[addon]
  })

  const totalPrice = basePrice + addonPrice

  // Apply ±10% range
  let min = Math.round(totalPrice * 0.9)
  let max = Math.round(totalPrice * 1.1)

  // Final price adjustment (makes displayed prices ~12€ lower)
  const PRICE_OFFSET = 32
  min = Math.max(0, min - PRICE_OFFSET)
  max = Math.max(0, max - PRICE_OFFSET)

  return { min, max }
}

export function calculateTime(data: CalculatorData): TimeRange {
  if (!data.vehicleType || !data.condition || !data.mainService) {
    return { min: 0, max: 0 }
  }

  // Get base time
  let baseTime = BASE_TIMES[data.vehicleType][data.mainService]

  // Apply condition modifier (time also increases with condition)
  const conditionModifier = CONDITION_MODIFIERS[data.condition]
  baseTime = baseTime * (1 + conditionModifier)

  // Add addon times
  let addonTime = 0
  data.addons.forEach((addon) => {
    addonTime += ADDON_TIMES[addon]
  })

  // Add public parking time if applicable
  if (data.parkingType === "public") {
    baseTime += PUBLIC_PARKING_TIME
  }

  const totalTime = baseTime + addonTime

  // Apply ±15 min range (or ±0.5h)
  const min = Math.round(totalTime - 15)
  const max = Math.round(totalTime + 15)

  return { min: Math.max(0, min), max }
}



