import type { ContentLocale } from "@/lib/i18n/locale"
export type CarSize = "small" | "suv" | "van"

/** Keys used by the calculator and pricing cards (same order as on the homepage). */
export const PACKAGE_KEYS = ["refresh", "essential", "exterior", "premium"] as const
export type PackageKey = (typeof PACKAGE_KEYS)[number]

/** Tepovanie – cena v doplnkových službách (nie hlavný balík). */
export const UPHOLSTERY_BASE_PRICE_EUR = 49

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

export type AdditionalServiceIcon = "headlights" | "engine" | "upholstery"

/** Ikony doplnkov v kalkulačke (ceny v `calculatorAddonCatalog`). */
export type CalculatorAddonIcon = "seats" | "ozone" | "leather" | "headlights"

/** Doplnky v kalkulačke — zhodné s kartami doplnkových služieb na webe */
export const CALCULATOR_ADDONS = ["seats", "ozone", "leather"] as const
export type CalculatorAddon = (typeof CALCULATOR_ADDONS)[number]

export function isCalculatorAddon(value: unknown): value is CalculatorAddon {
  return typeof value === "string" && (CALCULATOR_ADDONS as readonly string[]).includes(value as string)
}

/** Prvá súvislá hodnota EUR v cenníkovom texte („129 €“, „€35“, …) */
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
  exterior: 60,
  premium: 120,
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
  exterior: 69,
  premium: 139,
}

/**
 * Prirážka oproti malej kategórii:
 * - SUV/Crossover: REFRESH, INTERIÉR, EXTERIÉR +5 €; KOMPLET +10 €
 * - Dodávka/Pickup: REFRESH, INTERIÉR, EXTERIÉR +10 €; KOMPLET +10 €
 */
export function packageSurchargeByCarSize(key: PackageKey, size: CarSize): number {
  if (size === "small") return 0
  if (size === "suv") return key === "premium" ? 10 : 5
  return 10
}

export function upholsterySurchargeByCarSize(size: CarSize): number {
  if (size === "small") return 0
  return 5
}

export function upholsteryPriceByCarSize(size: CarSize): number {
  return UPHOLSTERY_BASE_PRICE_EUR + upholsterySurchargeByCarSize(size)
}

export function upholsteryOriginalPriceByCarSize(size: CarSize): number {
  const discounted = upholsteryPriceByCarSize(size)
  return Math.round(discounted / (1 - PACKAGE_SUMMER_DISCOUNT_PERCENT / 100))
}

export function packagePriceByCarSize(key: PackageKey, size: CarSize): number {
  return PACKAGE_BASE_PRICE_EUR[key] + packageSurchargeByCarSize(key, size)
}

/** Aktuálna letná zľava na hlavné balíky (zobrazuje sa preškrtnutá cena pred zľavou). */
export const PACKAGE_SUMMER_DISCOUNT_PERCENT = 10

export function packageOriginalPriceByCarSize(key: PackageKey, size: CarSize): number {
  const discounted = packagePriceByCarSize(key, size)
  return Math.round(discounted / (1 - PACKAGE_SUMMER_DISCOUNT_PERCENT / 100))
}

export function packageSurchargeByVehicleType(
  key: PackageKey,
  vehicle: CalculatorVehicleSize | null,
): number {
  if (!vehicle) return 0
  return packageSurchargeByCarSize(key, calculatorVehicleToCarSize(vehicle))
}

export function formatPriceLabel(eur: number, lang: ContentLocale): string {
  return lang === "sk" ? `${eur} €` : `€${eur}`
}

function packagePriceLabels(lang: ContentLocale): Record<PackageKey, PackageData["price"]> {
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
  /** Menšia karta v sekcii doplnkových služieb (napr. TEPOVANIE). */
  compact?: boolean
  /** Preškrtnutá letná cena ako pri hlavných balíkoch. */
  showDiscount?: boolean
  /** Dynamická cena podľa veľkosti vozidla (TEPOVANIE). */
  pricingTier?: "upholstery"
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
  exterior: {
    title: "EXTERIÉR",
    subtitle: "Kompletné ručné čistenie exteriéru vozidla",
    price: packagePricesSk.exterior,
    features: [
      "Ručný detailing exteriéru",
      "Dekontaminácia a čistenie diskov",
      "Čistenie a výživenie pneumatík",
      "Umývanie okien zvonku aj zvnútra",
      "Odstránenie hmyzu a usadených nečistôt",
      "Oživenie plastov",
    ],
    footerNote: "Ideálne pre pravidelnú starostlivosť o vzhľad auta zvonka.",
  },
  premium: {
    title: "KOMPLET",
    subtitle: "Kompletný detailing interiéru a exteriéru vozidla na profesionálnej úrovni",
    price: packagePricesSk.premium,
    mostPopular: true,
    features: [
      "Všetko v balíku INTERIÉR",
      "Všetko v balíku EXTERIÉR",
      "Kompletný ručný detailing exteriéru",
      "Dekontaminácia a čistenie diskov",
      "Čistenie a výživenie pneumatík",
      "Odstránenie hmyzu a usadených nečistôt",
      "Oživenie plastov",
    ],
    footerNote:
      "Vhodné pre náročných klientov, ktorí očakávajú maximálnu čistotu a starostlivosť.",
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
  exterior: {
    title: "EXTERIOR",
    subtitle: "Exterior vehicle cleaning",
    price: packagePricesEn.exterior,
    features: [
      "Hand exterior detailing",
      "Wheel decontamination and cleaning",
      "Tire cleaning and dressing",
      "Exterior window wash",
      "Bug and bonded grime removal",
      "Plastic restoration",
    ],
    footerNote: "Ideal for regular care of your car's exterior appearance.",
  },
  premium: {
    title: "COMPLETE",
    subtitle: "Professional full interior and exterior detailing",
    price: packagePricesEn.premium,
    mostPopular: true,
    features: [
      "Everything in the INTERIOR package",
      "Everything in the EXTERIOR package",
      "Full hand exterior detailing",
      "Wheel decontamination and cleaning",
      "Tire cleaning and dressing",
      "Bug and bonded grime removal",
      "Plastic restoration",
    ],
    footerNote: "For discerning clients who expect maximum cleanliness and care.",
  },
}

export const additionalServices: AdditionalServiceData[] = [
  {
    name: "TEPOVANIE",
    description: "Profesionálne tepovanie interiéru vozidla",
    price: {
      small: "49 €",
      suv: "54 €",
      van: "54 €",
    },
    features: [
      "Tepovanie sedačiek",
      "Tepovanie koberčekov a podlahy",
      "Tepovanie a čistenie stropnice",
      "Tepovanie kufra bez podlahy",
    ],
    footerNote: "Odstránenie škvŕn, fľakov, zápachu a nahromadených nečistôt z textílií.",
    icon: "upholstery",
    compact: true,
    showDiscount: true,
    pricingTier: "upholstery",
  },
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
      "Brúsenie svetlometov",
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
      small: "60 €",
      suv: "60 €",
      van: "60 €",
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
    name: "UPHOLSTERY",
    description: "Professional interior upholstery cleaning",
    price: {
      small: "€49",
      suv: "€54",
      van: "€54",
    },
    features: [
      "Seat shampooing",
      "Carpet and floor shampooing",
      "Headliner shampooing and cleaning",
      "Trunk cleaning (without floor mat)",
    ],
    footerNote: "Removes stains, odours and built-up grime from fabrics.",
    icon: "upholstery",
    compact: true,
    showDiscount: true,
    pricingTier: "upholstery",
  },
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
      "Headlight sanding",
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
      small: "€60",
      suv: "€60",
      van: "€60",
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

const packagePricesDe = packagePriceLabels("de")

/** German copy for calculator / DE locale (keep in sync with `packages`). */
export const packagesDe: Record<PackageKey, PackageData> = {
  refresh: {
    title: "REFRESH",
    subtitle: "Basispaket für regelmäßige Fahrzeugpflege",
    price: packagePricesDe.refresh,
    features: [
      "Handwäsche Innenraum",
      "Innenraum saugen",
      "Kunststoffreinigung",
      "Fußmatten shampoonieren / Bodenwanne reinigen",
      "Duft im Innenraum",
    ],
    footerNote: "Ideal für eine regelmäßige monatliche Innenraum-Auffrischung.",
  },
  essential: {
    title: "INNENRAUM",
    subtitle: "Tiefenreinigung des kompletten Innenraums",
    price: packagePricesDe.essential,
    features: [
      "Alles aus dem REFRESH-Paket",
      "Tiefen-Detailing Innenraum",
      "Reserveradmulde",
      "Leder- & Kunststoffpflege",
      "Scheiben und Spiegel reinigen",
      "Pedalreinigung",
    ],
    footerNote:
      "Ideal, wenn der Innenraum volle Pflege braucht – vor dem Verkauf, nach der Saison oder bei starker Nutzung.",
  },
  exterior: {
    title: "AUSSENBEREICH",
    subtitle: "Reinigung des Fahrzeug-Außenbereichs",
    price: packagePricesDe.exterior,
    features: [
      "Hand-Detailing Außenbereich",
      "Felgenreinigung und -entseuchung",
      "Reifenreinigung und -pflege",
      "Außenscheiben waschen",
      "Insekten- und Schmutzentfernung",
      "Kunststoffaufbereitung",
    ],
    footerNote: "Ideal für die regelmäßige Pflege des Erscheinungsbilds Ihres Fahrzeugs.",
  },
  premium: {
    title: "KOMPLETT",
    subtitle: "Professionelles Detailing von Innen- und Außenbereich",
    price: packagePricesDe.premium,
    mostPopular: true,
    features: [
      "Alles aus dem INNENRAUM-Paket",
      "Alles aus dem AUSSENBEREICH-Paket",
      "Komplettes Hand-Detailing Außenbereich",
      "Felgenreinigung und -entseuchung",
      "Reifenreinigung und -pflege",
      "Insekten- und Schmutzentfernung",
      "Kunststoffaufbereitung",
    ],
    footerNote: "Für anspruchsvolle Kunden, die maximale Sauberkeit und Pflege erwarten.",
  },
}

/** German copy for homepage additional-service cards. */
export const additionalServicesDe: AdditionalServiceData[] = [
  {
    name: "POLSTERREINIGUNG",
    description: "Professionelle Polster- und Textilreinigung",
    price: {
      small: "€49",
      suv: "€54",
      van: "€54",
    },
    features: [
      "Sitzpolster shampoonieren",
      "Teppich- und Boden shampoonieren",
      "Dachhimmel shampoonieren und reinigen",
      "Kofferraumreinigung (ohne Bodenmatte)",
    ],
    footerNote: "Entfernt Flecken, Gerüche und eingebetteten Schmutz aus Textilien.",
    icon: "upholstery",
    compact: true,
    showDiscount: true,
    pricingTier: "upholstery",
  },
  {
    name: "Scheinwerfer-Aufbereitung",
    description: "Komplette Aufbereitung beider Frontscheinwerfer",
    price: {
      small: "€70",
      suv: "€70",
      van: "€70",
    },
    features: [
      "Entfernung von Oxidation und Vergilbung",
      "Scheinwerfer abschleifen",
      "Scheinwerfer polieren",
      "UV-Schutz auftragen",
    ],
    footerNote: "für beide Scheinwerfer",
    icon: "headlights",
  },
  {
    name: "Motorraumreinigung",
    description: "Reinigung und Aufbereitung des Motorraums",
    price: {
      small: "€60",
      suv: "€60",
      van: "€60",
    },
    features: [
      "Gründliche Motorraumreinigung",
      "Staub-, Fett- und Schmutzentfernung",
      "Kunststoffe und Schläuche pflegen",
      "Repräsentativer Look unter der Haube",
    ],
    icon: "engine",
  },
]

export function getPackages(lang: ContentLocale): Record<PackageKey, PackageData> {
  if (lang === "en") return packagesEn
  if (lang === "de") return packagesDe
  return packages
}

export function getAdditionalServices(lang: ContentLocale): AdditionalServiceData[] {
  if (lang === "en") return additionalServicesEn
  if (lang === "de") return additionalServicesDe
  return additionalServices
}
