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
      "Exterior hand wash",
      "Wheel and tire cleaning",
      "Interior vacuum and dusting",
      "Dashboard and console wipe down",
      "Window cleaning",
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
      "Everything in Essential package",
      "Clay bar treatment",
      "One-step paint correction",
      "Synthetic wax application",
      "Leather conditioning",
      "Interior deep cleaning",
    ],
  },
  ultimate: {
    title: "Prémiový balík",
    subtitle: "Kompletný luxusný zážitok z interiéru aj exteriéru",
    price: {
      small: "€119",
      suv: "€129",
      van: "€139",
    },
    features: [
      "Everything in Premium package",
      "Two-step paint correction",
      "Ceramic coating application",
      "Engine bay detailing",
      "Headlight restoration",
      "Premium interior treatment",
    ],
  },
}

export const additionalServices: AdditionalServiceData[] = [
  {
    name: "Deep Seat Cleaning",
    description: "Professional extraction and deep cleaning of all seats and upholstery",
    price: {
      small: "€60",
      suv: "€75",
      van: "€90",
    },
  },
  {
    name: "Ozone Treatment",
    description: "Eliminate odors and sanitize your vehicle's interior with ozone technology",
    price: {
      small: "€45",
      suv: "€55",
      van: "€65",
    },
  },
  {
    name: "Headlight Restoration",
    description: "Restore cloudy, yellowed headlights to crystal clear condition",
    price: {
      small: "€40",
      suv: "€40",
      van: "€40",
    },
  },
  {
    name: "Paint Protection Film",
    description: "Apply transparent film to protect high-impact areas from chips and scratches",
    price: {
      small: "€120+",
      suv: "€150+",
      van: "€180+",
    },
  },
  {
    name: "Leather Treatment",
    description: "Deep clean, condition and protect leather surfaces",
    price: {
      small: "€55",
      suv: "€70",
      van: "€85",
    },
  },
  {
    name: "Engine Bay Detailing",
    description: "Clean and dress your engine bay for a showroom appearance",
    price: {
      small: "€70",
      suv: "€85",
      van: "€100",
    },
  },
]
