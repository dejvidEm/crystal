import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtBruck } from "@/lib/district-pages-data"

export const metadata = districtBruck.metadata

export default function BruckPage() {
  return <DistrictSeoPage data={districtBruck} />
}
