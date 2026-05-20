import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtMalacky } from "@/lib/district-pages-data"

export const metadata = districtMalacky.metadata

export default function MalackyDistrictPage() {
  return <DistrictSeoPage data={districtMalacky} />
}
