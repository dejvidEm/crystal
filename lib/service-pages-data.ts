import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/seo-metadata"

export const SERVICE_PAGE_SLUGS = [
  "mobilny-detailing",
  "tepovanie",
  "renovacia-svetlometov",
] as const

export type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[number]

export type ServicePageCopy = {
  /** SEO <title> – zobrazí sa ako „{metaTitle} | Crystal Detailing“ */
  metaTitle: string
  metaDescription: string
  keywords: string[]
  h1: string
  lead: string
  highlights: string[]
  sections: { title: string; paragraphs: string[] }[]
  includesTitle: string
  includes: string[]
  ctaTitle: string
  ctaSubtitle: string
  relatedLinks: { href: string; label: string }[]
}

export const servicePagesSk: Record<ServicePageSlug, ServicePageCopy> = {
  "mobilny-detailing": {
    metaTitle: "Mobilný detailing Bratislava a okolie",
    keywords: [
      "mobilný detailing",
      "mobilný detailing Bratislava",
      "detailing auta Bratislava",
      "výjazdové čistenie auta",
      "prémiový detailing",
      "detailing Pezinok",
      "detailing Senec",
    ],
    metaDescription:
      "Prémiový mobilný detailing priamo u vás. Čistenie interiéru a exteriéru, tepovanie, ochrana laku. Crystal Detailing príde domov, do firmy alebo na parkovisko.",
    h1: "Mobilný detailing",
    lead: "Prémiová starostlivosť o auto bez cesty do servisu. Prídeme s vlastnou vodou, elektrinou a výbavou – vy riešite len termín a miesto.",
    highlights: [
      "Servis priamo u vás doma, vo firme alebo na parkovisku",
      "Balíky od rýchleho refreshu po kompletný detailing",
      "Ručná práca, prémiová chémia a individuálny prístup",
      "Bratislava, Pezinok, Senec, Záhorie a Trnavský kraj",
    ],
    sections: [
      {
        title: "Čo znamená mobilný detailing u nás",
        paragraphs: [
          "Mobilný detailing nie je len umytie auta na dvore. Ide o kompletnú starostlivosť o interiér aj exteriér s profesionálnou výbavou, ktorá príde k vám.",
          "Nemusíte čakať v rade v autoumyvárni ani strácať pol dňa v servise. Dohodnete si termín a my sa postaráme o zvyšok – pri práci, doma alebo počas víkendu.",
        ],
      },
      {
        title: "Pre koho je služba určená",
        paragraphs: [
          "Pre majiteľov áut, ktorí chcú šetriť čas, firmy s firemnými vozidlami, rodiny pred dovolenkou alebo predajom auta. Ak chcete mať vozidlo čisté, chránené a reprezentatívne bez zbytočného stresu, mobilný detailing je praktická voľba.",
        ],
      },
    ],
    includesTitle: "Čo môžete objednať",
    includes: [
      "REFRESH – pravidelný refresh interiéru",
      "INTERIÉR – hĺbkový detailing interiéru",
      "KOMPLET – interiér aj exteriér",
      "TEPOVANIE – hĺbkové čistenie textílií",
      "Doplnky: renovácia svetlometov, čistenie motorového priestoru",
    ],
    ctaTitle: "Objednajte si mobilný detailing",
    ctaSubtitle: "Pozrite si cenník balíkov alebo si rovno vypočítajte orientačnú cenu v kalkulačke.",
    relatedLinks: [
      { href: "/cennik", label: "Cenník balíkov" },
      { href: "/calc", label: "Cenová kalkulačka" },
      { href: "/lokality", label: "Oblasti pôsobnosti" },
    ],
  },
  tepovanie: {
    metaTitle: "Tepovanie auta Bratislava – mobilne u vás",
    keywords: [
      "tepovanie auta",
      "tepovanie sedačiek",
      "tepovanie auta Bratislava",
      "čistenie interiéru auta",
      "odstránenie zápachu auto",
      "mobilné tepovanie",
    ],
    metaDescription:
      "Profesionálne tepovanie sedačiek, kobercov a interiéru auta. Odstránenie zápachu a škvŕn. Mobilná služba Crystal Detailing v Bratislave a okolí.",
    h1: "Tepovanie auta",
    lead: "Hĺbkové čistenie textílií v interiéri – sedačky, koberce, podlaha a stropnica. Ideálne pri zápachu, fľakoch, deťoch, psovi alebo pred predajom vozidla.",
    highlights: [
      "Extrakčné tepovanie textilných povrchov",
      "Odstránenie zápachu a zaschnutých nečistôt",
      "Mobilne u vás – bez odvozu auta do servisu",
      "Kombinovateľné s balíkom INTERIÉR alebo KOMPLET",
    ],
    sections: [
      {
        title: "Kedy sa tepovanie oplatí",
        paragraphs: [
          "Keď v aute cítiť zatuchnutý zápach, na sedačkách sú mapy alebo fľaky, vozíte deti alebo domáce zvieratá, alebo auto dlhšie neprešlo hĺbkovým čistením.",
          "Tepovanie odstraňuje nečistoty z hĺbky textílie, nie len z povrchu. Po dokončení je dôležité nechať interiér dobre preschnúť – preto odporúčame objednať službu s dostatočným časovým predstihom.",
        ],
      },
      {
        title: "Čo tepujeme",
        paragraphs: [
          "Sedačky, koberce, podlahové rohože, stropnicu a batožinový priestor podľa stavu vozidla. Rozsah sa prispôsobí typu auta a miere znečistenia.",
        ],
      },
    ],
    includesTitle: "Balík TEPOVANIE zahŕňa",
    includes: [
      "Tepovanie sedačiek",
      "Tepovanie koberčekov a podlahy",
      "Tepovanie a čistenie stropnice",
      "Tepovanie kufra bez podlahy",
    ],
    ctaTitle: "Objednajte si tepovanie",
    ctaSubtitle: "Cenu nájdete v cenníku v balíku TEPOVANIE. Pri väčšom znečistení pošlite fotky pre presnejší odhad.",
    relatedLinks: [
      { href: "/cennik", label: "Cenník – balík TEPOVANIE" },
      { href: "/mobilny-detailing", label: "Mobilný detailing" },
      { href: "/calc", label: "Cenová kalkulačka" },
    ],
  },
  "renovacia-svetlometov": {
    metaTitle: "Renovácia svetlometov mobilne Bratislava",
    keywords: [
      "renovácia svetlometov",
      "leštenie svetlometov",
      "zažltnuté svetlomety",
      "mobilná renovácia svetlometov",
      "obnova svetlometov Bratislava",
      "úprava plastových svetlometov",
    ],
    metaDescription:
      "Zažltnuté alebo matné svetlomety? Mobilná renovácia obnoví čírosť plastu, zlepší vzhľad auta a svietivosť. 70 € za oba svetlomety, prídeme k vám.",
    h1: "Renovácia svetlometov",
    lead: "Profesionálna obnova zakalených a zažltnutých predných svetlometov priamo u vás. Bez výmeny za nové diely – výrazne lepší vzhľad a svetelný výkon pri zoxidovanom plaste.",
    highlights: [
      "Kompletná úprava oboch predných svetlometov",
      "Odstránenie oxidácie, leštenie a UV ochrana",
      "Mobilná služba – doma, vo firme alebo na parkovisku",
      "Vhodné pred STK, predajom auta alebo zimnou sezónou",
    ],
    sections: [
      {
        title: "Prečo riešiť svetlomety včas",
        paragraphs: [
          "Plastové svetlomety časom žltnú a matnejú pod vplyvom UV a poveternostných vplyvov. Auto pôsobí staršie a svetlo horšie prechádza cez povrch.",
          "Renovácia rieši vonkajší stav plastu. Ak je problém vo vypálenej parabole alebo elektroinštalácii, treba riešiť aj technickú príčinu – vopred vieme posúdiť podľa fotiek.",
        ],
      },
      {
        title: "Ako prebieha renovácia",
        paragraphs: [
          "Čistenie, maskovanie okolia, postupné brúsenie, leštenie a aplikácia ochrannej vrstvy. Výsledok je čírejší vzhľad a lepší pocit z jazdy po tme.",
        ],
      },
    ],
    includesTitle: "Súčasť služby",
    includes: [
      "Odstránenie oxidácie a zažltnutia",
      "Brúsenie svetlometov",
      "Leštenie svetlometov",
      "Nanesenie UV ochrany",
      "Cena 70 € za oba svetlomety (podľa stavu vozidla)",
    ],
    ctaTitle: "Objednajte si renováciu svetlometov",
    ctaSubtitle: "Pošlite fotku svetlometov alebo si rovno rezervujte termín.",
    relatedLinks: [
      { href: "/cennik", label: "Cenník doplnkových služieb" },
      { href: "/blog/renovacia-svetlometov-mobilne", label: "Článok o renovácii" },
      { href: "/calc", label: "Cenová kalkulačka" },
    ],
  },
}

export const servicePagesEn: Record<ServicePageSlug, ServicePageCopy> = {
  "mobilny-detailing": {
    metaTitle: "Mobile car detailing Bratislava & region",
    keywords: [
      "mobile car detailing",
      "car detailing Bratislava",
      "mobile detailing Slovakia",
      "interior car cleaning",
    ],
    metaDescription:
      "Premium mobile detailing at your location. Interior and exterior cleaning, shampooing, paint care. Crystal Detailing comes to your home or office.",
    h1: "Mobile detailing",
    lead: "Premium car care without visiting a workshop. We bring water, power, and equipment—you choose the time and place.",
    highlights: [
      "Service at home, at work, or in your parking spot",
      "Packages from quick refresh to full detail",
      "Hand finishing, premium products, personal approach",
      "Bratislava, Pezinok, Senec, Záhorie & Trnava region",
    ],
    sections: [
      {
        title: "What our mobile detailing includes",
        paragraphs: [
          "Mobile detailing is more than a quick wash. It is full interior and exterior care with professional equipment that comes to you.",
          "No queues at the car wash and no lost half-days at a garage. Book a slot and we handle the rest.",
        ],
      },
      {
        title: "Who it is for",
        paragraphs: [
          "Car owners who value time, companies with fleet vehicles, families before holidays or when selling a car. If you want a clean, protected, presentable vehicle without hassle, mobile detailing is the practical choice.",
        ],
      },
    ],
    includesTitle: "What you can book",
    includes: [
      "REFRESH – regular interior refresh",
      "INTERIOR – deep interior detail",
      "COMPLETE – interior and exterior",
      "UPHOLSTERY – deep fabric cleaning",
      "Add-ons: headlight restoration, engine bay cleaning",
    ],
    ctaTitle: "Book mobile detailing",
    ctaSubtitle: "See our price list or get an instant estimate in the calculator.",
    relatedLinks: [
      { href: "/cennik", label: "Price list" },
      { href: "/calc", label: "Price calculator" },
      { href: "/lokality", label: "Service areas" },
    ],
  },
  tepovanie: {
    metaTitle: "Car upholstery shampooing Bratislava",
    keywords: [
      "car upholstery cleaning",
      "car seat shampooing",
      "mobile car cleaning Bratislava",
      "odour removal car interior",
    ],
    metaDescription:
      "Professional seat and carpet shampooing. Odour and stain removal. Mobile Crystal Detailing service in Bratislava and surrounding areas.",
    h1: "Car upholstery cleaning",
    lead: "Deep cleaning of fabrics inside your car—seats, carpets, floor, and headliner. Ideal for odours, stains, children, pets, or before selling.",
    highlights: [
      "Extraction cleaning for textile surfaces",
      "Odour and embedded dirt removal",
      "Mobile at your location",
      "Combine with INTERIOR or COMPLETE packages",
    ],
    sections: [
      {
        title: "When shampooing pays off",
        paragraphs: [
          "When the cabin smells stale, seats have marks or stains, you travel with children or pets, or the car has not had a deep clean for a long time.",
          "Shampooing removes dirt from inside the fabric, not just the surface. Allow time for thorough drying after the service.",
        ],
      },
      {
        title: "What we clean",
        paragraphs: [
          "Seats, carpets, floor mats, headliner, and boot area depending on vehicle condition and your needs.",
        ],
      },
    ],
    includesTitle: "UPHOLSTERY package includes",
    includes: [
      "Seat shampooing",
      "Carpet and floor shampooing",
      "Headliner cleaning",
      "Boot cleaning (without floor mat)",
    ],
    ctaTitle: "Book upholstery cleaning",
    ctaSubtitle: "See the UPHOLSTERY package on our price list. Send photos for heavily soiled vehicles.",
    relatedLinks: [
      { href: "/cennik", label: "Price list – UPHOLSTERY" },
      { href: "/mobilny-detailing", label: "Mobile detailing" },
      { href: "/calc", label: "Price calculator" },
    ],
  },
  "renovacia-svetlometov": {
    metaTitle: "Mobile headlight restoration Bratislava",
    keywords: [
      "headlight restoration",
      "headlight polishing",
      "yellowed headlights",
      "mobile headlight restoration",
    ],
    metaDescription:
      "Yellowed or hazy headlights? Mobile restoration restores clarity and appearance. €70 for both lights—we come to you.",
    h1: "Headlight restoration",
    lead: "Professional restoration of cloudy or yellowed front headlights at your location. Often avoids costly new units when the issue is oxidised outer plastic.",
    highlights: [
      "Both front headlights treated",
      "Oxidation removal, polish, UV protection",
      "Mobile service at your chosen address",
      "Great before inspection, sale, or winter driving",
    ],
    sections: [
      {
        title: "Why restore headlights in time",
        paragraphs: [
          "Plastic lenses yellow and haze over time. The car looks older and light passes through less cleanly.",
          "Restoration addresses the outer plastic. Burnt reflectors or wiring issues need separate technical repair—we can advise from photos.",
        ],
      },
      {
        title: "How restoration works",
        paragraphs: [
          "Cleaning, masking, gradual sanding, polishing, and a protective coating. The result is clearer lenses and better night driving comfort.",
        ],
      },
    ],
    includesTitle: "Service includes",
    includes: [
      "Oxidation and yellowing removal",
      "Headlight sanding",
      "Headlight polishing",
      "UV protection applied",
      "€70 for both headlights (depending on condition)",
    ],
    ctaTitle: "Book headlight restoration",
    ctaSubtitle: "Send a photo of your headlights or reserve a slot directly.",
    relatedLinks: [
      { href: "/cennik", label: "Add-on services price list" },
      { href: "/blog/renovacia-svetlometov-mobilne", label: "Restoration article" },
      { href: "/calc", label: "Price calculator" },
    ],
  },
}

export function getServicePageCopy(slug: string, lang: "sk" | "en"): ServicePageCopy | undefined {
  if (!SERVICE_PAGE_SLUGS.includes(slug as ServicePageSlug)) return undefined
  const key = slug as ServicePageSlug
  return lang === "en" ? servicePagesEn[key] : servicePagesSk[key]
}

export function buildServicePageMetadata(slug: ServicePageSlug): Metadata {
  const copy = servicePagesSk[slug]
  return buildPageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    pathname: `/${slug}`,
    keywords: copy.keywords,
    socialTitle: copy.metaTitle,
  })
}

export const cennikMetadataSk: Metadata = buildPageMetadata({
  title: "Cenník mobilného detailingu Bratislava",
  description:
    "Cenník mobilného detailingu v Bratislave: balíky REFRESH, INTERIÉR, KOMPLET, TEPOVANIE a doplnkové služby. Ceny podľa veľkosti vozidla.",
  pathname: "/cennik",
  keywords: [
    "cenník detailing",
    "cenník mobilný detailing",
    "cenník čistenia auta",
    "detailing cenník Bratislava",
    "tepovanie cena",
    "renovácia svetlometov cena",
  ],
  socialTitle: "Cenník služieb Crystal Detailing",
})
