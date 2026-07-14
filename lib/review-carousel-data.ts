import type { ContentLocale } from "@/lib/i18n/locale"
import { toContentLocale } from "@/lib/i18n/locale"

export type CarouselReview = {
  id: number
  name: string
  avatar: string
  rating: number
  review: string
  car: string
  location: string
}

type ReviewEntry = Omit<CarouselReview, "name">

const REVIEW_NAMES: Record<number, string> = {
  1: "Tomáš M.",
  2: "Peter K.",
  3: "Michal R.",
  4: "Lucia S.",
  5: "Jakub V.",
  6: "Marek D.",
  7: "Andrea H.",
}

function withReviewNames(reviews: ReviewEntry[]): CarouselReview[] {
  return reviews.map((review) => ({
    ...review,
    name: REVIEW_NAMES[review.id] ?? "Zákazník",
  }))
}

const reviewsEn: ReviewEntry[] = [
  {
    id: 1,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review: "Maximum satisfaction. Great service and the car looks like new.",
    car: "Customer review",
    location: "Bratislava region",
  },
  {
    id: 2,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Great service for a fair price. The guy arrived, I unlocked the car and he took care of the rest. When I came to check, the car was spotless inside and out. We also had a nice chat. I recommend them.",
    car: "Customer review",
    location: "Bratislava region",
  },
  {
    id: 3,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Extremely professional approach and detailing—they arrived exactly on time as agreed while I was at the gym and fully cleaned the interior like new. The price is fair, comparable to car washes in malls. Top quality, I recommend to everyone.",
    car: "Customer review",
    location: "Bratislava region",
  },
  {
    id: 4,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Great service—I booked a clean while I was at a lecture at school; I just unlocked the car and after the lecture I came to check and lock it. Everything was perfect—I had no idea my car could look like new. Fully satisfied, I will definitely book again.",
    car: "Customer review",
    location: "Bratislava region",
  },
  {
    id: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Absolute satisfaction. I drive my Tesla non-stop and regular hand car washes never get it this clean. I'm still skeptical of detailing companies because of bad experiences (things often get skipped), but the guys from Crystal Detailing didn't miss a thing. Big praise—I loved how simple the whole process was, I could work while they worked and I came back to a clean car :)",
    car: "Customer review",
    location: "Bratislava region",
  },
  {
    id: 6,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Brilliant idea—the guys come to you anywhere in the Bratislava region, no hassle, and quickly wash interior and exterior so the car looks like new. Professionalism on point, fair price. I recommend.",
    car: "Customer review",
    location: "Bratislava region",
  },
  {
    id: 7,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Professional approach and highly precise work. The interior and exterior look completely like new. Fair price and a friendly vibe from the company owner. The first mobile car detailing in Bratislava. Strongly recommend.",
    car: "Customer review",
    location: "Bratislava",
  },
]

const reviewsSk: ReviewEntry[] = [
  {
    id: 1,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review: "Maximálni spokojnosť. Skvelá služba a auto vyzerá jako nové.",
    car: "Recenzia zákazníka",
    location: "Bratislavský kraj",
  },
  {
    id: 2,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Super služba za adekvátnu cenu. Chalan prišiel, otvoril som auto a o zvyšok sa postaral. Keď som to prišiel skontrolovať, auto bolo umyté do detailu z vonku aj z vnútra. Zároveň sme prehodili aj zopár dobrých slov. Odporúčam.",
    car: "Recenzia zákazníka",
    location: "Bratislavský kraj",
  },
  {
    id: 3,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Extrémne profesionálny prístup aj detailing, presne na čas ako bolo dohodnuté došli kým som bol vo fitku a vyčistili kompletne interiér ako nový. Cena férová porovnateľná s umyvárkami v nivách alebo eurovei. Extrémna kvalita, odporúčam všetkým.",
    car: "Recenzia zákazníka",
    location: "Bratislavský kraj",
  },
  {
    id: 4,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Super služba, objednal som si čistenie kým som bol v škole na prednáške, iba som odomkol auto a po prednáške prišiel skontrolovať a zamknúť. Všetko tip top ani som nevedel že moje auto môže vyzerať ako nové. Úplná spokojnosť, určite sa objednám znova.",
    car: "Recenzia zákazníka",
    location: "Bratislavský kraj",
  },
  {
    id: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Absolútna spokojnosť. S teslou jazdím nonstop a bežné ručné umyvárky mi nikdy auto takto nevyčistia. Voči detailingovým firmám som stále skeptický kvôli zlým skúsenostiam (často sa niečo vynechá) ale chalpci z crystal detailing nezabudli na nič. Veľká pochvala a veľmi sa mi páčilo že proces bol úplne jednoduchý, mohol som počas toho pracovať a vrátil som sa k čistému autu :)",
    car: "Recenzia zákazníka",
    location: "Bratislavský kraj",
  },
  {
    id: 6,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Geniálny nápad, chalani dojdu za vami hocikde v BA kraji, bez problémov rýchlo umyjú interier exterier že auto vyzerá jak nové. Profesionalita na úrovni, cena fér. Odporúčam.",
    car: "Recenzia zákazníka",
    location: "Bratislavský kraj",
  },
  {
    id: 7,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Profesionálny prístup a vysoko precízna robota. Interiér a exteriér auta úplne ako nový. Férová cena a priateľská atmosféra od majiteľa firmy. Prvý mobilný auto-detailing v BA. Veľmi odporúčam.",
    car: "Recenzia zákazníka",
    location: "Bratislava",
  },
]

const reviewsDe: ReviewEntry[] = [
  {
    id: 1,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review: "Maximale Zufriedenheit. Toller Service und das Auto sieht wie neu aus.",
    car: "Kundenbewertung",
    location: "Region Bratislava",
  },
  {
    id: 2,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Super Service für einen fairen Preis. Der Techniker kam, ich habe das Auto aufgeschlossen und er hat sich um den Rest gekümmert. Als ich nachgesehen habe, war das Auto innen und außen makellos. Wir haben uns auch nett unterhalten. Sehr empfehlenswert.",
    car: "Kundenbewertung",
    location: "Region Bratislava",
  },
  {
    id: 3,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Extrem professioneller Ansatz und Detailing – sie kamen pünktlich wie vereinbart, während ich im Fitnessstudio war, und haben den Innenraum komplett wie neu gereinigt. Der Preis ist fair, vergleichbar mit Waschanlagen in Einkaufszentren. Top Qualität, empfehle ich allen.",
    car: "Kundenbewertung",
    location: "Region Bratislava",
  },
  {
    id: 4,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Toller Service – ich habe eine Reinigung gebucht, während ich in der Vorlesung war; ich habe nur das Auto aufgeschlossen und nach der Vorlesung kontrolliert und abgeschlossen. Alles perfekt – ich hätte nicht gedacht, dass mein Auto so aussehen kann. Voll zufrieden, ich werde definitiv wieder buchen.",
    car: "Kundenbewertung",
    location: "Region Bratislava",
  },
  {
    id: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Absolute Zufriedenheit. Ich fahre meinen Tesla nonstop und normale Handwaschanlagen bekommen das Auto nie so sauber. Gegenüber Detailing-Firmen bin ich skeptisch wegen schlechter Erfahrungen (oft wird etwas ausgelassen), aber die Jungs von Crystal Detailing haben nichts vergessen. Großes Lob – der Ablauf war super einfach, ich konnte arbeiten und kam zu einem sauberen Auto zurück :)",
    car: "Kundenbewertung",
    location: "Region Bratislava",
  },
  {
    id: 6,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Geniale Idee – die Jungs kommen zu Ihnen überall in der Region Bratislava, unkompliziert und schnell Innen- und Außenbereich, sodass das Auto wie neu aussieht. Professionalität top, fairer Preis. Empfehlenswert.",
    car: "Kundenbewertung",
    location: "Region Bratislava",
  },
  {
    id: 7,
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    review:
      "Professioneller Ansatz und sehr präzise Arbeit. Innenraum und Außenbereich sehen komplett wie neu aus. Fairer Preis und freundliche Atmosphäre vom Firmeninhaber. Das erste mobile Auto-Detailing in Bratislava. Sehr empfehlenswert.",
    car: "Kundenbewertung",
    location: "Bratislava",
  },
]

const REVIEWS_BY_LOCALE: Record<ContentLocale, ReviewEntry[]> = {
  sk: reviewsSk,
  en: reviewsEn,
  de: reviewsDe,
}

export function getCarouselReviews(language: ContentLocale): CarouselReview[] {
  const locale = toContentLocale(language)
  const entries = REVIEWS_BY_LOCALE[locale] ?? REVIEWS_BY_LOCALE.sk ?? []
  return withReviewNames(entries)
}
