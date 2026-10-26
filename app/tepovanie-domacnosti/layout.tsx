import type { Metadata } from "next"
import { ServicePageLayoutShell } from "@/components/seo/service-page-layout-shell"
import { buildServicePageMetadata } from "@/lib/service-pages-data"

export const metadata: Metadata = buildServicePageMetadata("tepovanie-domacnosti")

export default function TepovanieDomacnostiLayout({ children }: { children: React.ReactNode }) {
  return <ServicePageLayoutShell slug="tepovanie-domacnosti">{children}</ServicePageLayoutShell>
}
