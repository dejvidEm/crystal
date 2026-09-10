"use client"

import { Navbar } from "@/components/navbar"
import { HomeBelowFold } from "@/components/home-below-fold"
import { HeroClassic } from "@/components/hero-classic"
import { HeroLead } from "@/components/hero-lead"
import { ServiceStructuredData } from "@/components/structured-data"
import { HOME_HERO_VARIANT } from "@/lib/site-config"

export default function Home() {
  const serviceAreas = [
    "Bratislava",
    "Pezinok",
    "Senec",
    "Chorvátsky Grob",
    "Malacky",
    "Senica",
    "Skalica",
    "Trnava",
    "Galanta",
    "Dunajská Streda",
    "Hainburg an der Donau",
    "Bruck an der Leitha",
    "Eisenstadt",
    "Schwechat",
    "Wien",
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ServiceStructuredData
        serviceType="Mobilný detailing áut"
        description="Prémiové mobilné detailingové služby pre luxusné vozidlá v Bratislave a okolí. Kompletná starostlivosť o exteriér a interiér vozidla."
        areas={serviceAreas}
      />
      <ServiceStructuredData
        serviceType="Tepovanie áut"
        description="Profesionálne hĺbkové čistenie a tepovanie textilných a kožených sedadiel. Odstránenie zápachov a znečistenia."
        areas={serviceAreas}
      />
      <ServiceStructuredData
        serviceType="Keramická ochrana"
        description="Aplikácia keramických povlakov na ochranu laku vozidla. Dlhodobá ochrana pred škodlivými vplyvmi."
        areas={serviceAreas}
      />

      <Navbar />

      {HOME_HERO_VARIANT === "lead" ? <HeroLead /> : <HeroClassic />}

      <HomeBelowFold />
    </div>
  )
}
