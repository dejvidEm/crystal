import type { Metadata } from "next"
import { LocationsHubPageClient } from "@/components/locations/locations-hub-page-client"
import { metaDescription } from "@/lib/seo-meta"

export const metadata: Metadata = {
  title: "Lokality | Mobilný detailing Bratislava, Záhorie, Trnavský kraj a Rakúsko pri Viedni",
  description: metaDescription(
    "Mobilný detailing v Bratislave, Pezinoku, Senci, na Záhorí, v Trnavskom kraji a v Rakúsku – Hainburg, Bruck, Eisenstadt, Wien Umgebung až po Viedeň.",
  ),
  keywords: [
    "mobilný detailing Bratislava",
    "mobilný detailing okres Malacky",
    "mobilný detailing Senica",
    "mobilný detailing Skalica Holíč",
    "mobilný detailing Trnava",
    "mobilný detailing Galanta",
    "mobilný detailing Dunajská Streda",
    "mobilný detailing Záhorie",
    "mobilný detailing Hainburg an der Donau",
    "mobilný detailing Wien",
    "mobilný detailing Rakúsko",
    "mobile Autopflege Wien",
    "Auto detailing Schwechat",
    "tepovanie áut Trnava",
    "detailing Západné Slovensko",
  ],
  alternates: {
    canonical: "https://crystaldetailing.sk/lokality",
  },
  openGraph: {
    title:
      "Lokality | Mobilný detailing Bratislava, Záhorie, Trnavský kraj a Rakúsko | Crystal Detailing",
    description:
      "Mobilný detailing na Záhorí, v Trnavskom kraji a v Rakúsku pri Bratislave — Hainburg, Bruck, Eisenstadt, Wien Umgebung a Viedeň. Bratislava, Pezinok, Senec.",
    url: "https://crystaldetailing.sk/lokality",
  },
}

export default function LokalityPage() {
  return <LocationsHubPageClient />
}
