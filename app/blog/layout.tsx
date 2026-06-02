import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Crystal Detailing",
  description:
    "Tipy na detailing, tepovanie, ochranu laku a mobilný detailing v Bratislave a okolí. Praktické rady od Crystal Detailing.",
  alternates: {
    canonical: "https://crystaldetailing.sk/blog",
  },
  openGraph: {
    title: "Blog | Crystal Detailing",
    description:
      "Tipy na detailing, tepovanie, ochranu laku a mobilný detailing. Praktické rady od Crystal Detailing.",
    url: "https://crystaldetailing.sk/blog",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
