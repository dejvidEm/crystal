import type { Metadata } from "next"
import { ServicePageLayoutShell } from "@/components/seo/service-page-layout-shell"
import { buildServicePageMetadata } from "@/lib/service-pages-data"

export const metadata: Metadata = buildServicePageMetadata("mobilny-detailing")

export default function MobilnyDetailingLayout({ children }: { children: React.ReactNode }) {
  return <ServicePageLayoutShell slug="mobilny-detailing">{children}</ServicePageLayoutShell>
}
