import { DistrictSeoPageServer } from "@/components/district-seo-page-server"
import { districtTrnava } from "@/lib/district-pages-data"

export const metadata = districtTrnava.metadata

export default function TrnavaDistrictPage() {
  return <DistrictSeoPageServer data={districtTrnava} />
}
