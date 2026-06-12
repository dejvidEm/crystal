import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtWien } from "@/lib/district-pages-data"

export const metadata = districtWien.metadata

export default function WienPage() {
  return <DistrictSeoPageServer data={districtWien} />
}
