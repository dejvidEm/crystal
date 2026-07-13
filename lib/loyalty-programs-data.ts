import type { PackageKey } from "@/lib/pricing-data"
import { PACKAGE_BASE_PRICE_EUR } from "@/lib/pricing-data"

/** Vernostné programy mapované na existujúce balíky v cenníku. */
export const LOYALTY_PROGRAM_KEYS = ["refresh", "essential", "premium"] as const
export type LoyaltyProgramKey = (typeof LOYALTY_PROGRAM_KEYS)[number]

export const LOYALTY_PREPAY_MONTHS = 3
export const LOYALTY_DISCOUNT_PERCENT = 12

const loyaltyToPackageKey: Record<LoyaltyProgramKey, PackageKey> = {
  refresh: "refresh",
  essential: "essential",
  premium: "premium",
}

export function loyaltyPrepayPriceEur(key: LoyaltyProgramKey): number {
  const monthly = PACKAGE_BASE_PRICE_EUR[loyaltyToPackageKey[key]]
  const total = monthly * LOYALTY_PREPAY_MONTHS
  return Math.round(total * (1 - LOYALTY_DISCOUNT_PERCENT / 100))
}

export function loyaltyMonthlyEquivalentEur(key: LoyaltyProgramKey): number {
  return Math.round(loyaltyPrepayPriceEur(key) / LOYALTY_PREPAY_MONTHS)
}

export function loyaltyRegularPrepayPriceEur(key: LoyaltyProgramKey): number {
  const monthly = PACKAGE_BASE_PRICE_EUR[loyaltyToPackageKey[key]]
  return monthly * LOYALTY_PREPAY_MONTHS
}
