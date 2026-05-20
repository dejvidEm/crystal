import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtGalanta } from "@/lib/district-pages-data"

export const metadata = districtGalanta.metadata

export default function GalantaDistrictPage() {
  return <DistrictSeoPage data={districtGalanta} />
}
