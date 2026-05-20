import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtDunajskaStreda } from "@/lib/district-pages-data"

export const metadata = districtDunajskaStreda.metadata

export default function DunajskaStredaDistrictPage() {
  return <DistrictSeoPage data={districtDunajskaStreda} />
}
