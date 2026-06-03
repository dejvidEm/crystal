import { JsonLd } from "@/components/seo/json-ld"
import { buildServicePageGraphJsonLd } from "@/lib/seo-structured-data"
import type { ServicePageSlug } from "@/lib/service-pages-data"

type ServicePageLayoutShellProps = {
  slug: ServicePageSlug
  children: React.ReactNode
}

export function ServicePageLayoutShell({ slug, children }: ServicePageLayoutShellProps) {
  const graph = buildServicePageGraphJsonLd(slug)
  return (
    <>
      {graph ? <JsonLd data={graph} /> : null}
      {children}
    </>
  )
}
