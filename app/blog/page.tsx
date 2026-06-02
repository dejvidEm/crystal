"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogListing } from "@/components/blog/blog-listing"
import { useLanguage } from "@/lib/i18n/language-context"

export default function BlogPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20 md:pt-32">
        <div className="container mx-auto px-4">
          <header className="mb-12 max-w-3xl">
            <Link href="/" className="mb-4 inline-block text-sm text-primary hover:underline">
              ← {t.blog.backHome}
            </Link>
            <h1 className="text-4xl font-bold md:text-5xl text-gradient">{t.blog.pageTitle}</h1>
            <div className="mt-4 h-1 w-24 bg-primary"></div>
            <p className="mt-6 text-lg text-zinc-300">{t.blog.pageIntro}</p>
          </header>
          <BlogListing />
        </div>
      </main>
      <Footer />
    </div>
  )
}
