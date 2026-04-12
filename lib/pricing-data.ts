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

export type AdditionalServiceIcon = "seats" | "ozone" | "leather"

export type AdditionalServiceData = {
  name: string
  description: string
  price: {
    small: string
    suv: string
    van: string
  }
  icon: AdditionalServiceIcon
}

export const packages: Record<string, PackageData> = {
  refresh: {
    title: "REFRESH",
    subtitle: "Základný balík pre pravidelnú starostlivosť o vozidlo",
    price: {
      small: "od 39 €",
      suv: "od 39 €",
      van: "od 39 €",
    },
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
    price: {
      small: "od 79 €",
      suv: "od 79 €",
      van: "od 79 €",
    },
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
    price: {
      small: "od 119 €",
      suv: "od 119 €",
      van: "od 119 €",
    },
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
    price: {
      small: "od 49 €",
      suv: "od 49 €",
      van: "od 49 €",
    },
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

/** English copy for calculator / EN locale (keep in sync with `packages`). */
export const packagesEn: Record<PackageKey, PackageData> = {
  refresh: {
    title: "REFRESH",
    subtitle: "Core package for regular vehicle care",
    price: {
      small: "from €39",
      suv: "from €39",
      van: "from €39",
    },
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
    price: {
      small: "from €79",
      suv: "from €79",
      van: "from €79",
    },
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
    price: {
      small: "from €119",
      suv: "from €119",
      van: "from €119",
    },
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
    title: "TEPOVANIE",
    subtitle: "Professional interior upholstery cleaning",
    price: {
      small: "from €49",
      suv: "from €49",
      van: "from €49",
    },
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
    name: "Tepovanie textilných sedačiek ",
    description: "Profesionálna hĺbková extrakcia znečistenej textílie",
    price: {
      small: "€30",
      suv: "€40",
      van: "€45",
    },
    icon: "seats",
  },
  {
    name: "Dezinfekcia ozónom",
    description: "Eliminovanie zápachov a dezinfekcia priestoru a povrchov vozidla",
    price: {
      small: "€25",
      suv: "€35",
      van: "€45",
    },
    icon: "ozone",
  },
  {
    name: "Čistenie a impregnácia koženého čalúnenia a sedadiel",
    description: "Hĺbkové čistenie a impregnácia kožených častí vozidla",
    price: {
      small: "€40",
      suv: "€45",
      van: "€50",
    },
    icon: "leather",
  },
]
