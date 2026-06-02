import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "O nás | Crystal Detailing",
  description:
    "Crystal Detailing — prvá luxusná mobilná detailingová služba na Slovensku. Prémiová starostlivosť o vozidlá priamo u vás doma alebo v kancelárii.",
  alternates: {
    canonical: "https://crystaldetailing.sk/o-nas",
  },
  openGraph: {
    title: "O nás | Crystal Detailing",
    description:
      "Crystal Detailing — prvá luxusná mobilná detailingová služba na Slovensku. Prémiová starostlivosť o vozidlá priamo u vás.",
    url: "https://crystaldetailing.sk/o-nas",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
