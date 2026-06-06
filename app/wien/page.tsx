import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtWien } from "@/lib/district-pages-data"

export const metadata = districtWien.metadata

export default function WienPage() {
  return <DistrictSeoPage data={districtWien} />
}
