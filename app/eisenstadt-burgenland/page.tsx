import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtEisenstadt } from "@/lib/district-pages-data"

export const metadata = districtEisenstadt.metadata

export default function EisenstadtPage() {
  return <DistrictSeoPageServer data={districtEisenstadt} />
}
