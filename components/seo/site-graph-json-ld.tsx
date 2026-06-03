import { JsonLd } from "@/components/seo/json-ld"
import { buildSiteGraphJsonLd } from "@/lib/seo-structured-data"

export function SiteGraphJsonLd() {
  return <JsonLd data={buildSiteGraphJsonLd()} />
}
