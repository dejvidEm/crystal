import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtDunajskaStreda } from "@/lib/district-pages-data"

export const metadata = districtDunajskaStreda.metadata

export default function DunajskaStredaDistrictPage() {
  return <DistrictSeoPageServer data={districtDunajskaStreda} />
}
