import type { Metadata } from "next"
import { ServicePageLayoutShell } from "@/components/seo/service-page-layout-shell"
import { buildServicePageMetadata } from "@/lib/service-pages-data"

export const metadata: Metadata = buildServicePageMetadata("tepovanie")

export default function TepovanieLayout({ children }: { children: React.ReactNode }) {
  return <ServicePageLayoutShell slug="tepovanie">{children}</ServicePageLayoutShell>
}
