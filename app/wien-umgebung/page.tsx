import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtWienUmgebung } from "@/lib/district-pages-data"

export const metadata = districtWienUmgebung.metadata

export default function WienUmgebungPage() {
  return <DistrictSeoPage data={districtWienUmgebung} />
}
