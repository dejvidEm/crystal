import type { ContentLocale } from "@/lib/i18n/locale"
import {
  LOYALTY_PREPAY_MONTHS,
  LOYALTY_PROGRAM_KEYS,
  loyaltyMonthlyEquivalentEur,
  loyaltyPrepayPriceEur,
  loyaltyRegularPrepayPriceEur,
  type LoyaltyProgramKey,
} from "@/lib/loyalty-programs-data"

export type LoyaltyStep = {
  title: string
  description: string
}

export type LoyaltyProgramCard = {
  key: LoyaltyProgramKey
  title: string
  subtitle: string
  prepayLabel: string
  monthlyLabel: string
  savingsLabel: string
  frequencyLabel: string
  features: string[]
  mostPopular?: boolean
}

export type LoyaltyProgramsCopy = {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  hero: {
    h1: string
    lead: string
  }
  howTitle: string
  howIntro: string
  steps: LoyaltyStep[]
  programsTitle: string
  programsIntro: string
  programs: LoyaltyProgramCard[]
  benefitsTitle: string
  benefits: string[]
  noteTitle: string
  noteBody: string
  ctaTitle: string
  ctaBody: string
  ctaButton: string
  ctaSecondary: string
  breadcrumb: string
  carSizeNote: string
}

function buildPrograms(
  locale: ContentLocale,
  defs: Record<
    LoyaltyProgramKey,
    {
      title: string
      subtitle: string
      features: string[]
      mostPopular?: boolean
    }
  >,
  labels: {
    prepayFor: string
    perMonth: string
    savings: string
    frequency: string
  },
): LoyaltyProgramCard[] {
  return LOYALTY_PROGRAM_KEYS.map((key) => {
    const def = defs[key]
    const prepay = loyaltyPrepayPriceEur(key)
    const monthly = loyaltyMonthlyEquivalentEur(key)
    const regular = loyaltyRegularPrepayPriceEur(key)
    const savings = regular - prepay

    const currency = locale === "en" ? "€" : "€"
    const prepayLabel =
      locale === "sk"
        ? `${prepay} ${currency} / ${LOYALTY_PREPAY_MONTHS} mesiace vopred`
        : locale === "de"
          ? `${prepay} ${currency} / ${LOYALTY_PREPAY_MONTHS} Monate im Voraus`
          : `${currency}${prepay} / ${LOYALTY_PREPAY_MONTHS} months prepaid`

    const monthlyLabel =
      locale === "sk"
        ? `≈ ${monthly} ${currency} mesačne`
        : locale === "de"
          ? `≈ ${monthly} ${currency} pro Monat`
          : `≈ ${currency}${monthly} per month`

    const savingsLabel =
      locale === "sk"
        ? `Ušetríte cca ${savings} ${currency}`
        : locale === "de"
          ? `Sie sparen ca. ${savings} ${currency}`
          : `Save approx. ${currency}${savings}`

    const frequencyLabel = labels.frequency

    return {
      key,
      title: def.title,
      subtitle: def.subtitle,
      prepayLabel,
      monthlyLabel,
      savingsLabel,
      frequencyLabel,
      features: def.features,
      mostPopular: def.mostPopular,
    }
  })
}

const loyaltySk: LoyaltyProgramsCopy = {
  metaTitle: "Vernostné programy",
  metaDescription:
    "Mesačné vernostné programy Crystal Detailing – zaplaťte dopredu a majte každý mesiac čisté auto. REFRESH, INTERIÉR a KOMPLET s výhodnejšou cenou pri predplatnom.",
  keywords: [
    "vernostný program detailing",
    "mesačný detailing Bratislava",
    "predplatné auto detailing",
    "pravidelný detailing",
    "Crystal Detailing program",
  ],
  hero: {
    h1: "Vernostné programy",
    lead:
      "Zaplaťte dopredu a my sa postaráme o vaše auto každý mesiac. Vyberte si program podľa toho, ako často a do akej hĺbky chcete mať vozidlo udržiavané – bez starostí s rezerváciou ceny pri každej návšteve.",
  },
  howTitle: "Ako to funguje",
  howIntro:
    "Vernostný program je jednoduchý: vyberiete balík, zaplatíte vopred za dohodnuté obdobie a každý mesiac prídeme na dohodnuté miesto. Auto máte pravidelne čisté bez opakovaného riešenia platby.",
  steps: [
    {
      title: "Vyberte program",
      description:
        "Zvoľte REFRESH, INTERIÉR alebo KOMPLET podľa toho, akú úroveň starostlivosti chcete mať každý mesiac.",
    },
    {
      title: "Zaplaťte vopred",
      description:
        "Uhradíte program na 3 mesiace dopredu a získate výhodnejšiu cenu oproti jednorazovým návštevám.",
    },
    {
      title: "Rezervujte termín",
      description:
        "Každý mesiac si dohodnete termín, ktorý vám vyhovuje – doma, v práci alebo na parkovisku.",
    },
    {
      title: "Čisté auto každý mesiac",
      description:
        "Prídeme k vám a vozidlo udržíme v rovnakej prémiovej kvalite, na akú ste zvyknutí od Crystal Detailing.",
    },
  ],
  programsTitle: "Programy na výber",
  programsIntro:
    "Ceny sú uvedené pre malé vozidlo (hatchback / sedan). Pri SUV a dodávkach sa cena upraví podľa veľkosti auta – rovnako ako v bežnom cenníku.",
  programs: buildPrograms(
    "sk",
    {
      refresh: {
        title: "REFRESH",
        subtitle: "Mesačná starostlivosť o interiér",
        features: [
          "1× mesačne mobilný výjazd",
          "Ručné umytie a vysávanie interiéru",
          "Čistenie plastov a rohoží",
          "Prevonanie interiéru",
          "Ideálne pre pravidelnú údržbu",
        ],
      },
      essential: {
        title: "INTERIÉR",
        subtitle: "Hĺbkový mesačný detailing interiéru",
        features: [
          "1× mesačne kompletný interiér",
          "Všetko z programu REFRESH",
          "Hĺbkový detailing a impregnácia",
          "Čistenie kože, plastov a okien",
          "Pre náročnejšiu každodennú záťaž",
        ],
      },
      premium: {
        title: "KOMPLET",
        subtitle: "Plný mesačný detailing interiéru aj exteriéru",
        features: [
          "1× mesačne interiér aj exteriér",
          "Všetko z programu INTERIÉR",
          "Ručný detailing exteriéru a diskov",
          "Dekontaminácia a oživenie povrchov",
          "Najkomplexnejšia mesačná starostlivosť",
        ],
        mostPopular: true,
      },
    },
    {
      prepayFor: "vopred",
      perMonth: "mesačne",
      savings: "Úspora",
      frequency: "1× mesačne · mobilný výjazd",
    },
  ),
  benefitsTitle: "Prečo vernostný program",
  benefits: [
    "Výhodnejšia cena pri platbe vopred oproti jednotlivým návštevám",
    "Pravidelná starostlivosť bez zabúdania na umývanie",
    "Rovnaká prémiová kvalita pri každom výjazde",
    "Flexibilné mesačné termíny podľa vášho rozvrhu",
    "Mobilný servis – prídeme tam, kde práve ste",
  ],
  noteTitle: "Dôležité informácie",
  noteBody:
    "Program sa uzatvára na minimálne 3 mesiace. Termíny jednotlivých mesačných výjazdov si dohodnete vopred. Pri zmene vozidla alebo presune adresy nás kontaktujte – program prispôsobíme. Ceny mimo Bratislavy sa riadia rovnakými pravidlami cestovného ako pri bežných objednávkach.",
  ctaTitle: "Máte záujem o vernostný program?",
  ctaBody:
    "Napíšte nám alebo si rezervujte úvodnú konzultáciu. Pomôžeme vám vybrať program podľa vášho auta a režimu používania.",
  ctaButton: "Rezervovať termín",
  ctaSecondary: "Kontaktovať nás",
  breadcrumb: "Vernostné programy",
  carSizeNote: "Cena pre malé vozidlo · SUV +5 € · Dodávka +10 €",
}

const loyaltyEn: LoyaltyProgramsCopy = {
  metaTitle: "Loyalty programs",
  metaDescription:
    "Monthly Crystal Detailing loyalty programs – pay upfront and enjoy a clean car every month. REFRESH, INTERIOR and COMPLETE packages at a better prepaid rate.",
  keywords: [
    "detailing loyalty program",
    "monthly car detailing Bratislava",
    "prepaid auto detailing",
    "regular car cleaning subscription",
    "Crystal Detailing program",
  ],
  hero: {
    h1: "Loyalty programs",
    lead:
      "Pay upfront and we take care of your car every month. Choose a program based on how deeply you want your vehicle maintained—without renegotiating the price on every visit.",
  },
  howTitle: "How it works",
  howIntro:
    "The loyalty program is simple: pick a package, pay upfront for the agreed period, and we come to your location each month. Your car stays consistently clean without handling payment every time.",
  steps: [
    {
      title: "Choose a program",
      description:
        "Select REFRESH, INTERIOR or COMPLETE depending on the level of care you want every month.",
    },
    {
      title: "Pay upfront",
      description:
        "Pay for 3 months in advance and get a better rate than one-off visits.",
    },
    {
      title: "Book your slot",
      description:
        "Each month you schedule a time that suits you—at home, at work, or in a car park.",
    },
    {
      title: "A clean car every month",
      description:
        "We come to you and maintain the same premium Crystal Detailing quality every visit.",
    },
  ],
  programsTitle: "Programs to choose from",
  programsIntro:
    "Prices shown are for small vehicles (hatchback / sedan). SUVs and vans are priced according to vehicle size, same as our standard price list.",
  programs: buildPrograms(
    "en",
    {
      refresh: {
        title: "REFRESH",
        subtitle: "Monthly interior maintenance",
        features: [
          "1× mobile visit per month",
          "Hand wash and vacuum interior",
          "Plastic and mat cleaning",
          "Interior freshening",
          "Ideal for regular upkeep",
        ],
      },
      essential: {
        title: "INTERIOR",
        subtitle: "Monthly deep interior detailing",
        features: [
          "1× full interior per month",
          "Everything in the REFRESH program",
          "Deep detailing and protection",
          "Leather, plastics and glass care",
          "For heavier daily use",
        ],
      },
      premium: {
        title: "COMPLETE",
        subtitle: "Full monthly interior and exterior detailing",
        features: [
          "1× interior and exterior per month",
          "Everything in the INTERIOR program",
          "Hand exterior detailing and wheels",
          "Decontamination and surface revival",
          "The most comprehensive monthly care",
        ],
        mostPopular: true,
      },
    },
    {
      prepayFor: "prepaid",
      perMonth: "per month",
      savings: "Save",
      frequency: "1× per month · mobile service",
    },
  ),
  benefitsTitle: "Why a loyalty program",
  benefits: [
    "Better prepaid pricing than individual visits",
    "Regular care without forgetting to book a wash",
    "The same premium quality on every visit",
    "Flexible monthly appointments around your schedule",
    "Mobile service—we come to where you are",
  ],
  noteTitle: "Good to know",
  noteBody:
    "Programs require a minimum 3-month commitment. Monthly visit dates are arranged in advance. Contact us if you change vehicles or address—we will adjust your plan. Travel outside Bratislava follows the same rules as standard bookings.",
  ctaTitle: "Interested in a loyalty program?",
  ctaBody:
    "Get in touch or book an intro consultation. We will help you choose the right program for your car and usage.",
  ctaButton: "Book an appointment",
  ctaSecondary: "Contact us",
  breadcrumb: "Loyalty programs",
  carSizeNote: "Price for small car · SUV +€5 · Van +€10",
}

const loyaltyDe: LoyaltyProgramsCopy = {
  metaTitle: "Treueprogramme",
  metaDescription:
    "Monatliche Treueprogramme von Crystal Detailing – im Voraus zahlen und jeden Monat ein sauberes Auto. REFRESH, INNENRAUM und KOMPLETT zu günstigeren Vorauszahlungspreisen.",
  keywords: [
    "Detailing Treueprogramm",
    "monatliches Auto Detailing Bratislava",
    "Detailing Abo",
    "regelmäßige Autopflege",
    "Crystal Detailing Programm",
  ],
  hero: {
    h1: "Treueprogramme",
    lead:
      "Zahlen Sie im Voraus und wir kümmern uns jeden Monat um Ihr Fahrzeug. Wählen Sie ein Programm nach dem gewünschten Pflegeumfang – ohne bei jedem Besuch neu zu verhandeln.",
  },
  howTitle: "So funktioniert es",
  howIntro:
    "Das Treueprogramm ist einfach: Paket wählen, im Voraus für den vereinbarten Zeitraum zahlen, und wir kommen jeden Monat zu Ihnen. Ihr Auto bleibt dauerhaft gepflegt, ohne jedes Mal separat zu bezahlen.",
  steps: [
    {
      title: "Programm wählen",
      description:
        "Wählen Sie REFRESH, INNENRAUM oder KOMPLETT je nach gewünschter monatlicher Pflege.",
    },
    {
      title: "Im Voraus zahlen",
      description:
        "Zahlen Sie 3 Monate im Voraus und profitieren Sie von einem günstigeren Preis als bei Einzelbuchungen.",
    },
    {
      title: "Termin reservieren",
      description:
        "Jeden Monat vereinbaren Sie einen passenden Termin – zu Hause, im Büro oder auf dem Parkplatz.",
    },
    {
      title: "Jeden Monat ein sauberes Auto",
      description:
        "Wir kommen zu Ihnen und liefern bei jedem Besuch die gewohnte Premium-Qualität von Crystal Detailing.",
    },
  ],
  programsTitle: "Programme zur Auswahl",
  programsIntro:
    "Preise gelten für kleine Fahrzeuge (Kleinwagen / Limousine). SUV und Transporter werden nach Fahrzeuggröße berechnet – wie in der regulären Preisliste.",
  programs: buildPrograms(
    "de",
    {
      refresh: {
        title: "REFRESH",
        subtitle: "Monatliche Innenraumpflege",
        features: [
          "1× mobiler Einsatz pro Monat",
          "Handwäsche und Staubsaugen innen",
          "Reinigung von Kunststoff und Fußmatten",
          "Innenraum-Auffrischung",
          "Ideal für regelmäßige Pflege",
        ],
      },
      essential: {
        title: "INNENRAUM",
        subtitle: "Monatliches Tiefen-Detailing innen",
        features: [
          "1× kompletter Innenraum pro Monat",
          "Alles aus dem REFRESH-Programm",
          "Tiefenreinigung und Imprägnierung",
          "Leder-, Kunststoff- und Scheibenpflege",
          "Für höhere Alltagsbelastung",
        ],
      },
      premium: {
        title: "KOMPLETT",
        subtitle: "Volles monatliches Innen- und Außen-Detailing",
        features: [
          "1× Innen- und Außenbereich pro Monat",
          "Alles aus dem INNENRAUM-Programm",
          "Hand-Detailing außen und Felgen",
          "Dekontamination und Oberflächenpflege",
          "Die umfassendste monatliche Betreuung",
        ],
        mostPopular: true,
      },
    },
    {
      prepayFor: "im Voraus",
      perMonth: "pro Monat",
      savings: "Ersparnis",
      frequency: "1× monatlich · mobiler Service",
    },
  ),
  benefitsTitle: "Warum ein Treueprogramm",
  benefits: [
    "Günstigerer Vorauszahlungspreis als Einzelbesuche",
    "Regelmäßige Pflege ohne vergessene Termine",
    "Gleiche Premium-Qualität bei jedem Besuch",
    "Flexible monatliche Termine nach Ihrem Zeitplan",
    "Mobiler Service – wir kommen zu Ihnen",
  ],
  noteTitle: "Wichtige Hinweise",
  noteBody:
    "Das Programm hat eine Mindestlaufzeit von 3 Monaten. Die monatlichen Termine werden im Voraus vereinbart. Bei Fahrzeug- oder Adresswechsel kontaktieren Sie uns – wir passen das Programm an. Fahrten außerhalb von Bratislava folgen denselben Reisekostenregeln wie normale Buchungen.",
  ctaTitle: "Interesse an einem Treueprogramm?",
  ctaBody:
    "Schreiben Sie uns oder buchen Sie eine Erstberatung. Wir helfen Ihnen, das passende Programm für Ihr Fahrzeug zu wählen.",
  ctaButton: "Termin buchen",
  ctaSecondary: "Kontakt aufnehmen",
  breadcrumb: "Treueprogramme",
  carSizeNote: "Preis für Kleinwagen · SUV +5 € · Transporter +10 €",
}

const loyaltyCopyByLocale: Record<ContentLocale, LoyaltyProgramsCopy> = {
  sk: loyaltySk,
  en: loyaltyEn,
  de: loyaltyDe,
}

export function getLoyaltyProgramsCopy(lang: ContentLocale): LoyaltyProgramsCopy {
  return loyaltyCopyByLocale[lang]
}
