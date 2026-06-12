import type { ContentLocale } from "@/lib/i18n/locale"
import { getAustriaHubCard, isAustriaDistrictPath } from "@/lib/district-pages-i18n"

export type CoreLocationCard = {
  name: string
  slug: string
  description: string
  areas: string[]
}

export type DistrictHubEntry = {
  path: string
  h1: string
  lead: string
}

export type LocationsHubCopy = {
  h1: string
  heroP1: string
  heroP2: string
  sectionBratislavaTitle: string
  coverageAreas: string
  moreInfo: string
  sectionAustriaTitle: string
  sectionAustriaIntro: string
  sectionDistrictsTitle: string
  sectionDistrictsIntro: string
  ctaTitle: string
  ctaLead: string
  callButton: string
  seeAlso: string
  linkServices: string
  linkHowItWorks: string
  linkCalculator: string
  coreLocations: CoreLocationCard[]
  slovakDistrictCards: Record<string, { title: string; description: string }>
}

const coreLocationsSk: CoreLocationCard[] = [
  {
    name: "Bratislava",
    slug: "/bratislava",
    description:
      "Mobilný detailing v Bratislave pre všetky mestské časti. Poskytujeme služby v Starom Meste, Ružinove, Petržalke, Dúbravke a ďalších lokalitách.",
    areas: ["Staré Mesto", "Ružinov", "Petržalka", "Dúbravka", "Nové Mesto", "Karlova Ves", "Devín", "Devínska Nová Ves"],
  },
  {
    name: "Pezinok",
    slug: "/pezinok",
    description:
      "Profesionálny mobilný detailing v Pezinoku a okolí. Prídeme k vám domov alebo do firmy a poskytneme prémiové čistenie vášho vozidla.",
    areas: ["Pezinok", "Svätý Jur", "Modra"],
  },
  {
    name: "Senec",
    slug: "/senec",
    description:
      "Mobilné detailingové služby v Sencu a blízkom okolí. Ideálne pre zákazníkov z letiska a okolitých obcí.",
    areas: ["Senec", "Ivanka pri Dunaji", "Bernolákovo"],
  },
  {
    name: "Chorvátsky Grob",
    slug: "/chorvatsky-grob",
    description:
      "Prémiový mobilný detailing v Chorvátskom Grobe a okolitých obciach. Poskytujeme služby pre súkromných zákazníkov aj firmy.",
    areas: ["Chorvátsky Grob", "Veľký Grob", "Malinovo"],
  },
]

const hubCopy: Record<ContentLocale, LocationsHubCopy> = {
  sk: {
    h1: "Lokality — kde poskytujeme mobilný detailing",
    heroP1:
      "Crystal Detailing prináša prémiové mobilné detailingové služby priamo k vám v Bratislave, na Záhorí (okresy Malacky, Senica, Skalica), v Trnavskom kraji (okres Trnava, Galanta, Dunajská Streda), v bezprostrednom okolí Bratislavy — Pezinok, Senec, Chorvátsky Grob — aj v Rakúsku pri Bratislave až po Viedeň (Hainburg, Bruck an der Leitha, Eisenstadt, Schwechat, Wien).",
    heroP2:
      "Naša plne vybavená mobilná jednotka príde na vaše miesto — domov, do firmy alebo na parkovisko. Nemusíte nikam jazdiť; na Google a v lokálnom vyhľadávaní nás nájdete pod mobilný detailing v konkrétnych okresoch a mestách uvedených nižšie.",
    sectionBratislavaTitle: "Bratislava a bezprostredné okolie",
    coverageAreas: "Oblasti pokrytia:",
    moreInfo: "Viac informácií",
    sectionAustriaTitle: "Rakúsko pri Bratislave až po Viedeň",
    sectionAustriaIntro:
      "Samostatné stránky pre lokálne SEO v Rakúsku — mobilný detailing / mobile Autopflege v Hainburg an der Donau, Bruck an der Leitha, Burgenlande, vo víenskom okolí a vo Viedni. Výjazd z Bratislavy priamo k vám.",
    sectionDistrictsTitle: "Okresy Záhoria a Trnavského kraja",
    sectionDistrictsIntro:
      "Samostatné stránky pre lokálne SEO — mobilný detailing podľa okresu (Malacky, Senica, Skalica, Trnava, Galanta, Dunajská Streda). Kliknite pre viac informácií a FAQ.",
    ctaTitle: "Ste mimo mapovaných lokalít?",
    ctaLead: "Kontaktujte nás — dohodneme výjazd aj mimo uvedených okresov podľa možností a vzdialenosti.",
    callButton: "Zavolať: +421 918 722 720",
    seeAlso: "Pozrite si tiež:",
    linkServices: "Naše služby",
    linkHowItWorks: "Ako to funguje",
    linkCalculator: "Cenová kalkulačka",
    coreLocations: coreLocationsSk,
    slovakDistrictCards: {},
  },
  en: {
    h1: "Locations — where we offer mobile detailing",
    heroP1:
      "Crystal Detailing brings premium mobile detailing directly to you in Bratislava, Záhorie (Malacky, Senica, Skalica districts), Trnava region (Trnava, Galanta, Dunajská Streda districts), greater Bratislava — Pezinok, Senec, Chorvátsky Grob — and Austria near Bratislava up to Vienna (Hainburg, Bruck an der Leitha, Eisenstadt, Schwechat, Wien).",
    heroP2:
      "Our fully equipped mobile unit comes to your location — home, office or parking. No need to drive anywhere; find us on Google and local search for mobile detailing in the districts and cities listed below.",
    sectionBratislavaTitle: "Bratislava and immediate surroundings",
    coverageAreas: "Areas covered:",
    moreInfo: "More information",
    sectionAustriaTitle: "Austria near Bratislava up to Vienna",
    sectionAustriaIntro:
      "Dedicated pages for local SEO in Austria — mobile detailing / mobile Autopflege in Hainburg an der Donau, Bruck an der Leitha, Burgenland, Vienna surroundings and Vienna. We travel from Bratislava directly to you.",
    sectionDistrictsTitle: "Záhorie and Trnava region districts",
    sectionDistrictsIntro:
      "Dedicated local SEO pages — mobile detailing by district (Malacky, Senica, Skalica, Trnava, Galanta, Dunajská Streda). Click for details and FAQ.",
    ctaTitle: "Outside our mapped locations?",
    ctaLead: "Contact us — we can arrange travel beyond the listed districts depending on availability and distance.",
    callButton: "Call: +421 918 722 720",
    seeAlso: "See also:",
    linkServices: "Our services",
    linkHowItWorks: "How it works",
    linkCalculator: "Price calculator",
    coreLocations: [
      {
        name: "Bratislava",
        slug: "/bratislava",
        description:
          "Mobile detailing in Bratislava for all city districts. We serve Staré Mesto, Ružinov, Petržalka, Dúbravka and more.",
        areas: ["Staré Mesto", "Ružinov", "Petržalka", "Dúbravka", "Nové Mesto", "Karlova Ves", "Devín", "Devínska Nová Ves"],
      },
      {
        name: "Pezinok",
        slug: "/pezinok",
        description:
          "Professional mobile detailing in Pezinok and surroundings. We come to your home or business for premium car care.",
        areas: ["Pezinok", "Svätý Jur", "Modra"],
      },
      {
        name: "Senec",
        slug: "/senec",
        description:
          "Mobile detailing in Senec and nearby areas. Ideal for customers near the airport and surrounding villages.",
        areas: ["Senec", "Ivanka pri Dunaji", "Bernolákovo"],
      },
      {
        name: "Chorvátsky Grob",
        slug: "/chorvatsky-grob",
        description:
          "Premium mobile detailing in Chorvátsky Grob and nearby villages. For private customers and businesses.",
        areas: ["Chorvátsky Grob", "Veľký Grob", "Malinovo"],
      },
    ],
    slovakDistrictCards: {
      "/malacky": {
        title: "Malacky district",
        description:
          "Premium mobile detailing in Malacky district – Záhorie, Stupava and surrounding towns. Upholstery cleaning, interior and exterior care.",
      },
      "/senica": {
        title: "Senica district",
        description:
          "Mobile detailing across Senica district – professional interior deep cleaning and paint protection at your location.",
      },
      "/skalica": {
        title: "Skalica district",
        description:
          "Mobile car detailing in Skalica, Holíč and the district. We travel to you with full equipment.",
      },
      "/trnava": {
        title: "Trnava district",
        description:
          "Mobile detailing in Trnava and the district – ideal for busy customers who want showroom results without a car wash visit.",
      },
      "/galanta": {
        title: "Galanta district",
        description:
          "Professional mobile detailing in Galanta district and surrounding towns. Transparent pricing and flexible scheduling.",
      },
      "/dunajska-streda": {
        title: "Dunajská Streda district",
        description:
          "Mobile detailing in Dunajská Streda, Veľký Meder and the district – interior, exterior and upholstery services.",
      },
    },
  },
  de: {
    h1: "Standorte — wo wir mobiles Detailing anbieten",
    heroP1:
      "Crystal Detailing bringt Premium-Mobile-Detailing direkt zu Ihnen in Bratislava, Záhorie (Bezirke Malacky, Senica, Skalica), Trnavaer Region (Bezirke Trnava, Galanta, Dunajská Streda), Bratislava-Umgebung — Pezinok, Senec, Chorvátsky Grob — sowie Österreich nahe Bratislava bis Wien (Hainburg, Bruck an der Leitha, Eisenstadt, Schwechat, Wien).",
    heroP2:
      "Unsere voll ausgestattete mobile Einheit kommt zu Ihnen — nach Hause, ins Büro oder auf den Parkplatz. Sie müssen nirgendwo hinfahren; finden Sie uns bei Google und lokaler Suche für mobiles Detailing in den unten genannten Bezirken und Städten.",
    sectionBratislavaTitle: "Bratislava und unmittelbare Umgebung",
    coverageAreas: "Abgedeckte Gebiete:",
    moreInfo: "Mehr Informationen",
    sectionAustriaTitle: "Österreich nahe Bratislava bis Wien",
    sectionAustriaIntro:
      "Eigene Seiten für lokales SEO in Österreich — mobiles Detailing / mobile Autopflege in Hainburg an der Donau, Bruck an der Leitha, Burgenland, Wien Umgebung und Wien. Anfahrt aus Bratislava direkt zu Ihnen.",
    sectionDistrictsTitle: "Bezirke Záhorie und Trnavaer Region",
    sectionDistrictsIntro:
      "Eigene lokale SEO-Seiten — mobiles Detailing nach Bezirk (Malacky, Senica, Skalica, Trnava, Galanta, Dunajská Streda). Klicken für Details und FAQ.",
    ctaTitle: "Außerhalb unserer Karte?",
    ctaLead: "Kontaktieren Sie uns — Anfahrt außerhalb der genannten Bezirke vereinbaren wir je nach Möglichkeit und Entfernung.",
    callButton: "Anrufen: +421 918 722 720",
    seeAlso: "Siehe auch:",
    linkServices: "Unsere Leistungen",
    linkHowItWorks: "So funktioniert es",
    linkCalculator: "Preisrechner",
    coreLocations: [
      {
        name: "Bratislava",
        slug: "/bratislava",
        description:
          "Mobiles Detailing in Bratislava für alle Stadtbezirke. Staré Mesto, Ružinov, Petržalka, Dúbravka und mehr.",
        areas: ["Staré Mesto", "Ružinov", "Petržalka", "Dúbravka", "Nové Mesto", "Karlova Ves", "Devín", "Devínska Nová Ves"],
      },
      {
        name: "Pezinok",
        slug: "/pezinok",
        description:
          "Professionelles mobiles Detailing in Pezinok und Umgebung. Wir kommen zu Ihnen nach Hause oder ins Büro.",
        areas: ["Pezinok", "Svätý Jur", "Modra"],
      },
      {
        name: "Senec",
        slug: "/senec",
        description:
          "Mobiles Detailing in Senec und Umgebung. Ideal für Kunden nahe dem Flughafen und umliegende Orte.",
        areas: ["Senec", "Ivanka pri Dunaji", "Bernolákovo"],
      },
      {
        name: "Chorvátsky Grob",
        slug: "/chorvatsky-grob",
        description:
          "Premium-Mobile-Detailing in Chorvátsky Grob und umliegenden Ortschaften. Für Privat- und Firmenkunden.",
        areas: ["Chorvátsky Grob", "Veľký Grob", "Malinovo"],
      },
    ],
    slovakDistrictCards: {
      "/malacky": {
        title: "Bezirk Malacky",
        description:
          "Premium-Mobile-Detailing im Bezirk Malacky – Záhorie, Stupava und Umgebung. Polsterreinigung, Innen- und Außenpflege.",
      },
      "/senica": {
        title: "Bezirk Senica",
        description:
          "Mobiles Detailing im Bezirk Senica – professionelle Innenraumtiefenreinigung und Lackschutz bei Ihnen vor Ort.",
      },
      "/skalica": {
        title: "Bezirk Skalica",
        description:
          "Mobile Autopflege in Skalica, Holíč und Bezirk. Wir kommen mit voller Ausrüstung zu Ihnen.",
      },
      "/trnava": {
        title: "Bezirk Trnava",
        description:
          "Mobiles Detailing in Trnava und Bezirk – ideal für Vielbeschäftigte ohne Waschanlagen-Besuch.",
      },
      "/galanta": {
        title: "Bezirk Galanta",
        description:
          "Professionelles mobiles Detailing im Bezirk Galanta und Umgebung. Transparente Preise und flexible Termine.",
      },
      "/dunajska-streda": {
        title: "Bezirk Dunajská Streda",
        description:
          "Mobiles Detailing in Dunajská Streda, Veľký Meder und Bezirk – Innenraum, Außenbereich und Polsterreinigung.",
      },
    },
  },
}

export const austriaHubLocations: DistrictHubEntry[] = [
  {
    path: "/hainburg-an-der-donau",
    h1: "Mobilný detailing v Hainburg an der Donau a pri slovensko-rakúskej hranici",
    lead:
      "Bývate v Hainburg an der Donau, Wolfsthale alebo v bezprostrednom pohraničí? Crystal Detailing vyrazí z Bratislavy priamo k vám – mobilný detailing auta bez cesty na Slovensko. Tepovanie, čistenie interiéru a exteriéru u vás doma, vo firme alebo na parkovisku.",
  },
  {
    path: "/bruck-an-der-leitha",
    h1: "Mobilný detailing v Bruck an der Leitha a okolí",
    lead:
      "Pre zákazníkov z Bruck an der Leitha, Gattendorfu a okolia ponúkame prémiový mobilný detailing s výjazdom z Bratislavy. Nemusíte hľadať autoumývku – kompletné čistenie interiéru, exteriéru a tepovanie u vás na mieste.",
  },
  {
    path: "/eisenstadt-burgenland",
    h1: "Mobilný detailing v Burgenlande – Eisenstadt, Mattersburg, Neusiedl",
    lead:
      "Crystal Detailing pre vás vyrazí do Burgenlandu – Eisenstadt, Mattersburg, Neusiedl am See, Parndorf a okolie. Mobilný detailing pre súkromné aj firemné vozidlá; na Google nás nájdete aj pod hľadaním mobilný detailing Eisenstadt / Auto detailing Burgenland.",
  },
  {
    path: "/wien-umgebung",
    h1: "Mobilný detailing vo víenskom okolí – Schwechat, Fischamend, Niederösterreich",
    lead:
      "Bývate pri letisku Schwechat, vo Fischamende alebo v okolí Viedne na strane Niederösterreich? Mobilný detailing Crystal Detailing príde k vám – ideálne pre zaneprázdnených v okolí diaľnice Bratislava – Wien.",
  },
  {
    path: "/wien",
    h1: "Mobilný detailing vo Viedni (Wien)",
    lead:
      "Hľadáte mobilný detailing vo Viedni? Crystal Detailing vyrazí z Bratislavy až do Wien – čistenie interiéru, exteriéru, tepovanie a renovácia svetlometov priamo u vás. Na Google nás nájdete pod mobilný detailing Wien / mobile Autopflege Wien.",
  },
]

export const slovakDistrictHubLocations: DistrictHubEntry[] = [
  {
    path: "/malacky",
    h1: "Mobilný detailing v okrese Malacky",
    lead:
      "Prémiový mobilný detailing prídeme k vám do okresu Malacky – Záhorie, Stupava, okolie Maliek aj menšie obce. Tepovanie, čistenie interiéru a exteriéru, keramická ochrana.",
  },
  {
    path: "/senica",
    h1: "Mobilný detailing v okrese Senica",
    lead:
      "Crystal Detailing pre vás vyrazí do okresu Senica – mesto Senica, okolité obce a celý okres. Profesionálny mobilný detailing auta s dôrazom na tepovanie, hĺbkové čistenie a ochranu laku.",
  },
  {
    path: "/skalica",
    h1: "Mobilný detailing v okrese Skalica",
    lead:
      "Okres Skalica a Záhorie pri hraniciach – Skalica, Holíč a okolité obce. Prémiový mobilný detailing: ručné umývanie, tepovanie, ošetrenie kože a keramika na mieste u vás.",
  },
  {
    path: "/trnava",
    h1: "Mobilný detailing v okrese Trnava",
    lead:
      "Trnava a okolie – mobilný detailing pre sídliská, rodinné domy aj firmy. Prídeme s kompletnou mobilnou prevádzkou, bez čakania v autoumývke.",
  },
  {
    path: "/galanta",
    h1: "Mobilný detailing v okrese Galanta",
    lead:
      "Galanta, Sereď a okolité mestá – prémiový mobilný detailing áut s výjazdom. Ideálne pre firemné flotily aj súkromné vozidlá.",
  },
  {
    path: "/dunajska-streda",
    h1: "Mobilný detailing v okrese Dunajská Streda",
    lead:
      "Dunajská Streda, Veľký Meder a obce Žitného ostrova – mobilný detailing s výjazdom k vám. Kvalitné tepovanie a detailing v okrese Dunajská Streda.",
  },
]

export function getLocationsHubCopy(locale: ContentLocale): LocationsHubCopy {
  return hubCopy[locale] ?? hubCopy.sk
}

export function getHubDistrictCard(
  entry: DistrictHubEntry,
  locale: ContentLocale,
): { title: string; description: string } {
  if (isAustriaDistrictPath(entry.path)) {
    return getAustriaHubCard(entry.path, locale, entry.h1, entry.lead)
  }

  const copy = hubCopy[locale]?.slovakDistrictCards[entry.path]
  if (copy) {
    return copy
  }

  return {
    title: entry.h1.replace(/^Mobilný detailing v okrese /, "Okres "),
    description: entry.lead,
  }
}
