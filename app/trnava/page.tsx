import { DistrictSeoPage } from "@/components/district-seo-page"
import { districtTrnava } from "@/lib/district-pages-data"

export const metadata = districtTrnava.metadata

export default function TrnavaDistrictPage() {
  return <DistrictSeoPage data={districtTrnava} />
}
