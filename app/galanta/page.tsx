import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtGalanta } from "@/lib/district-pages-data"

export const metadata = districtGalanta.metadata

export default function GalantaDistrictPage() {
  return <DistrictSeoPageServer data={districtGalanta} />
}
