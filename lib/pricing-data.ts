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
    title: "Balík interiér",
    subtitle: "Ideálny pre pravidelnú údržbu interiéru",
    price: {
      small: "€79",
      suv: "€79",
      van: "€79",
    },
    features: [
        "Ručné umývanie exteriéru",
        "Čistenie displejov a povrchov",
        "Vysávanie a odprašovanie interiéru",
        "Čistenie batožinového priestoru",
        "Utieranie palubnej dosky a konzoly",
        "Ošetrenie sedačiek / impregnácia",
        "Čistenie okien",
    ],
  },
  premium: {
    title: "Balík exteriér",
    subtitle: "Kompletná starostlivosť o exteriér",
    price: {
      small: "€69",
      suv: "€69",
      van: "€69",
    },
    features: [
        "Kompletné čistenie exteriéru vozidla",
        "Aplikácia bio vosku",
        "Čistenie diskov",
        "Kompletné čistenie skiel",
        "Odstránenie hmyzu",
        "Oživenie plastov a lesklých častí"
    ],
  },
  ultimate: {
    title: "Prémiový balík",
    subtitle: "Kompletný luxusný zážitok z interiéru aj exteriéru",
    price: {
      small: "€119",
      suv: "€119",
      van: "€119",
    },
    features: [
      "Všetko v balíku interiér",
        "Všetko v balíku exteriér",
        "Dezinfekcia interiéru",
        "Impregnácia interiéru"
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
