// Pricing data for different car sizes
export type CarSize = "small" | "suv" | "van"

/** Keys used by the calculator and pricing cards (same order as on the homepage). */
export const PACKAGE_KEYS = ["refresh", "essential", "premium", "ultimate"] as const
export type PackageKey = (typeof PACKAGE_KEYS)[number]

export type PackageData = {
  title: string
  subtitle: string
  price: {
    small: string
    suv: string
    van: string
  }
  /** Crossed-out price to show next to current price (e.g. "€139") */
  originalPrice?: string
  features: string[]
  /** Short note under the feature list (e.g. who the package is for). */
  footerNote?: string
  mostPopular?: boolean
}

export type AdditionalServiceIcon = "headlights" | "engine"

/** Ikony doplnkov v kalkulačke (ceny v `calculatorAddonCatalog`). */
export type CalculatorAddonIcon = "seats" | "ozone" | "leather" | "headlights"

/** Doplnky v kalkulačke — zhodné s kartami doplnkových služieb na webe */
export const CALCULATOR_ADDONS = ["seats", "ozone", "leather"] as const
export type CalculatorAddon = (typeof CALCULATOR_ADDONS)[number]

export function isCalculatorAddon(value: unknown): value is CalculatorAddon {
  return typeof value === "string" && (CALCULATOR_ADDONS as readonly string[]).includes(value as string)
}

/** Prvá súvislá hodnota EUR v cenníkovom texte („119 €“, „€35“, …) */
export function euroAmountFromPriceLabel(label: string): number {
  const m = String(label).match(/(\d+)/)
  if (!m) return 0
  const n = Number.parseInt(m[1], 10)
  return Number.isFinite(n) ? n : 0
}

/** Veľkosť vozidla v kalkulačke → kľúč ceny v `additionalServices` */
export type CalculatorVehicleSize = "small" | "medium" | "large"

/** Čistý čas práce podľa balíka (min), bez doplnkov */
export const PACKAGE_DURATION_MINUTES: Record<PackageKey, number> = {
  refresh: 45,
  essential: 60,
  premium: 120,
  ultimate: 45,
}

/** Čas za každý doplnkový checkbox v kalkulačke */
export const CALCULATOR_ADDON_DURATION_MINUTES = 20

export function calculatorVehicleToCarSize(v: CalculatorVehicleSize): CarSize {
  if (v === "small") return "small"
  if (v === "medium") return "suv"
  return "van"
}

/** Základné ceny balíkov (malé auto / hatchback). */
export const PACKAGE_BASE_PRICE_EUR: Record<PackageKey, number> = {
  refresh: 39,
  essential: 79,
  premium: 119,
  ultimate: 49,
}

/**
 * Prirážka oproti malej kategórii:
 * - SUV/Crossover: REFRESH, INTERIÉR, TEPOVANIE +5 €; KOMPLET +10 €
 * - Dodávka/Pickup: všetko +10 € okrem TEPOVANIA (+5 €)
 */
export function packageSurchargeByCarSize(key: PackageKey, size: CarSize): number {
  if (size === "small") return 0
  if (size === "suv") return key === "premium" ? 10 : 5
  return key === "ultimate" ? 5 : 10
}

export function packagePriceByCarSize(key: PackageKey, size: CarSize): number {
  return PACKAGE_BASE_PRICE_EUR[key] + packageSurchargeByCarSize(key, size)
}

export function packageSurchargeByVehicleType(
  key: PackageKey,
  vehicle: CalculatorVehicleSize | null,
): number {
  if (!vehicle) return 0
  return packageSurchargeByCarSize(key, calculatorVehicleToCarSize(vehicle))
}

export function formatPriceLabel(eur: number, lang: "sk" | "en"): string {
  return lang === "en" ? `€${eur}` : `${eur} €`
}

function packagePriceLabels(lang: "sk" | "en"): Record<PackageKey, PackageData["price"]> {
  return PACKAGE_KEYS.reduce(
    (acc, key) => {
      acc[key] = {
        small: formatPriceLabel(packagePriceByCarSize(key, "small"), lang),
        suv: formatPriceLabel(packagePriceByCarSize(key, "suv"), lang),
        van: formatPriceLabel(packagePriceByCarSize(key, "van"), lang),
      }
      return acc
    },
    {} as Record<PackageKey, PackageData["price"]>,
  )
}

/** Cenník doplnkov v kalkulačke (nezobrazuje sa v sekcii doplnkových služieb na webe). */
const calculatorAddonCatalog: { icon: CalculatorAddonIcon; price: AdditionalServiceData["price"] }[] = [
  { icon: "seats", price: { small: "30 €", suv: "40 €", van: "45 €" } },
  { icon: "ozone", price: { small: "25 €", suv: "35 €", van: "45 €" } },
  { icon: "leather", price: { small: "40 €", suv: "45 €", van: "50 €" } },
  { icon: "headlights", price: { small: "70 €", suv: "70 €", van: "70 €" } },
]

/** EUR za doplnok podľa veľkosti vozidla (kalkulačka). */
export function calculatorAddonPriceEuro(addon: CalculatorAddon, vehicleSize: CalculatorVehicleSize): number {
  const tier = calculatorVehicleToCarSize(vehicleSize)
  const row = calculatorAddonCatalog.find((s) => s.icon === addon)
  if (!row) return 0
  const raw = row.price[tier]
  const n = euroAmountFromPriceLabel(String(raw))
  return Number.isFinite(n) ? n : 0
}

export type AdditionalServiceData = {
  name: string
  description: string
  price: {
    small: string
    suv: string
    van: string
  }
  features: string[]
  footerNote?: string
  icon: AdditionalServiceIcon
}

const packagePricesSk = packagePriceLabels("sk")

export const packages: Record<string, PackageData> = {
  refresh: {
    title: "REFRESH",
    subtitle: "Základný balík pre pravidelnú starostlivosť o vozidlo",
    price: packagePricesSk.refresh,
    features: [
      "Ručné umytie interiéru",
      "Vysávanie interiéru",
      "Čistenie plastov",
      "Tepovanie koberčekov / čistenie rohoží",
      "Prevonanie interiéru",
    ],
    footerNote: "Ideálne pre pravidelný mesačný refresh interiéru.",
  },
  essential: {
    title: "INTERIÉR",
    subtitle: "Kompletný hĺbkový detailing interiéru vozidla",
    price: packagePricesSk.essential,
    features: [
      "Všetko v balíku REFRESH",
      "Hĺbkový detailing interiéru",
      "Detailing priestoru pre rezervu",
      "Impregnácia a výživa kože a plastov",
      "Umývanie okien a zrkadiel",
      "Čistenie pedálov",
    ],
    footerNote:
      "Ideálne keď interiér potrebuje komplexnú starostlivosť – pred predajom, po sezóne alebo pri vyššej záťaži.",
  },
  premium: {
    title: "KOMPLET",
    subtitle: "Kompletný detailing interiéru a exteriéru vozidla na profesionálnej úrovni",
    price: packagePricesSk.premium,
    mostPopular: true,
    features: [
      "Všetko v balíku INTERIÉR",
      "Kompletný ručný detailing exteriéru",
      "Dekontaminácia a čistenie diskov",
      "Čistenie a výživenie pneumatík",
      "Odstránenie hmyzu a usadených nečistôt",
      "Oživenie plastov",
    ],
    footerNote:
      "Vhodné pre náročných klientov, ktorí očakávajú maximálnu čistotu a starostlivosť.",
  },
  ultimate: {
    title: "TEPOVANIE",
    subtitle: "Profesionálne tepovanie interiéru vozidla",
    price: packagePricesSk.ultimate,
    features: [
      "Tepovanie sedačiek",
      "Tepovanie koberčekov a podlahy",
      "Tepovanie a čistenie stropnice",
      "Tepovanie kufra bez podlahy",
    ],
    footerNote:
      "Odstránenie škvŕn, fľakov, zápachu a nahromadených nečistôt z textílií.",
  },
}

function parseEuroFromPriceLabel(label: string): number {
  return euroAmountFromPriceLabel(label)
}

/**
 * Základ balíka v kalkulačke = tá istá suma ako v cenníku (`packages`).
 * Berieme malú kategóriu (pri týchto balíkoch sú ceny rovnaké pre SUV/van).
 */
export function packageBasePriceFromPricelist(key: PackageKey): number {
  return PACKAGE_BASE_PRICE_EUR[key] ?? 0
}

const packagePricesEn = packagePriceLabels("en")

/** English copy for calculator / EN locale (keep in sync with `packages`). */
export const packagesEn: Record<PackageKey, PackageData> = {
  refresh: {
    title: "REFRESH",
    subtitle: "Core package for regular vehicle care",
    price: packagePricesEn.refresh,
    features: [
      "Hand interior wash",
      "Interior vacuuming",
      "Plastic cleaning",
      "Mat shampooing / floor-liner cleaning",
      "Interior fragrance",
    ],
    footerNote: "Ideal for a regular monthly interior refresh.",
  },
  essential: {
    title: "INTERIOR",
    subtitle: "Full deep interior detailing",
    price: packagePricesEn.essential,
    features: [
      "Everything in the REFRESH package",
      "Deep interior detailing",
      "Spare-wheel well detailing",
      "Leather & plastic conditioning",
      "Windows and mirrors cleaned",
      "Pedal cleaning",
    ],
    footerNote:
      "Best when the interior needs full care — before sale, after a season, or under heavy use.",
  },
  premium: {
    title: "COMPLETE",
    subtitle: "Professional full interior and exterior detailing",
    price: packagePricesEn.premium,
    mostPopular: true,
    features: [
      "Everything in the INTERIOR package",
      "Full hand exterior detailing",
      "Wheel decontamination and cleaning",
      "Tire cleaning and dressing",
      "Bug and bonded grime removal",
      "Plastic restoration",
    ],
    footerNote: "For discerning clients who expect maximum cleanliness and care.",
  },
  ultimate: {
    title: "UPHOLSTERY",
    subtitle: "Professional interior upholstery cleaning",
    price: packagePricesEn.ultimate,
    features: [
      "Seat shampooing",
      "Carpet and floor shampooing",
      "Headliner shampooing and cleaning",
      "Trunk cleaning (without floor mat)",
    ],
    footerNote: "Removes stains, odours and built-up grime from fabrics.",
  },
}

export const additionalServices: AdditionalServiceData[] = [
  {
    name: "Renovácia svetlometov",
    description: "Kompletná úprava oboch predných svetlometov",
    price: {
      small: "70 €",
      suv: "70 €",
      van: "70 €",
    },
    features: [
      "Odstránenie oxidácie a zažltnutia",
      "Leštenie svetlometov",
      "Nanesenie UV ochrany",
    ],
    footerNote: "za oba svetlomety",
    icon: "headlights",
  },
  {
    name: "Čistenie motorového priestoru",
    description: "Vyčistenie a úprava motorového priestoru pre reprezentatívny vzhľad",
    price: {
      small: "70 €",
      suv: "70 €",
      van: "70 €",
    },
    features: [
      "Dôkladné čistenie motorového priestoru",
      "Odstránenie prachu, mastnoty a nečistôt",
      "Úprava plastov a hadíc",
      "Prezentovateľný vzhľad pod kapotou",
    ],
    icon: "engine",
  },
]

/** English copy for homepage additional-service cards (same order as `additionalServices`). */
export const additionalServicesEn: AdditionalServiceData[] = [
  {
    name: "Headlight restoration",
    description: "Full restoration of both front headlights",
    price: {
      small: "€70",
      suv: "€70",
      van: "€70",
    },
    features: [
      "Oxidation and yellowing removal",
      "Headlight polishing",
      "UV protection applied",
    ],
    footerNote: "for both headlights",
    icon: "headlights",
  },
  {
    name: "Engine bay cleaning",
    description: "Cleaning and detailing of the engine compartment",
    price: {
      small: "€70",
      suv: "€70",
      van: "€70",
    },
    features: [
      "Thorough engine bay cleaning",
      "Dust, grease and grime removal",
      "Plastics and hoses dressed",
      "Show-ready look under the hood",
    ],
    icon: "engine",
  },
]
