import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtHainburg } from "@/lib/district-pages-data"

export const metadata = districtHainburg.metadata

export default function HainburgPage() {
  return <DistrictSeoPageServer data={districtHainburg} />
}
