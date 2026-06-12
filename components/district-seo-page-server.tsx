import { DistrictSeoPage } from "@/components/district-seo-page"
import type { DistrictPageDefinition } from "@/lib/district-page-types"
import { toDistrictPageContent } from "@/lib/district-page-types"

/** Server wrapper – odstráni Next.js metadata pred odovzdaním do client komponenty. */
export function DistrictSeoPageServer({ data }: { data: DistrictPageDefinition }) {
  return <DistrictSeoPage data={toDistrictPageContent(data)} />
}
