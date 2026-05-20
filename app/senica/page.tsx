import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtSenica } from "@/lib/district-pages-data"

export const metadata = districtSenica.metadata

export default function SenicaDistrictPage() {
  return <DistrictSeoPage data={districtSenica} />
}
