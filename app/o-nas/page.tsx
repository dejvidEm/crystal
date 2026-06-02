"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="pt-28">
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
