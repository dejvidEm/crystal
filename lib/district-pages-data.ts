import type { Metadata } from "next"

const base = "https://crystaldetailing.sk"

export type DistrictFaq = { question: string; answer: string }

export type DistrictPageDefinition = {
  path: string
  /** H1 na stránke */
  h1: string
  /** Úvodný odsek (SEO + čitateľ) */
  lead: string
  /** Obce / mestá pod okresom */
  areas: string[]
  faqs: DistrictFaq[]
  metadata: Metadata
}

function metaFor(
  slug: string,
  title: string,
  description: string,
): Metadata {
  const url = `${base}/${slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      `mobilný detailing ${slug.replace(/-/g, " ")}`,
      `detailing ${slug.replace(/-/g, " ")}`,
      `tepovanie áut ${slug.replace(/-/g, " ")}`,
      "mobilný detailing Západné Slovensko",
      "detailing Slovensko",
    ],
    openGraph: {
      title: `${title} | Crystal Detailing`,
      description,
      url,
    },
  }
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
