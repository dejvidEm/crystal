"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LazyLoadSection } from "@/components/lazy-section"
import { BlogCard } from "@/components/blog/blog-card"
import { useLanguage } from "@/lib/i18n/language-context"
import { getLatestPosts } from "@/lib/blog-data"

const HOME_BLOG_LIMIT = 3

export function BlogHomeSection() {
  const { t } = useLanguage()
  const latest = getLatestPosts(HOME_BLOG_LIMIT)

  if (latest.length === 0) return null

  return (
    <section id="blog" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-4">
        <LazyLoadSection>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-gradient">
              {t.blog.title}
            </h2>
            <div className="mx-auto h-1 w-24 bg-primary"></div>
            <p className="mx-auto mt-6 max-w-2xl text-zinc-400">{t.blog.subtitle}</p>
          </div>
        </LazyLoadSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, index) => (
            <LazyLoadSection key={post.slug} delay={0.1 + index * 0.08}>
              <BlogCard post={post} />
            </LazyLoadSection>
          ))}
        </div>

        <LazyLoadSection delay={0.35}>
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                {t.blog.viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </LazyLoadSection>
      </div>

      <div className="section-divider"></div>
      <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
    </section>
  )
}
