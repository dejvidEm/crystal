import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cenová kalkulačka - Získajte okamžitú cenovú ponuku',
  description:
    'Použite našu online kalkulačku na získanie okamžitej cenovej ponuky pre mobilný detailing. Vyberte typ vozidla, službu a lokáciu.',
  alternates: {
    canonical: 'https://crystaldetailing.sk/calc',
  },
  openGraph: {
    title: 'Cenová kalkulačka - Získajte okamžitú cenovú ponuku | Crystal Detailing',
    description:
      'Použite našu online kalkulačku na získanie okamžitej cenovej ponuky pre mobilný detailing.',
    url: 'https://crystaldetailing.sk/calc',
  },
}

export default function CalcLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}


