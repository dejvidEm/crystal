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
    { value: "100 %", label: "mobilný výjazd – bez prestojov" },
    { value: "24/7", label: "flexibilné termíny podľa prevádzky" },
    { value: "1", label: "faktúra za celú flotilu – jedna platba" },
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
    "Neponúkame pevný balík – každej firme a jej vozidlom prispôsobíme rozsah služieb, frekvenciu aj cenu úplne na mieru podľa vašich potrieb a prevádzky.",
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
    { value: "100%", label: "mobile service—no downtime" },
    { value: "24/7", label: "flexible scheduling around operations" },
    { value: "1", label: "invoice for the whole fleet—one payment" },
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
    "We do not offer a fixed package—for every company and fleet we tailor scope, frequency, and pricing completely to your needs and how you operate.",
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

const preFirmyDe: PreFirmyCopy = {
  metaTitle: "Mobile Autopflege für Unternehmen und Fuhrparks",
  metaDescription:
    "Premium mobile Autopflege für Firmenflotten in Bratislava und Umgebung. Einheitlicher Standard, flexible Termine und maßgeschneidertes Pflegepaket – Preis nach Fuhrparkgröße.",
  keywords: [
    "Fuhrpark Detailing",
    "Firmenauto Reinigung",
    "mobile Autopflege Unternehmen",
    "Flottenpflege Bratislava",
  ],
  hero: {
    h1: "Mobile Autopflege für Unternehmen",
    lead:
      "Premium-Pflege für Ihren Firmenfuhrpark ohne Ausfallzeiten in der Werkstatt. Wir kommen zu Ihrem Standort, Areal oder Parkplatz und halten einen einheitlichen Standard über die gesamte Flotte.",
    cta: "Firmenangebot anfordern",
  },
  statsTitle: "Warum Unternehmen Crystal Detailing wählen",
  stats: [
    { value: "100 %", label: "mobiler Service – ohne Ausfallzeiten" },
    { value: "24/7", label: "flexible Termine nach Ihrem Betrieb" },
    { value: "1", label: "Rechnung für die gesamte Flotte – eine Zahlung" },
    { value: "∞", label: "Flottengröße – individuelles Angebot" },
  ],
  audienceTitle: "Für wen ist der Service gedacht",
  audienceIntro:
    "Das Firmenpaket richtet sich an Organisationen, die repräsentative Fahrzeuge wollen – ohne eigene Waschprozesse.",
  audience: [
    {
      title: "Firmenflotten & GmbH",
      description: "Dienstwagen, Pool-Fahrzeuge und Transporter – regelmäßige Pflege nach Plan.",
    },
    {
      title: "Leasing & Autohäuser",
      description: "Übergabevorbereitung, Demo-Fahrzeuge und einheitlicher Auftritt vor dem Verkauf.",
    },
    {
      title: "Taxi, Carsharing & Transport",
      description: "Schnelle Innen- und Außenauffrischung zwischen Schichten – sauberer Eindruck bei Kunden.",
    },
    {
      title: "Bau- & Projektfirmen",
      description: "Pick-ups, SUVs und Transporter vor Ort – mobile Autopflege im Areal oder auf der Baustelle.",
    },
  ],
  whyTitle: "Warum das Firmenpaket",
  whyIntro:
    "Wir sind keine normale Waschanlage. Premium mobile Autopflege mit Fokus auf Detail, Diskretion und planbare Ergebnisse.",
  whyReasons: [
    "Ein Anbieter für die gesamte Flotte – ein Standard, weniger Administration",
    "Mobile Einheit mit Wasser und Equipment – Fahrzeuge bleiben stehen",
    "Termine außerhalb der Stoßzeit oder am Wochenende nach Vereinbarung",
    "Firmenrechnung und transparente Preiskommunikation im Voraus",
    "Innenraum, Außenbereich, Polsterreinigung und Extras kombinierbar",
    "Diskrete Arbeit bei Ihnen vor Ort und vor Kunden",
  ],
  packageTitle: "Pflegepaket für Unternehmen",
  packageIntro:
    "Kein festes Paket – für jedes Unternehmen und jede Flotte passen wir Leistungen, Häufigkeit und Preis vollständig an Ihre Bedürfnisse und Ihren Betrieb an.",
  packageName: "FIRMENPFLEGE",
  packageSubtitle: "Umfassende mobile Flottenpflege",
  packagePriceLabel: "Individuelles Angebot",
  packageFeatures: [
    "Flottencheck und Vorschlag für Pflegeplan",
    "Mobile Innen- und Außenpflege an Ihrer Adresse",
    "Einheitlicher Standard für alle Flottenfahrzeuge",
    "Polsterreinigung, Scheinwerfer-Aufbereitung und Extras nach Vereinbarung",
    "Flexible Termine – auch außerhalb der Geschäftszeiten",
    "Ein Ansprechpartner und Firmenrechnung",
  ],
  packageCta: "Kontakt aufnehmen",
  contactTitle: "Firmenanfrage",
  contactIntro:
    "Formular ausfüllen – wir erstellen ein Angebot nach Fuhrparkgröße und Ihren Wünschen. Antwort meist innerhalb eines Werktags.",
}

export function getPreFirmyCopy(lang: "sk" | "en" | "de"): PreFirmyCopy {
  if (lang === "en") return preFirmyEn
  if (lang === "de") return preFirmyDe
  return preFirmySk
}

export const preFirmyCopySk = preFirmySk
export const preFirmyCopyEn = preFirmyEn
export const preFirmyCopyDe = preFirmyDe
