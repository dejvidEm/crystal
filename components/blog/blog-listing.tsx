"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { useLanguage } from "@/lib/i18n/language-context"
import { getPostsByCategory, type BlogCategoryId, blogCategories } from "@/lib/blog-data"

function BlogListingContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("kategoria")
  const validCategory = blogCategories.some((c) => c.id === categoryParam)
    ? (categoryParam as BlogCategoryId)
    : null
  const posts = getPostsByCategory(validCategory)

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
      <BlogSidebar />
      <div>
        {posts.length === 0 ? (
          <p className="rounded-lg border border-border bg-card/50 p-8 text-center text-zinc-400">
            {t.blog.noPosts}
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function BlogListing() {
  const { t } = useLanguage()

  return (
    <Suspense
      fallback={
        <div className="text-center text-zinc-500 py-12">{t.blog.loading}</div>
      }
    >
      <BlogListingContent />
    </Suspense>
  )
}
