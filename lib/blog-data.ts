/**
 * Blog – články, kategórie a pomocné funkcie.
 * Nový článok: pridaj záznam do `blogPosts` (zoradené od najnovšieho).
 */

export type BlogCategoryId =
  | "detailing-tips"
  | "tepovanie"
  | "ochrana-laku"
  | "mobilny-detailing"

export type BlogCategory = {
  id: BlogCategoryId
  label: { sk: string; en: string }
}

export const blogCategories: BlogCategory[] = [
  { id: "detailing-tips", label: { sk: "Detailing tipy", en: "Detailing Tips" } },
  { id: "tepovanie", label: { sk: "Tepovanie", en: "Upholstery Cleaning" } },
  { id: "ochrana-laku", label: { sk: "Ochrana laku", en: "Paint Protection" } },
  { id: "mobilny-detailing", label: { sk: "Mobilný detailing", en: "Mobile Detailing" } },
]

export type BlogContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }

export type BlogPost = {
  slug: string
  category: BlogCategoryId
  publishedAt: string
  image: string
  imageAlt: { sk: string; en: string }
  title: { sk: string; en: string }
  excerpt: { sk: string; en: string }
  body: { sk: BlogContentBlock[]; en: BlogContentBlock[] }
}

export const blogPosts: BlogPost[] = [
  {
    slug: "preco-mobilny-detailing-bratislava",
    category: "mobilny-detailing",
    publishedAt: "2026-05-15",
    image: "/images/van-with-logo.png",
    imageAlt: {
      sk: "Mobilná detailingová jednotka Crystal Detailing",
      en: "Crystal Detailing mobile unit",
    },
    title: {
      sk: "Prečo sa oplatí mobilný detailing v Bratislave",
      en: "Why mobile detailing in Bratislava is worth it",
    },
    excerpt: {
      sk: "Ušetríte čas, vyhnete sa rade v umyvárke a získate prémiový výsledok priamo na vašej adrese.",
      en: "Save time, skip the car wash queue, and get premium results right at your address.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Mobilný detailing nie je len „umyvanie auta na dvore“. Ide o kompletnú starostlivosť o interiér aj exteriér s profesionálnou výbavou, ktorá príde k vám – domov, do firmy alebo na parkovisko.",
        },
        {
          type: "h2",
          text: "Čo získate oproti klasickej umyvárke",
        },
        {
          type: "ul",
          items: [
            "Žiadne čakanie v rade ani strácanie pol dňa v servise",
            "Individuálny prístup podľa typu vozidla a stavu znečistenia",
            "Prémiové prípravky šetrné k laku, koži aj textíliám",
            "Možnosť kombinovať služby – od refresh balíka po tepovanie",
          ],
        },
        {
          type: "p",
          text: "V Bratislave a okolí je čas často dôležitejší než pár eur úspory. Mobilný detailing vám umožní riešiť auto popri práci alebo domácich povinnostiach – my prídeme v dohodnutý termín a o všetko sa postaráme.",
        },
        {
          type: "h2",
          text: "Pre koho je služba ideálna",
        },
        {
          type: "p",
          text: "Pre majiteľov firemných áut, rodiny s deťmi (časté špinavé interiéry), predajcov vozidiel pred odovzdaním kupujúcemu aj pre ľudí, ktorí chcú mať auto vo vizuálne aj hygienicky čistom stave bez starostí s dopravou do servisu.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Mobile detailing is not just “washing a car in the driveway.” It is full interior and exterior care with professional equipment that comes to you—home, office, or parking lot.",
        },
        {
          type: "h2",
          text: "What you gain vs. a classic car wash",
        },
        {
          type: "ul",
          items: [
            "No waiting in line or losing half a day at a service",
            "Individual approach based on vehicle type and soiling",
            "Premium products gentle on paint, leather, and textiles",
            "Combine services—from a refresh package to deep cleaning",
          ],
        },
        {
          type: "p",
          text: "In Bratislava and surrounding areas, time is often more valuable than saving a few euros. Mobile detailing lets you handle your car around work or family—we arrive at the agreed time and take care of everything.",
        },
        {
          type: "h2",
          text: "Who it is ideal for",
        },
        {
          type: "p",
          text: "Company car owners, families with kids (messy interiors), sellers preparing a handover, and anyone who wants their car visually and hygienically clean without driving to a service.",
        },
      ],
    },
  },
  {
    slug: "tepovanie-sedaciek-kedy-a-prečo",
    category: "tepovanie",
    publishedAt: "2026-04-28",
    image: "/images/porsche.jpg",
    imageAlt: {
      sk: "Čistý interiér vozidla po tepovaní",
      en: "Clean car interior after upholstery cleaning",
    },
    title: {
      sk: "Tepovanie sedačiek: kedy ho potrebujete a čo od neho čakať",
      en: "Seat shampooing: when you need it and what to expect",
    },
    excerpt: {
      sk: "Zápach, škvrny alebo alergie? Tepovanie hĺbkovo odstráni nečistoty, ktoré bežné vysávanie nezvládne.",
      en: "Odour, stains, or allergies? Deep cleaning removes dirt regular vacuuming cannot handle.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Bežné vysávanie odstráni prach a hrubé nečistoty zo povrchu. Tepovanie (extrakčné čistenie) pracuje hlbšie – do vlákien sedačiek, koberčekov a textilných častí dverí.",
        },
        {
          type: "h2",
          text: "Signály, že je čas na tepovanie",
        },
        {
          type: "ul",
          items: [
            "Pretrvávajúci zápach (tabak, zvieratá, vlhkosť)",
            "Viditeľné mapy alebo škvrny na sedadlách",
            "Alergické reakcie v aute",
            "Predaj vozidla – interiér musí pôsobiť ako nový",
          ],
        },
        {
          type: "p",
          text: "Pri mobilnom servise prídeme s extraktorom a vhodnými prípravkami priamo k vám. Čas sušenia závisí od materiálu a sezóny; v lete schnú sedačky rýchlejšie, v zime odporúčame rezervovať termín s dostatočným časom na vysušenie.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Regular vacuuming removes surface dust and coarse dirt. Shampooing (extraction cleaning) goes deeper—into seat fibres, carpets, and textile door panels.",
        },
        {
          type: "h2",
          text: "Signs it is time for a deep clean",
        },
        {
          type: "ul",
          items: [
            "Persistent odour (smoke, pets, moisture)",
            "Visible marks or stains on seats",
            "Allergic reactions in the car",
            "Selling the vehicle—the interior must feel new",
          ],
        },
        {
          type: "p",
          text: "With our mobile service we bring an extractor and suitable products to you. Drying time depends on material and season; in summer seats dry faster, in winter we recommend booking with enough time to dry.",
        },
      ],
    },
  },
  {
    slug: "keramicka-ochrana-vs-vosk",
    category: "ochrana-laku",
    publishedAt: "2026-04-10",
    image: "/images/luxury-car.png",
    imageAlt: {
      sk: "Lesklý lak luxusného vozidla",
      en: "Glossy paint on a luxury car",
    },
    title: {
      sk: "Keramická ochrana vs. vosk: čo sa oplatí pre váš lak",
      en: "Ceramic coating vs. wax: what pays off for your paint",
    },
    excerpt: {
      sk: "Obe riešenia dodajú lesk, ale líšia sa výdržou, údržbou a cenou. Porovnanie pre bežné používanie aj prémiové autá.",
      en: "Both add gloss, but differ in durability, maintenance, and price. A comparison for daily drivers and premium cars.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Vosk je tradičná ochrana s výdržou typicky 1–3 mesiace podľa kvality produktu a umývania. Keramická ochrana vytvára tvrdšiu vrstvu s výrazne dlhšou životnosťou a lepšou odolnosťou voči chemikáliám a UV.",
        },
        {
          type: "h2",
          text: "Kedy zvoliť vosk",
        },
        {
          type: "p",
          text: "Ak chcete rýchly vizuálny efekt pred sezónou alebo udalosťou a nechcete investovať do dlhodobej ochrany. Vhodné aj ako doplnok po korekcii laku.",
        },
        {
          type: "h2",
          text: "Kedy má zmysel keramika",
        },
        {
          type: "p",
          text: "Pre nové alebo čerstvo korigované laky, vozidlá vystavené slnku alebo nečistotám z cesty a pre majiteľov, ktorí chcú znížiť frekvenciu intenzívnych umývaní. Aplikácia vyžaduje dôkladnú prípravu povrchu – ideálne po profesionálnom umytí a dekontaminácii.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Wax is a traditional protection lasting roughly 1–3 months depending on product quality and washing. Ceramic coating forms a harder layer with much longer life and better resistance to chemicals and UV.",
        },
        {
          type: "h2",
          text: "When to choose wax",
        },
        {
          type: "p",
          text: "When you want a quick visual boost before a season or event without investing in long-term protection. Also suitable after paint correction.",
        },
        {
          type: "h2",
          text: "When ceramic makes sense",
        },
        {
          type: "p",
          text: "For new or freshly corrected paint, vehicles exposed to sun and road grime, and owners who want to reduce how often they need intensive washing. Application requires thorough surface prep—ideally after professional wash and decontamination.",
        },
      ],
    },
  },
  {
    slug: "renovacia-svetlometov-vysledok",
    category: "detailing-tips",
    publishedAt: "2026-03-22",
    image: "/images/headlight-renewal-before-after.png",
    imageAlt: {
      sk: "Pred a po renovácii svetlometov",
      en: "Headlights before and after restoration",
    },
    title: {
      sk: "Renovácia svetlometov: kedy nestačí bežné umývanie",
      en: "Headlight restoration: when a regular wash is not enough",
    },
    excerpt: {
      sk: "Zažltnuté svetlomety zhoršujú svietivosť aj vzhľad auta. Renovácia ich vráti do takmer nového stavu.",
      en: "Yellowed headlights reduce visibility and hurt your car’s look. Restoration brings them back to near-new.",
    },
    body: {
      sk: [
        {
          type: "p",
          text: "Plastové svetlomety časom oxidujú pod vplyvom UV a poveternostných vplyvov. Výsledkom je matný, žltý povrch a slabšie osvetlenie vozovky – čo je bezpečnostný aj estetický problém.",
        },
        {
          type: "h2",
          text: "Čo zahŕňa profesionálna renovácia",
        },
        {
          type: "ul",
          items: [
            "Odstránenie oxidácie brúsením v niekoľkých stupňoch",
            "Leštenie pre obnovenie priehľadnosti",
            "Aplikácia UV ochrany, aby sa efekt dlhšie udržal",
          ],
        },
        {
          type: "p",
          text: "Výsledok je citeľný hneď po službe. Pri mobilnom servise renováciu vieme urobiť u vás – stačí suché, tienené miesto a dohodnutý čas v našom online rezervačnom systéme.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Plastic headlights oxidise over time from UV and weather. The result is a dull, yellow surface and weaker road lighting—a safety and aesthetic issue.",
        },
        {
          type: "h2",
          text: "What professional restoration includes",
        },
        {
          type: "ul",
          items: [
            "Removing oxidation with multi-step sanding",
            "Polishing to restore clarity",
            "UV protection so the result lasts longer",
          ],
        },
        {
          type: "p",
          text: "The difference is visible immediately. With our mobile service we can do it at your location—just a dry, shaded spot and a booked slot in our online system.",
        },
      ],
    },
  },
]

const WORDS_PER_MINUTE = 200

function blocksToPlainText(blocks: BlogContentBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === "ul") return b.items.join(" ")
      return b.text
    })
    .join(" ")
}

export function getReadingTimeMinutes(blocks: BlogContentBlock[]): number {
  const words = blocksToPlainText(blocks).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function getCategoryById(id: BlogCategoryId): BlogCategory | undefined {
  return blogCategories.find((c) => c.id === id)
}

export function getCategoryLabel(id: BlogCategoryId, lang: "sk" | "en"): string {
  return getCategoryById(id)?.label[lang] ?? id
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getLatestPosts(limit: number): BlogPost[] {
  return getAllPosts().slice(0, limit)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: BlogCategoryId | null): BlogPost[] {
  const sorted = getAllPosts()
  if (!category) return sorted
  return sorted.filter((p) => p.category === category)
}

export function formatBlogDate(isoDate: string, lang: "sk" | "en"): string {
  const date = new Date(isoDate + "T12:00:00")
  return date.toLocaleDateString(lang === "sk" ? "sk-SK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
