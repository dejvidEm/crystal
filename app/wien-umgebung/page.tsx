import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtWienUmgebung } from "@/lib/district-pages-data"

export const metadata = districtWienUmgebung.metadata

export default function WienUmgebungPage() {
  return <DistrictSeoPageServer data={districtWienUmgebung} />
}
