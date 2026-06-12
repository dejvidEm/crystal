import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtSenica } from "@/lib/district-pages-data"

export const metadata = districtSenica.metadata

export default function SenicaDistrictPage() {
  return <DistrictSeoPageServer data={districtSenica} />
}
