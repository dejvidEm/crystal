import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtEisenstadt } from "@/lib/district-pages-data"

export const metadata = districtEisenstadt.metadata

export default function EisenstadtPage() {
  return <DistrictSeoPage data={districtEisenstadt} />
}
