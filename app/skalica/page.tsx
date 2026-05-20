import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtSkalica } from "@/lib/district-pages-data"

export const metadata = districtSkalica.metadata

export default function SkalicaDistrictPage() {
  return <DistrictSeoPage data={districtSkalica} />
}
