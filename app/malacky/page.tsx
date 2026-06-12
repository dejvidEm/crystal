import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtMalacky } from "@/lib/district-pages-data"

export const metadata = districtMalacky.metadata

export default function MalackyDistrictPage() {
  return <DistrictSeoPageServer data={districtMalacky} />
}
