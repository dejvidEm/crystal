// Pricing data for different car sizes
export type CarSize = "small" | "suv" | "van"

export type PackageData = {
  title: string
  subtitle: string
  price: {
    small: string
    suv: string
    van: string
  }
  features: string[]
  mostPopular?: boolean
}

export type AdditionalServiceData = {
  name: string
  description: string
  price: {
    small: string
    suv: string
    van: string
  }
}

export const packages: Record<string, PackageData> = {
  essential: {
    title: "Základný balík",
    subtitle: "Ideálny pre pravidelnú údržbu",
    price: {
      small: "€69",
      suv: "€79",
      van: "€89",
    },
    features: [
      "Kompletné vysávanie",
      "Vysávanie batožinového priestoru",
      "Detailné čistenie palubovky",
      "Detailné čistenie volantu",
      "Čistenie ovládacích prvkov",
      "Prevoňanie interéru",
      "Čistenie okien a zrkadiel",
    ],
  },
  premium: {
    title: "Štandardný balík",
    subtitle: "Kompletná starostlivosť o interiér",
    price: {
      small: "€89",
      suv: "€99",
      van: "€99",
    },
    mostPopular: true,
    features: [
      "Všetko v Základnom balíku",
      "Čistenie plastových častí",
      "Čistenie a vysávanie rohoží + koberčekov",
      "Impregnácia plastových častí",
      "Vysávanie a čistenie priestoru pre rezervu",
      "Čistenie pedálov"
    ],
  },
  ultimate: {
    title: "Prémiový balík",
    subtitle: "Kompletný luxusný zážitok z nového interiéru",
    price: {
      small: "€99",
      suv: "€119",
      van: "€129",
    },
    features: [
      "Všetko v Štandardnom balíku",
      "Čistenie a impregnácia látkových častí",
      "Čistenie a impregnácia kožených častí",
      "Tepovanie koberčekov",
      "Dezinfekcia parným čističom",
    ],
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
  },
  {
    name: "Dezinfekcia ozónom",
    description: "Eliminovanie zápachov a dezinfekcia priestoru a povrchov vozidla",
    price: {
      small: "€25",
      suv: "€35",
      van: "€45",
    },
  },
  {
    name: "Čistenie a impregnácia koženého čalúnenia a sedadiel",
    description: "Hĺbkové čistenie a impregnácia kožených častí vozidla",
    price: {
      small: "€40",
      suv: "€45",
      van: "€50",
    },
  },
]
