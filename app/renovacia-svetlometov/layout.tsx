import type { Metadata } from "next"
import { ServicePageLayoutShell } from "@/components/seo/service-page-layout-shell"
import { buildServicePageMetadata } from "@/lib/service-pages-data"

export const metadata: Metadata = buildServicePageMetadata("renovacia-svetlometov")

export default function RenovaciaSvetlometovLayout({ children }: { children: React.ReactNode }) {
  return <ServicePageLayoutShell slug="renovacia-svetlometov">{children}</ServicePageLayoutShell>
}
