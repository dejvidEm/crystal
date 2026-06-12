import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface LegalPageProps {
  title: string
  lastUpdated?: string
  lastUpdatedLabel?: string
  children: ReactNode
}

export function LegalPage({ title, lastUpdated, lastUpdatedLabel, children }: LegalPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20 md:pt-32">
        <article className="container mx-auto max-w-3xl px-4">
          <header className="mb-10">
            <h1 className="text-3xl font-bold sm:text-4xl text-gradient">{title}</h1>
            <div className="mt-4 h-1 w-24 bg-primary"></div>
            {lastUpdated && (
              <p className="mt-4 text-sm text-zinc-500">
                {lastUpdatedLabel ?? "Posledná aktualizácia:"} {lastUpdated}
              </p>
            )}
          </header>
          <div className="space-y-8 leading-relaxed text-zinc-300 [&_a]:text-primary [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:mb-1 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
