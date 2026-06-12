import type { Metadata } from "next"
import { metaDescription } from "@/lib/seo-meta"
import type { DistrictFaq, DistrictPageDefinition } from "@/lib/district-page-types"

export type { DistrictFaq, DistrictPageDefinition } from "@/lib/district-page-types"
export { toDistrictPageContent } from "@/lib/district-page-types"

const base = "https://crystaldetailing.sk"

function metaFor(
  slug: string,
  title: string,
  description: string,
  extraKeywords: string[] = [],
): Metadata {
  const url = `${base}/${slug}`
  const descriptionMeta = metaDescription(description)

  return {
    title,
    description: descriptionMeta,
    alternates: { canonical: url },
    keywords: [
      `mobilný detailing ${slug.replace(/-/g, " ")}`,
      `detailing ${slug.replace(/-/g, " ")}`,
      `tepovanie áut ${slug.replace(/-/g, " ")}`,
      "mobilný detailing Západné Slovensko",
      "detailing Slovensko",
      ...extraKeywords,
    ],
    openGraph: {
      title: `${title} | Crystal Detailing`,
      description: descriptionMeta,
      url,
    },
  }
}

function metaForAustria(
  slug: string,
  title: string,
  description: string,
  placeName: string,
  germanKeywords: string[],
): Metadata {
  return metaFor(slug, title, description, [
    `mobilný detailing ${placeName}`,
    `detailing ${placeName} Rakúsko`,
    `mobilný detailing pri Bratislave Rakúsko`,
    `auto detailing Grenze Slowakei`,
    ...germanKeywords,
  ])
}

export const districtMalacky: DistrictPageDefinition = {
  path: "/malacky",
  h1: "Mobilný detailing v okrese Malacky",
  lead:
    "Prémiový mobilný detailing prídeme k vám do okresu Malacky – Záhorie, Stupava, okolie Maliek aj menšie obce. Tepovanie, čistenie interiéru a exteriéru, keramická ochrana. Objavte sa v Google ako klient z okresu Malacky – službu realizujeme priamo u vás.",
  areas: [
    "Malacky",
    "Stupava",
    "Zohor",
    "Vysoká pri Morave",
    "Jakubov",
    "Pernek",
    "Láb",
    "Plavecký Štvrtok",
  ],
  faqs: [
    {
      question: "Poskytujete mobilný detailing v celom okrese Malacky?",
      answer:
        "Áno, zákazníkom z Maliek, Stupavy, Zohoru a ďalších obcí v okrese Malacky prídeme s mobilnou jednotkou priamo na adresu. Stačí rezervácia.",
    },
    {
      question: "Ako dlho trvá príchod do okresu Malacky z Bratislavy?",
      answer:
        "Podľa konkrétnej obce to býva približne 25–45 minút. Čas si dohodneme pri rezervácii; na kvalitu služby to nemá vplyv – berieme vlastnú vodu aj výbavu.",
    },
    {
      question: "Aké služby objednám v okrese Malacky?",
      answer:
        "Kompletný mobilný detailing – interiér, exteriér, tepovanie sedadiel, ozón, ošetrenie kože, renovácia svetlometov a ďalšie podľa cenníka a kalkulačky.",
    },
  ],
  metadata: metaFor(
    "malacky",
    "Mobilný detailing okres Malacky | Záhorie, Stupava | Crystal Detailing",
    "Mobilný detailing okres Malacky a Záhorie. Stupava, Malacky, Zohor – tepovanie, čistenie auta, keramika. Prídeme k vám domov či do firmy.",
  ),
}

export const districtSenica: DistrictPageDefinition = {
  path: "/senica",
  h1: "Mobilný detailing v okrese Senica",
  lead:
    "Crystal Detailing pre vás vyrazí do okresu Senica – mesto Senica, okolité obce a celý okres. Profesionálny mobilný detailing auta s dôrazom na tepovanie, hĺbkové čistenie a ochranu laku.",
  areas: ["Senica", "Šaštín-Stráže", "Častá", "Kúty", "Sekule", "Čáry", "Lopašov", "Kunov"],
  faqs: [
    {
      question: "Je možná objednávka mobilného detailingu v Senici?",
      answer:
        "Áno, Senica a okolité obce v okrese pokrývame mobilnou službou. Dochádzame na vami zvolené miesto.",
    },
    {
      question: "Čo zahŕňa detailing v okrese Senica?",
      answer:
        "Komplexné balíky interiér + exteriér, samostatné tepovanie, ozón, vosky a doplnkové služby podľa potreby vášho vozidla.",
    },
    {
      question: "Platí pre Senicu rovnaká cena ako pri Bratislave?",
      answer:
        "Ceny sú transparentné podľa cenníka a kalkulačky; presný odhad dostanete pred začatím práce. Vzdialenosť zásahu v okrese riešime individuálne pri rezervácii.",
    },
  ],
  metadata: metaFor(
    "senica",
    "Mobilný detailing okres Senica | Crystal Detailing",
    "Mobilný detailing Senica a okolie. Tepovanie, čistenie auta, interiér a exteriér. Mobilná jednotka priamo k vám v okrese Senica.",
  ),
}

export const districtSkalica: DistrictPageDefinition = {
  path: "/skalica",
  h1: "Mobilný detailing v okrese Skalica",
  lead:
    "Okres Skalica a Záhorie pri hraniciach – Skalica, Holíč a okolité obce. Prémiový mobilný detailing: ručné umývanie, tepovanie, ošetrenie kože a keramika na mieste u vás.",
  areas: ["Skalica", "Holíč", "Gajary", "Kátov", "Prietržka", "Radimov", "Tvrdošovce", "Chropov"],
  faqs: [
    {
      question: "Detailing v Skalici a Holíči – je to v dosahu?",
      answer:
        "Áno, Skalica, Holíč a obce okresu Skalica sú v našej mobilnej zóne. Objednajte si termín online alebo telefonicky.",
    },
    {
      question: "Aké sú výhody mobilného detailingu pri hraniciach?",
      answer:
        "Nemusíte do Bratislavy – plná výbava príde k vám. Šetríte čas a auto je ošetrené profesionálnou technikou a produktmi.",
    },
    {
      question: "Môžem si objednať len tepovanie sedadiel v Skalici?",
      answer:
        "Áno, doplnkové služby vrátane tepovania môžete kombinovať s balíkmi podľa kalkulačky.",
    },
  ],
  metadata: metaFor(
    "skalica",
    "Mobilný detailing okres Skalica, Holíč | Crystal Detailing",
    "Mobilný detailing Skalica, Holíč, Záhorie. Tepovanie, čistenie interiéru, ošetrenie laku. Mobilný detailing okres Skalica – prídeme k vám.",
  ),
}

export const districtTrnava: DistrictPageDefinition = {
  path: "/trnava",
  h1: "Mobilný detailing v okrese Trnava",
  lead:
    "Trnava a okolie – mobilný detailing pre sídliská, rodinné domy aj firmy. Hľadáte „mobilný detailing Trnava“ – prídeme s kompletnou mobilnou prevádzkou, bez čakania v autoumývke.",
  areas: ["Trnava", "Špačince", "Bučany", "Ružindol", "Hrnčiarovce nad Parnou", "Kostoľany", "Biely Kostol"],
  faqs: [
    {
      question: "Poskytujete služby priamo v Trnave?",
      answer:
        "Áno, Trnava aj obce v okolí sú bežnou zónou výjazdu. Dom, práca alebo parkovisko – detailing u vás na mieste.",
    },
    {
      question: "Ako rezervujem mobilný detailing v okrese Trnava?",
      answer:
        "Najrýchlejšie cez online rezervačný systém alebo telefonicky. Čas a rozsah služby si spoločne upresníme.",
    },
    {
      question: "Je v Trnave dostupná keramická ochrana laku?",
      answer:
        "Áno, ponúkame prémiové ošetrenia vrátane keramiky podľa typu vozidla a stavu laku.",
    },
  ],
  metadata: metaFor(
    "trnava",
    "Mobilný detailing Trnava a okolie | Crystal Detailing",
    "Mobilný detailing okres Trnava – mesto Trnava a okolité obce. Tepovanie auta, detailing interiéru, exteriéru. Objednajte mobilný detailing Trnava.",
  ),
}

export const districtGalanta: DistrictPageDefinition = {
  path: "/galanta",
  h1: "Mobilný detailing v okrese Galanta",
  lead:
    "Galanta, Sereď a okolité mestá – prémiový mobilný detailing áut s výjazdom. Ideálne pre firemné flotily aj súkromné vozidlá; služby ladíme na vyhľadávanie typu mobilný detailing Galanta / Sereď.",
  areas: ["Galanta", "Sereď", "Čierny Brod", "Váhovce", "Šoporňa", "Jelka", "Dolná Streda", "Šintava"],
  faqs: [
    {
      question: "Pokrývate Galantu a Sereď mobilným detailingom?",
      answer:
        "Áno, okres Galanta vrátane mesta Galanta a Sereď je v našej mobilnej zóne výjazdov.",
    },
    {
      question: "Môžem objednať detailing pre viac áut vo firme v Galante?",
      answer:
        "Áno, firemné objednávky riešime po dohode na termínoch a rozsahu. Kontaktujte nás s požiadavkou.",
    },
    {
      question: "Čo všetko zahŕňa balík v okrese Galanta?",
      answer:
        "Od základného refresh interiéru až po kompletný balík interiér + exteriér; presný výber podľa cenníka a kalkulačky.",
    },
  ],
  metadata: metaFor(
    "galanta",
    "Mobilný detailing Galanta, Sereď, okres Galanta | Crystal Detailing",
    "Mobilný detailing okres Galanta – Galanta, Sereď, tepovanie, čistenie auta. Mobilná jednotka u vás doma alebo v práci.",
  ),
}

export const districtDunajskaStreda: DistrictPageDefinition = {
  path: "/dunajska-streda",
  h1: "Mobilný detailing v okrese Dunajská Streda",
  lead:
    "Dunajská Streda, Veľký Meder a obce Žitného ostrova – mobilný detailing s výjazdom k vám. Hľadáte kvalitné tepovanie a detailing v okrese Dunajská Streda – objavte nás v lokálnom vyhľadávaní aj pod značkou Crystal Detailing.",
  areas: [
    "Dunajská Streda",
    "Veľký Meder",
    "Želiezovce",
    "Hurbanovo",
    "Gabčíkovo",
    "Vrakúň",
    "Čalovec",
    "Kolárovo",
  ],
  faqs: [
    {
      question: "Chodíte s detailingom do Dunajskej Stredy?",
      answer:
        "Áno, Dunajská Streda aj okolité obce v okrese sú v našej výjazdovej oblasti. Zarezervujte si termín.",
    },
    {
      question: "Je mobilný detailing výhodnejší ako klasické umyvárne na Žitnom ostrove?",
      answer:
        "U vás nemusíte čakať v rade; používame prémiové produkty a čas vám ušetríme – auto umyjeme a ošetríme na mieste.",
    },
    {
      question: "Môžem získať odhad ceny pre Dunajskú Stredu?",
      answer:
        "Áno, použite kalkulačku na webe alebo nás kontaktujte – cenu potvrdíme pred začatím práce.",
    },
  ],
  metadata: metaFor(
    "dunajska-streda",
    "Mobilný detailing Dunajská Streda, Veľký Meder | Crystal Detailing",
    "Mobilný detailing okres Dunajská Streda. Dunajská Streda, Veľký Meder, tepovanie, čistenie auta. Mobilný detailing priamo u vás.",
  ),
}

/** Poradie na stránke lokality a vo sitemape */
export const zahorieATrnavaDistricts: DistrictPageDefinition[] = [
  districtMalacky,
  districtSenica,
  districtSkalica,
  districtTrnava,
  districtGalanta,
  districtDunajskaStreda,
]

export const districtHainburg: DistrictPageDefinition = {
  path: "/hainburg-an-der-donau",
  h1: "Mobilný detailing v Hainburg an der Donau a pri slovensko-rakúskej hranici",
  lead:
    "Bývate v Hainburg an der Donau, Wolfsthale alebo v bezprostrednom pohraničí? Crystal Detailing vyrazí z Bratislavy priamo k vám – mobilný detailing auta bez cesty na Slovensko. Tepovanie, čistenie interiéru a exteriéru u vás doma, vo firme alebo na parkovisku.",
  areas: [
    "Hainburg an der Donau",
    "Wolfsthal",
    "Berg",
    "Jedenspeigen",
    "Stopfenreuth",
    "Engelhartstetten",
  ],
  areasHeading: "Oblasti pokrytia pri hranici",
  ctaLead: "Mobilný detailing v Hainburg an der Donau a okolí – dohodnite si termín ešte dnes.",
  faqs: [
    {
      question: "Poskytujete mobilný detailing v Hainburg an der Donau?",
      answer:
        "Áno, Hainburg an der Donau a okolité obce pri hranici sú v našej výjazdovej zóne. Prídeme s kompletnou mobilnou výbavou priamo na vašu adresu.",
    },
    {
      question: "Ako dlho trvá príchod z Bratislavy do Hainburgu?",
      answer:
        "Hainburg an der Donau je od Bratislavy vzdialený približne 15–20 minút. Presný čas dohodneme pri rezervácii podľa vašej adresy.",
    },
    {
      question: "Môžem si objednať detailing aj v nemčine / angličtine?",
      answer:
        "Áno, komunikáciu vieme prispôsobiť. Rezerváciu môžete urobiť online alebo telefonicky – službu realizujeme rovnako ako na Slovensku.",
    },
  ],
  metadata: metaForAustria(
    "hainburg-an-der-donau",
    "Mobilný detailing Hainburg an der Donau | pri hranici | Crystal Detailing",
    "Mobilný detailing Hainburg an der Donau, Wolfsthal a pohraničie. Tepovanie, čistenie auta – výjazd z Bratislavy priamo k vám v Rakúsku.",
    "Hainburg an der Donau",
    [
      "mobile Autopflege Hainburg",
      "Auto detailing Hainburg an der Donau",
      "Fahrzeugaufbereitung Grenze Slowakei",
      "mobile Autoreinigung Wolfsthal",
    ],
  ),
}

export const districtBruck: DistrictPageDefinition = {
  path: "/bruck-an-der-leitha",
  h1: "Mobilný detailing v Bruck an der Leitha a okolí",
  lead:
    "Pre zákazníkov z Bruck an der Leitha, Gattendorfu a okolia ponúkame prémiový mobilný detailing s výjazdom z Bratislavy. Nemusíte hľadať autoumývku – kompletné čistenie interiéru, exteriéru a tepovanie u vás na mieste.",
  areas: [
    "Bruck an der Leitha",
    "Gattendorf",
    "Rohrau",
    "Parbasdorf",
    "Höflein",
    "Prellenkirchen",
  ],
  areasHeading: "Oblasti pokrytia v okolí Bruck an der Leitha",
  ctaLead: "Mobilný detailing v Bruck an der Leitha – rezervujte si termín online alebo telefonicky.",
  faqs: [
    {
      question: "Chodíte s detailingom do Bruck an der Leitha?",
      answer:
        "Áno, Bruck an der Leitha a obce v okolí pokrývame mobilnou službou. Výjazd zabezpečujeme z Bratislavy s vlastnou vodou a profesionálnou výbavou.",
    },
    {
      question: "Aké služby sú dostupné v Bruck an der Leitha?",
      answer:
        "Kompletné balíky interiér + exteriér, tepovanie sedadiel, renovácia svetlometov, ošetrenie kože a doplnkové služby podľa cenníka.",
    },
    {
      question: "Platí rovnaká cena ako v Bratislave?",
      answer:
        "Ceny sú transparentné podľa cenníka a kalkulačky. Pri rezervácii vám potvrdíme finálny odhad vrátane výjazdu do Rakúska.",
    },
  ],
  metadata: metaForAustria(
    "bruck-an-der-leitha",
    "Mobilný detailing Bruck an der Leitha | Crystal Detailing",
    "Mobilný detailing Bruck an der Leitha a okolie. Tepovanie, čistenie auta – mobilná jednotka z Bratislavy priamo k vám.",
    "Bruck an der Leitha",
    [
      "mobile Autopflege Bruck an der Leitha",
      "Auto detailing Bruck an der Leitha",
      "Fahrzeugaufbereitung Niederösterreich",
      "mobile Autoreinigung Bruck",
    ],
  ),
}

export const districtEisenstadt: DistrictPageDefinition = {
  path: "/eisenstadt-burgenland",
  h1: "Mobilný detailing v Burgenlande – Eisenstadt, Mattersburg, Neusiedl",
  lead:
    "Crystal Detailing pre vás vyrazí do Burgenlandu – Eisenstadt, Mattersburg, Neusiedl am See, Parndorf a okolie. Mobilný detailing pre súkromné aj firemné vozidlá; na Google nás nájdete aj pod hľadaním mobilný detailing Eisenstadt / Auto detailing Burgenland.",
  areas: [
    "Eisenstadt",
    "Mattersburg",
    "Neusiedl am See",
    "Parndorf",
    "Wimpassing an der Leitha",
    "Nickelsdorf",
    "Oberpullendorf",
  ],
  areasHeading: "Oblasti pokrytia v Burgenlande",
  ctaLead: "Mobilný detailing v Burgenlande – objednajte si termín ešte dnes.",
  faqs: [
    {
      question: "Pokrývate Eisenstadt a Mattersburg mobilným detailingom?",
      answer:
        "Áno, Eisenstadt, Mattersburg a ďalšie obce v Burgenlande sú v našej výjazdovej oblasti. Termín si dohodnete online alebo telefonicky.",
    },
    {
      question: "Je výjazd do Burgenlandu z Bratislavy praktický?",
      answer:
        "Áno, Eisenstadt a okolie sú od Bratislavy približne 45–60 minút. Mobilná služba vám ušetrí čas – nemusíte s autom nikam jazdiť.",
    },
    {
      question: "Ponúkate tepovanie sedadiel v Eisenstadte?",
      answer:
        "Áno, tepovanie interiéru je jedna z našich najobľúbenejších služieb. Kombinovať ho môžete s balíkmi podľa cenníka a kalkulačky.",
    },
  ],
  metadata: metaForAustria(
    "eisenstadt-burgenland",
    "Mobilný detailing Eisenstadt, Burgenland | Mattersburg | Crystal Detailing",
    "Mobilný detailing Eisenstadt, Mattersburg, Neusiedl am See a Burgenland. Tepovanie, čistenie auta – výjazd z Bratislavy.",
    "Eisenstadt",
    [
      "mobile Autopflege Eisenstadt",
      "Auto detailing Burgenland",
      "Fahrzeugaufbereitung Mattersburg",
      "mobile Autoreinigung Neusiedl am See",
    ],
  ),
}

export const districtWienUmgebung: DistrictPageDefinition = {
  path: "/wien-umgebung",
  h1: "Mobilný detailing vo víenskom okolí – Schwechat, Fischamend, Niederösterreich",
  lead:
    "Bývate pri letisku Schwechat, vo Fischamende alebo v okolí Viedne na strane Niederösterreich? Mobilný detailing Crystal Detailing príde k vám – ideálne pre zaneprázdnených v okolí diaľnice Bratislava – Wien.",
  areas: [
    "Schwechat",
    "Fischamend",
    "Maria Enzersdorf",
    "Brunn am Gebirge",
    "Himberg",
    "Moosbrunn",
    "Rannersdorf",
    "Götzendorf an der Leitha",
    "Bad Deutsch-Altenburg",
    "Petronell-Carnuntum",
  ],
  areasHeading: "Oblasti pokrytia vo víenskom okolí",
  ctaLead: "Mobilný detailing vo víenskom okolí – dohodnite si termín priamo u vás.",
  faqs: [
    {
      question: "Poskytujete detailing vo Schwechate a pri letisku?",
      answer:
        "Áno, Schwechat, Fischamend a okolité obce vo víenskom okolí sú v našej mobilnej zóne. Službu realizujeme u vás doma, vo firme alebo na dohodnutom parkovisku.",
    },
    {
      question: "Ako ďaleko od Bratislavy je možný výjazd vo víenskom okolí?",
      answer:
        "Bežne dochádzame po trasu Bratislava – Schwechat – okolie Viedne. Presný rozsah a čas príchodu potvrdíme pri rezervácii.",
    },
    {
      question: "Môžem objednať detailing pre firemné vozidlá vo víenskom okolí?",
      answer:
        "Áno, firemné flotily a viac vozidiel riešime po dohode. Kontaktujte nás s požiadavkou na termín a rozsah služby.",
    },
  ],
  metadata: metaForAustria(
    "wien-umgebung",
    "Mobilný detailing Wien Umgebung | Schwechat, Fischamend | Crystal Detailing",
    "Mobilný detailing vo víenskom okolí – Schwechat, Fischamend, Niederösterreich. Tepovanie a čistenie auta s výjazdom z Bratislavy.",
    "Wien Umgebung",
    [
      "mobile Autopflege Schwechat",
      "Auto detailing Wien Umgebung",
      "Fahrzeugaufbereitung Fischamend",
      "mobile Autoreinigung Niederösterreich",
    ],
  ),
}

export const districtWien: DistrictPageDefinition = {
  path: "/wien",
  h1: "Mobilný detailing vo Viedni (Wien)",
  lead:
    "Hľadáte mobilný detailing vo Viedni? Crystal Detailing vyrazí z Bratislavy až do Wien – čistenie interiéru, exteriéru, tepovanie a renovácia svetlometov priamo u vás. Na Google nás nájdete pod mobilný detailing Wien / mobile Autopflege Wien.",
  areas: [
    "Wien Innere Stadt",
    "Wien Leopoldstadt",
    "Wien Landstraße",
    "Wien Donaustadt",
    "Wien Floridsdorf",
    "Wien Favoriten",
    "Wien Simmering",
    "Wien Liesing",
    "Wien Hietzing",
    "Wien Penzing",
    "Wien Ottakring",
    "Wien Döbling",
  ],
  areasHeading: "Oblasti pokrytia vo Viedni",
  ctaLead: "Mobilný detailing vo Viedni – rezervujte si termín ešte dnes.",
  faqs: [
    {
      question: "Poskytujete mobilný detailing vo Viedni (Wien)?",
      answer:
        "Áno, do Viedne dochádzame s mobilnou jednotkou. Službu realizujeme na vašej adrese – byt, rodinný dom, firma alebo parkovisko po dohode.",
    },
    {
      question: "Ako dlho trvá príchod z Bratislavy do Viedne?",
      answer:
        "Podľa konkrétneho víenného okresu a dopravnej situácie zvyčajne 45–75 minút. Čas príchodu potvrdíme pri rezervácii.",
    },
    {
      question: "Aké služby sú dostupné vo Viedni?",
      answer:
        "Kompletný mobilný detailing – balíky REFRESH, INTERIÉR, KOMPLET, tepovanie, renovácia svetlometov a doplnkové služby podľa cenníka.",
    },
  ],
  metadata: metaForAustria(
    "wien",
    "Mobilný detailing Wien | Viedeň | Crystal Detailing",
    "Mobilný detailing vo Viedni (Wien). Tepovanie, čistenie interiéru a exteriéru auta – mobilná služba s výjazdom z Bratislavy.",
    "Wien",
    [
      "mobile Autopflege Wien",
      "Auto detailing Wien",
      "Fahrzeugaufbereitung Wien",
      "mobile Autoreinigung Wien",
      "Innenreinigung Auto Wien",
    ],
  ),
}

/** Rakúsko pri Bratislave – poradie na /lokality a vo sitemape */
export const austriaNearBratislavaLocations: DistrictPageDefinition[] = [
  districtHainburg,
  districtBruck,
  districtEisenstadt,
  districtWienUmgebung,
  districtWien,
]

export const allLocationPages: DistrictPageDefinition[] = [
  ...zahorieATrnavaDistricts,
  ...austriaNearBratislavaLocations,
]
