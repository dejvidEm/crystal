import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtSkalica } from "@/lib/district-pages-data"

export const metadata = districtSkalica.metadata

export default function SkalicaDistrictPage() {
  return <DistrictSeoPageServer data={districtSkalica} />
}
