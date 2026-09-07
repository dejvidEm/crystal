import type { Metadata, Viewport } from "next"
import { BookingWizard } from "@/components/booking/booking-wizard"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Rezervácia termínu",
  description: "Rezervujte si mobilný detailing v Bratislave. Vyberte službu, adresu a voľný termín.",
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

type BookingSearchParams = {
  service?: string
  vehicle?: string
  extra?: string
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<BookingSearchParams>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pb-28 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
        <BookingWizard prefill={params} />
      </main>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </div>
  )
}
