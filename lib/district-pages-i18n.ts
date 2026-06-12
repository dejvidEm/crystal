import type { ContentLocale } from "@/lib/i18n/locale"
import type { DistrictFaq, DistrictPageContent } from "@/lib/district-page-types"

export type DistrictPageUi = {
  backToLocations: string
  callButton: string
  email: string
  areasHeadingDefault: string
  whyTitle: string
  whyItems: string[]
  faqTitle: string
  ctaTitle: string
  ctaLeadDefault: string
  bookButton: string
  quoteButton: string
  seeAlso: string
  ourServices: string
  allLocations: string
  bratislavaLink: string
}

type LocalizedDistrict = {
  h1: string
  lead: string
  areasHeading?: string
  ctaLead?: string
  faqs: DistrictFaq[]
}

const AUSTRIA_PATHS = new Set([
  "/hainburg-an-der-donau",
  "/bruck-an-der-leitha",
  "/eisenstadt-burgenland",
  "/wien-umgebung",
  "/wien",
])

export function isAustriaDistrictPath(path: string): boolean {
  return AUSTRIA_PATHS.has(path)
}

const districtPageUi: Record<ContentLocale, DistrictPageUi> = {
  sk: {
    backToLocations: "← Späť na lokality",
    callButton: "Zavolať: +421 918 722 720",
    email: "Email",
    areasHeadingDefault: "Oblasti pokrytia v okrese",
    whyTitle: "Prečo Crystal Detailing",
    whyItems: [
      "Mobilná služba – prídeme k vám",
      "Prémiové produkty a profesionálna výbava",
      "Transparentné ceny – odhad pred začatím práce",
      "Flexibilné termíny 7 dní v týždni",
      "Zameranie na lokálne vyhľadávanie vo vašom okrese",
    ],
    faqTitle: "Často kladené otázky",
    ctaTitle: "Rezervujte si termín",
    ctaLeadDefault: "Mobilný detailing vo vašom okrese – dohodnite si termín ešte dnes.",
    bookButton: "Rezervovať termín",
    quoteButton: "Získať cenovú ponuku",
    seeAlso: "Pozrite si tiež:",
    ourServices: "Naše služby",
    allLocations: "Všetky lokality",
    bratislavaLink: "Detailing Bratislava",
  },
  en: {
    backToLocations: "← Back to locations",
    callButton: "Call: +421 918 722 720",
    email: "Email",
    areasHeadingDefault: "Areas we cover",
    whyTitle: "Why Crystal Detailing",
    whyItems: [
      "Mobile service – we come to you",
      "Premium products and professional equipment",
      "Transparent pricing – estimate before we start",
      "Flexible appointments 7 days a week",
      "Focused on local search in your area",
    ],
    faqTitle: "Frequently asked questions",
    ctaTitle: "Book an appointment",
    ctaLeadDefault: "Mobile detailing in your area – book your appointment today.",
    bookButton: "Book now",
    quoteButton: "Get a quote",
    seeAlso: "See also:",
    ourServices: "Our services",
    allLocations: "All locations",
    bratislavaLink: "Detailing Bratislava",
  },
  de: {
    backToLocations: "← Zurück zu Standorten",
    callButton: "Anrufen: +421 918 722 720",
    email: "E-Mail",
    areasHeadingDefault: "Abgedeckte Gebiete",
    whyTitle: "Warum Crystal Detailing",
    whyItems: [
      "Mobiler Service – wir kommen zu Ihnen",
      "Premium-Produkte und professionelle Ausrüstung",
      "Transparente Preise – Kostenvoranschlag vor Beginn",
      "Flexible Termine 7 Tage die Woche",
      "Fokus auf lokale Suche in Ihrer Region",
    ],
    faqTitle: "Häufig gestellte Fragen",
    ctaTitle: "Termin buchen",
    ctaLeadDefault: "Mobiles Detailing in Ihrer Region – buchen Sie noch heute.",
    bookButton: "Jetzt buchen",
    quoteButton: "Angebot anfordern",
    seeAlso: "Siehe auch:",
    ourServices: "Unsere Leistungen",
    allLocations: "Alle Standorte",
    bratislavaLink: "Detailing Bratislava",
  },
}

const austriaDistrictEn: Record<string, LocalizedDistrict> = {
  "/hainburg-an-der-donau": {
    h1: "Mobile detailing in Hainburg an der Donau and at the Slovak–Austrian border",
    lead:
      "Live in Hainburg an der Donau, Wolfsthal or right on the border? Crystal Detailing drives from Bratislava directly to you – car detailing without crossing into Slovakia. Upholstery cleaning, interior and exterior care at your home, office or parking spot.",
    areasHeading: "Areas covered near the border",
    ctaLead: "Mobile detailing in Hainburg an der Donau and surroundings – book your appointment today.",
    faqs: [
      {
        question: "Do you offer mobile detailing in Hainburg an der Donau?",
        answer:
          "Yes. Hainburg an der Donau and nearby border towns are in our service zone. We arrive with full mobile equipment at your address.",
      },
      {
        question: "How long does it take to reach Hainburg from Bratislava?",
        answer:
          "Hainburg an der Donau is roughly 15–20 minutes from Bratislava. We confirm the exact arrival time when you book.",
      },
      {
        question: "Can I book detailing in German or English?",
        answer:
          "Yes, we can adapt communication. Book online or by phone – the service is the same as in Slovakia.",
      },
    ],
  },
  "/bruck-an-der-leitha": {
    h1: "Mobile detailing in Bruck an der Leitha and surroundings",
    lead:
      "For customers in Bruck an der Leitha, Gattendorf and the area we offer premium mobile detailing from Bratislava. No car wash queues – complete interior, exterior and upholstery cleaning on site.",
    areasHeading: "Areas covered around Bruck an der Leitha",
    ctaLead: "Mobile detailing in Bruck an der Leitha – book online or by phone.",
    faqs: [
      {
        question: "Do you travel to Bruck an der Leitha for detailing?",
        answer:
          "Yes. Bruck an der Leitha and surrounding towns are covered by our mobile service. We bring our own water and professional equipment from Bratislava.",
      },
      {
        question: "What services are available in Bruck an der Leitha?",
        answer:
          "Full interior + exterior packages, seat shampooing, headlight restoration, leather care and add-ons from our price list.",
      },
      {
        question: "Is pricing the same as in Bratislava?",
        answer:
          "Prices are transparent per our price list and calculator. When booking we confirm the final estimate including travel to Austria.",
      },
    ],
  },
  "/eisenstadt-burgenland": {
    h1: "Mobile detailing in Burgenland – Eisenstadt, Mattersburg, Neusiedl",
    lead:
      "Crystal Detailing travels to Burgenland – Eisenstadt, Mattersburg, Neusiedl am See, Parndorf and surroundings. Mobile detailing for private and fleet vehicles; find us on Google for mobile detailing Eisenstadt / Auto detailing Burgenland.",
    areasHeading: "Areas covered in Burgenland",
    ctaLead: "Mobile detailing in Burgenland – book your appointment today.",
    faqs: [
      {
        question: "Do you cover Eisenstadt and Mattersburg with mobile detailing?",
        answer:
          "Yes. Eisenstadt, Mattersburg and other Burgenland towns are in our service area. Book online or by phone.",
      },
      {
        question: "Is travel from Bratislava to Burgenland practical?",
        answer:
          "Yes. Eisenstadt and surroundings are about 45–60 minutes from Bratislava. Mobile service saves you time – no need to drive anywhere.",
      },
      {
        question: "Do you offer seat shampooing in Eisenstadt?",
        answer:
          "Yes. Interior shampooing is one of our most popular services. Combine it with packages from our price list and calculator.",
      },
    ],
  },
  "/wien-umgebung": {
    h1: "Mobile detailing in Vienna surroundings – Schwechat, Fischamend, Lower Austria",
    lead:
      "Live near Schwechat airport, in Fischamend or around Vienna in Lower Austria? Crystal Detailing comes to you – ideal for busy customers along the Bratislava–Vienna corridor.",
    areasHeading: "Areas covered in Vienna surroundings",
    ctaLead: "Mobile detailing in Vienna surroundings – book an appointment at your location.",
    faqs: [
      {
        question: "Do you offer detailing in Schwechat and near the airport?",
        answer:
          "Yes. Schwechat, Fischamend and nearby towns in Vienna surroundings are in our mobile zone. We work at your home, office or agreed parking spot.",
      },
      {
        question: "How far from Bratislava can you travel in Vienna surroundings?",
        answer:
          "We regularly cover Bratislava – Schwechat – Vienna surroundings. Exact range and arrival time are confirmed when you book.",
      },
      {
        question: "Can I order detailing for company vehicles in Vienna surroundings?",
        answer:
          "Yes. Fleet and multiple vehicles are handled by arrangement. Contact us with your date and scope requirements.",
      },
    ],
  },
  "/wien": {
    h1: "Mobile detailing in Vienna (Wien)",
    lead:
      "Looking for mobile detailing in Vienna? Crystal Detailing travels from Bratislava to Wien – interior and exterior cleaning, shampooing and headlight restoration at your location. Find us on Google for mobile detailing Wien / mobile Autopflege Wien.",
    areasHeading: "Areas covered in Vienna",
    ctaLead: "Mobile detailing in Vienna – book your appointment today.",
    faqs: [
      {
        question: "Do you offer mobile detailing in Vienna (Wien)?",
        answer:
          "Yes. We come to Vienna with our mobile unit. Service at your address – apartment, house, business or parking as agreed.",
      },
      {
        question: "How long does it take to arrive from Bratislava to Vienna?",
        answer:
          "Depending on district and traffic, usually 45–75 minutes. We confirm arrival time when you book.",
      },
      {
        question: "What services are available in Vienna?",
        answer:
          "Full mobile detailing – REFRESH, INTERIOR, COMPLETE packages, shampooing, headlight restoration and add-ons from our price list.",
      },
    ],
  },
}

const austriaDistrictDe: Record<string, LocalizedDistrict> = {
  "/hainburg-an-der-donau": {
    h1: "Mobiles Detailing in Hainburg an der Donau und an der slowakisch-österreichischen Grenze",
    lead:
      "Wohnen Sie in Hainburg an der Donau, Wolfsthal oder direkt an der Grenze? Crystal Detailing fährt von Bratislava zu Ihnen – Autopflege ohne Fahrt in die Slowakei. Polsterreinigung, Innen- und Außenreinigung bei Ihnen zu Hause, im Büro oder auf dem Parkplatz.",
    areasHeading: "Abgedeckte Gebiete an der Grenze",
    ctaLead: "Mobiles Detailing in Hainburg an der Donau und Umgebung – buchen Sie noch heute.",
    faqs: [
      {
        question: "Bieten Sie mobiles Detailing in Hainburg an der Donau an?",
        answer:
          "Ja. Hainburg an der Donau und umliegende Grenzorte liegen in unserer Einsatzzone. Wir kommen mit kompletter mobiler Ausrüstung zu Ihrer Adresse.",
      },
      {
        question: "Wie lange dauert die Anfahrt von Bratislava nach Hainburg?",
        answer:
          "Hainburg an der Donau ist etwa 15–20 Minuten von Bratislava entfernt. Die genaue Ankunftszeit vereinbaren wir bei der Buchung.",
      },
      {
        question: "Kann ich Detailing auch auf Deutsch oder Englisch buchen?",
        answer:
          "Ja, die Kommunikation passen wir an. Buchen Sie online oder telefonisch – der Service ist derselbe wie in der Slowakei.",
      },
    ],
  },
  "/bruck-an-der-leitha": {
    h1: "Mobiles Detailing in Bruck an der Leitha und Umgebung",
    lead:
      "Für Kunden aus Bruck an der Leitha, Gattendorf und Umgebung bieten wir Premium-Mobile-Detailing mit Anfahrt aus Bratislava. Keine Waschanlagen-Warteschlange – komplette Innen-, Außen- und Polsterreinigung vor Ort.",
    areasHeading: "Abgedeckte Gebiete rund um Bruck an der Leitha",
    ctaLead: "Mobiles Detailing in Bruck an der Leitha – online oder telefonisch buchen.",
    faqs: [
      {
        question: "Fahren Sie mit Detailing nach Bruck an der Leitha?",
        answer:
          "Ja. Bruck an der Leitha und umliegende Orte bedienen wir mobil. Anfahrt aus Bratislava mit eigenem Wasser und professioneller Ausrüstung.",
      },
      {
        question: "Welche Leistungen sind in Bruck an der Leitha verfügbar?",
        answer:
          "Komplette Innen- und Außenpakete, Sitzshampoo, Scheinwerferaufbereitung, Lederpflege und Zusatzleistungen laut Preisliste.",
      },
      {
        question: "Gilt der gleiche Preis wie in Bratislava?",
        answer:
          "Preise sind transparent laut Preisliste und Rechner. Bei der Buchung bestätigen wir den Endpreis inklusive Anfahrt nach Österreich.",
      },
    ],
  },
  "/eisenstadt-burgenland": {
    h1: "Mobiles Detailing im Burgenland – Eisenstadt, Mattersburg, Neusiedl",
    lead:
      "Crystal Detailing fährt ins Burgenland – Eisenstadt, Mattersburg, Neusiedl am See, Parndorf und Umgebung. Mobiles Detailing für Privat- und Firmenfahrzeuge; finden Sie uns bei der Suche nach mobilem Detailing Eisenstadt / Auto detailing Burgenland.",
    areasHeading: "Abgedeckte Gebiete im Burgenland",
    ctaLead: "Mobiles Detailing im Burgenland – buchen Sie noch heute.",
    faqs: [
      {
        question: "Decken Sie Eisenstadt und Mattersburg mit mobilem Detailing ab?",
        answer:
          "Ja. Eisenstadt, Mattersburg und weitere Burgenland-Gemeinden liegen in unserem Einsatzgebiet. Termin online oder telefonisch.",
      },
      {
        question: "Ist die Anfahrt von Bratislava ins Burgenland praktikabel?",
        answer:
          "Ja. Eisenstadt und Umgebung sind etwa 45–60 Minuten von Bratislava entfernt. Mobiler Service spart Zeit – Sie müssen nirgendwo hinfahren.",
      },
      {
        question: "Bieten Sie Sitzshampoo in Eisenstadt an?",
        answer:
          "Ja. Innenraum-Shampoo gehört zu unseren beliebtesten Leistungen. Kombinierbar mit Paketen laut Preisliste und Rechner.",
      },
    ],
  },
  "/wien-umgebung": {
    h1: "Mobiles Detailing in Wien Umgebung – Schwechat, Fischamend, Niederösterreich",
    lead:
      "Wohnen Sie nahe Flughafen Schwechat, in Fischamend oder im Wiener Umland in Niederösterreich? Crystal Detailing kommt zu Ihnen – ideal für Vielbeschäftigte entlang der Strecke Bratislava–Wien.",
    areasHeading: "Abgedeckte Gebiete in Wien Umgebung",
    ctaLead: "Mobiles Detailing in Wien Umgebung – Termin direkt bei Ihnen buchen.",
    faqs: [
      {
        question: "Bieten Sie Detailing in Schwechat und am Flughafen an?",
        answer:
          "Ja. Schwechat, Fischamend und umliegende Orte in Wien Umgebung liegen in unserer mobilen Zone. Service zu Hause, im Büro oder auf vereinbartem Parkplatz.",
      },
      {
        question: "Wie weit fahren Sie von Bratislava in Wien Umgebung?",
        answer:
          "Regelmäßig entlang Bratislava – Schwechat – Wiener Umland. Genaue Reichweite und Ankunftszeit bestätigen wir bei der Buchung.",
      },
      {
        question: "Kann ich Detailing für Firmenfahrzeuge in Wien Umgebung buchen?",
        answer:
          "Ja. Flotten und mehrere Fahrzeuge nach Absprache. Kontaktieren Sie uns mit Termin- und Leistungswunsch.",
      },
    ],
  },
  "/wien": {
    h1: "Mobiles Detailing in Wien",
    lead:
      "Suchen Sie mobiles Detailing in Wien? Crystal Detailing fährt von Bratislava nach Wien – Innen- und Außenreinigung, Shampoo und Scheinwerferaufbereitung bei Ihnen vor Ort. Finden Sie uns bei mobile Autopflege Wien / Auto detailing Wien.",
    areasHeading: "Abgedeckte Gebiete in Wien",
    ctaLead: "Mobiles Detailing in Wien – buchen Sie noch heute.",
    faqs: [
      {
        question: "Bieten Sie mobiles Detailing in Wien an?",
        answer:
          "Ja. Wir kommen mit unserer mobilen Einheit nach Wien. Service an Ihrer Adresse – Wohnung, Haus, Firma oder Parkplatz nach Vereinbarung.",
      },
      {
        question: "Wie lange dauert die Anfahrt von Bratislava nach Wien?",
        answer:
          "Je nach Bezirk und Verkehr meist 45–75 Minuten. Ankunftszeit bestätigen wir bei der Buchung.",
      },
      {
        question: "Welche Leistungen sind in Wien verfügbar?",
        answer:
          "Komplettes mobiles Detailing – REFRESH-, INNENRAUM- und KOMPLETT-Pakete, Shampoo, Scheinwerferaufbereitung und Zusatzleistungen laut Preisliste.",
      },
    ],
  },
}

const localizedAustria: Record<Exclude<ContentLocale, "sk">, Record<string, LocalizedDistrict>> = {
  en: austriaDistrictEn,
  de: austriaDistrictDe,
}

export function getDistrictPageUi(locale: ContentLocale): DistrictPageUi {
  return districtPageUi[locale]
}

export function getLocalizedDistrictData(
  data: DistrictPageContent,
  locale: ContentLocale,
): DistrictPageContent {
  if (locale === "sk" || !isAustriaDistrictPath(data.path)) {
    return data
  }

  const localized = localizedAustria[locale][data.path]
  if (!localized) {
    return data
  }

  return {
    ...data,
    h1: localized.h1,
    lead: localized.lead,
    areasHeading: localized.areasHeading ?? data.areasHeading,
    ctaLead: localized.ctaLead ?? data.ctaLead,
    faqs: localized.faqs,
  }
}

function stripAustriaHubTitle(h1: string): string {
  return h1
    .replace(/^Mobilný detailing (v |vo )/, "")
    .replace(/^Mobile detailing in /, "")
    .replace(/^Mobiles Detailing in /, "")
}

export function getAustriaHubCard(
  path: string,
  locale: ContentLocale,
  skH1: string,
  skLead: string,
): { title: string; description: string } {
  if (locale === "sk") {
    return { title: stripAustriaHubTitle(skH1), description: skLead }
  }

  const localized = localizedAustria[locale][path]
  if (!localized) {
    return { title: stripAustriaHubTitle(skH1), description: skLead }
  }

  return {
    title: stripAustriaHubTitle(localized.h1),
    description: localized.lead,
  }
}
