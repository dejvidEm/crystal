export type VehicleType = "small" | "medium" | "large"
export type Condition = "normal" | "dirty" | "extreme"
export type MainService = "exterior" | "interior" | "exterior_interior" | "seats_only"
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

// Base prices by vehicle type and service
const BASE_PRICES: Record<VehicleType, Record<MainService, number>> = {
  small: {
    exterior: 59,
    interior: 69,
    exterior_interior: 109,
    seats_only: 20,
  },
  medium: {
    exterior: 69,
    interior: 79,
    exterior_interior: 129,
    seats_only: 30,
  },
  large: {
    exterior: 79,
    interior: 89,
    exterior_interior: 149,
    seats_only: 40,
  },
}

// Base times by vehicle type and service (in minutes)
const BASE_TIMES: Record<VehicleType, Record<MainService, number>> = {
  small: {
    exterior: 90,
    interior: 120,
    exterior_interior: 180,
    seats_only: 60,
  },
  medium: {
    exterior: 105,
    interior: 135,
    exterior_interior: 210,
    seats_only: 75,
  },
  large: {
    exterior: 120,
    interior: 150,
    exterior_interior: 240,
    seats_only: 90,
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

  // Lower prices by 20€ (reduced from 50€ to make prices higher)
  min = Math.max(0, min - 20)
  max = Math.max(0, max - 20)

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



