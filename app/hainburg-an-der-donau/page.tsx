import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtHainburg } from "@/lib/district-pages-data"

export const metadata = districtHainburg.metadata

export default function HainburgPage() {
  return <DistrictSeoPage data={districtHainburg} />
}
