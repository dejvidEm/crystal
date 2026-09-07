import type { Metadata } from "next"
import { BookingWizard } from "@/components/booking/booking-wizard"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Rezervácia termínu",
  description: "Rezervujte si mobilný detailing v Bratislave. Vyberte službu, adresu a voľný termín.",
  robots: { index: false, follow: false },
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
      <main className="container mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-6">
        <BookingWizard prefill={params} />
      </main>
      <Footer />
    </div>
  )
}
