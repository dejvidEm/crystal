import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroLead } from "@/components/hero-lead"
import { SiteVerticalProvider } from "@/components/site-vertical-context"
import { ServiceStructuredData } from "@/components/structured-data"

const HomeBelowFold = dynamic(() =>
  import("@/components/home-below-fold").then((mod) => mod.HomeBelowFold),
)

export default function TepovanieDomacnostiPage() {
  return (
    <SiteVerticalProvider value="home">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <ServiceStructuredData
          serviceType="Tepovanie domácností"
          description="Hĺbkové tepovanie sedačiek, kobercov, matracov a kresiel priamo u vás doma v Bratislave a okolí. Bez odvozu nábytku."
          areas={[
            "Bratislava",
            "Pezinok",
            "Senec",
            "Chorvátsky Grob",
            "Malacky",
            "Trnava",
            "Hainburg an der Donau",
            "Wien",
          ]}
        />
        <Navbar />
        <HeroLead />
        <HomeBelowFold />
      </div>
    </SiteVerticalProvider>
  )
}
