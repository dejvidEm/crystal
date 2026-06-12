export type PreFirmyStat = { value: string; label: string }
export type PreFirmyAudience = { title: string; description: string }
export type PreFirmyReason = string
export type PreFirmyPackageFeature = string

export type PreFirmyCopy = {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  hero: {
    h1: string
    lead: string
    cta: string
  }
  statsTitle: string
  stats: PreFirmyStat[]
  audienceTitle: string
  audienceIntro: string
  audience: PreFirmyAudience[]
  whyTitle: string
  whyIntro: string
  whyReasons: PreFirmyReason[]
  packageTitle: string
  packageIntro: string
  packageName: string
  packageSubtitle: string
  packagePriceLabel: string
  packageFeatures: PreFirmyPackageFeature[]
  packageCta: string
  contactTitle: string
  contactIntro: string
}

const preFirmySk: PreFirmyCopy = {
  metaTitle: "Mobilný detailing pre firmy a flotily",
  metaDescription:
    "Prémiový mobilný detailing pre firemné flotily v Bratislave a okolí. Jednotný štandard, flexibilné termíny a balík starostlivosti na mieru – cena podľa počtu vozidiel.",
  keywords: [
    "detailing pre firmy",
    "firemná flotila detailing",
    "mobilný detailing firmy Bratislava",
    "čistenie firemných áut",
    "fleet detailing",
  ],
  hero: {
    h1: "Mobilný detailing pre firmy",
    lead:
      "Prémiová starostlivosť o firemnú flotilu bez odstavovania vozidiel v servise. Prídeme k vám – na sídlo, do areálu alebo na parkovisko a udržiame jednotný štandard naprieč celou flotilou.",
    cta: "Získať firemnú ponuku",
  },
  statsTitle: "Prečo firmy volia Crystal Detailing",
  stats: [
    { value: "100 %", label: "mobilný výjazd – bez straty času v servise" },
    { value: "7 dní", label: "flexibilné termíny podľa prevádzky" },
    { value: "1", label: "kontaktná osoba pre celú flotilu" },
    { value: "∞", label: "veľkosť flotily – ponuka na mieru" },
  ],
  audienceTitle: "Pre koho je služba určená",
  audienceIntro:
    "Firemný balík je navrhnutý pre organizácie, ktoré chcú mať reprezentatívne vozidlá bez vlastného car-wash procesu.",
  audience: [
    {
      title: "Firemné flotily a s.r.o.",
      description:
        "Služobné autá, pool vozidiel a firemné dodávky – pravidelná starostlivosť podľa harmonogramu.",
    },
    {
      title: "Leasing a predajne vozidiel",
      description:
        "Príprava áut na odovzdanie, udržiavanie demo vozidiel a konzistentný vzhľad pred predajom.",
    },
    {
      title: "Taxi, car-sharing a preprava",
      description:
        "Rýchle obnovenie interiéru a exteriéru medzi zmenami – dôraz na čistotu a dojem u zákazníkov.",
    },
    {
      title: "Developerské a stavebné firmy",
      description:
        "Pick-upy, SUV a dodávky v teréne – mobilný detailing priamo v areáli alebo na stavbe.",
    },
  ],
  whyTitle: "Prečo si vybrať firemný balík",
  whyIntro:
    "Nie sme bežná umyváreň. Prinášame prémiový mobilný detailing s dôrazom na detail, diskrétnosť a predvídateľný výsledok.",
  whyReasons: [
    "Jeden dodávateľ pre celú flotilu – jednotný štandard a menej administratívy",
    "Mobilná jednotka s vodou a výbavou – auto nemusí nikam ísť",
    "Termíny mimo špičky alebo cez víkend podľa dohody",
    "Fakturácia pre firmy a transparentná komunikácia ceny vopred",
    "Možnosť kombinovať interiér, exteriér, tepovanie a doplnkové služby",
    "Diskrétna práca pri vašich klientoch aj v firemnom areáli",
  ],
  packageTitle: "Balík starostlivosti pre firmy",
  packageIntro:
    "Jeden balík prispôsobený vašej flotile – rozsah a frekvencia podľa počtu vozidiel a typu prevádzky. Cenu riešime individuálne.",
  packageName: "FIREMNÁ STAROSTLIVOSŤ",
  packageSubtitle: "Komplexná mobilná starostlivosť o firemnú flotilu",
  packagePriceLabel: "Individuálna ponuka",
  packageFeatures: [
    "Audit stavu flotily a návrh harmonogramu starostlivosti",
    "Mobilný detailing interiéru a exteriéru na vašej adrese",
    "Jednotný štandard pre všetky vozidlá vo flotile",
    "Tepovanie, renovácia svetlometov a doplnky podľa dohody",
    "Flexibilné termíny – mimo pracovnej doby podľa potreby",
    "Jeden kontakt a fakturácia pre firmy",
  ],
  packageCta: "Kontaktovať nás",
  contactTitle: "Firemný dopyt",
  contactIntro:
    "Vyplňte formulár – pripravíme ponuku podľa počtu vozidiel a vašich požiadaviek. Ozveme sa zvyčajne do jedného pracovného dňa.",
}

const preFirmyEn: PreFirmyCopy = {
  metaTitle: "Mobile detailing for businesses and fleets",
  metaDescription:
    "Premium mobile detailing for company fleets in Bratislava and beyond. Consistent standards, flexible scheduling, and a tailored care package—pricing based on fleet size.",
  keywords: [
    "corporate fleet detailing",
    "business car cleaning",
    "mobile detailing companies",
    "fleet care Bratislava",
  ],
  hero: {
    h1: "Mobile detailing for business",
    lead:
      "Premium care for your company fleet without downtime at a fixed location. We come to your office, site, or car park and maintain one consistent standard across every vehicle.",
    cta: "Request a business quote",
  },
  statsTitle: "Why companies choose Crystal Detailing",
  stats: [
    { value: "100%", label: "mobile service—no time lost at a car wash" },
    { value: "7 days", label: "flexible scheduling around operations" },
    { value: "1", label: "point of contact for the whole fleet" },
    { value: "∞", label: "fleet size—tailored proposal" },
  ],
  audienceTitle: "Who it is for",
  audienceIntro:
    "The business package is built for organisations that want representative vehicles without running an in-house wash process.",
  audience: [
    {
      title: "Company fleets",
      description: "Pool cars, service vehicles, and vans—scheduled care on your premises.",
    },
    {
      title: "Leasing and dealerships",
      description: "Handover prep, demo fleet upkeep, and consistent presentation before sale.",
    },
    {
      title: "Taxi, ride-hail, and transport",
      description: "Fast interior and exterior refresh between shifts—clean impression for customers.",
    },
    {
      title: "Developers and field teams",
      description: "Pick-ups, SUVs, and vans on site—mobile detailing at the yard or project location.",
    },
  ],
  whyTitle: "Why choose the business package",
  whyIntro:
    "We are not a standard car wash. We deliver premium mobile detailing with focus on detail, discretion, and predictable results.",
  whyReasons: [
    "One vendor for the whole fleet—one standard, less admin",
    "Mobile unit with water and equipment—vehicles stay put",
    "Off-peak or weekend slots by agreement",
    "Business invoicing and transparent pricing upfront",
    "Combine interior, exterior, shampooing, and add-ons",
    "Discreet work at your premises and in front of clients",
  ],
  packageTitle: "Business care package",
  packageIntro:
    "One package tailored to your fleet—scope and frequency based on vehicle count and how you operate. Pricing is individual.",
  packageName: "CORPORATE CARE",
  packageSubtitle: "Comprehensive mobile fleet care",
  packagePriceLabel: "Custom quote",
  packageFeatures: [
    "Fleet review and proposed care schedule",
    "Mobile interior and exterior detailing at your address",
    "Consistent standard across all fleet vehicles",
    "Shampooing, headlight restoration, and add-ons by agreement",
    "Flexible timing—including outside business hours",
    "Single contact and business invoicing",
  ],
  packageCta: "Contact us",
  contactTitle: "Business enquiry",
  contactIntro:
    "Fill in the form—we will prepare a quote based on fleet size and your requirements. We usually reply within one business day.",
}

export function getPreFirmyCopy(lang: "sk" | "en"): PreFirmyCopy {
  return lang === "en" ? preFirmyEn : preFirmySk
}

export const preFirmyCopySk = preFirmySk
export const preFirmyCopyEn = preFirmyEn
