"use client"

import { Suspense } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  getPostsByCategory,
  parseBlogSort,
  type BlogCategoryId,
  type BlogSortOrder,
  blogCategories,
} from "@/lib/blog-data"

function BlogListingContent() {
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("kategoria")
  const validCategory = blogCategories.some((c) => c.id === categoryParam)
    ? (categoryParam as BlogCategoryId)
    : null
  const sort = parseBlogSort(searchParams.get("radenie"))
  const posts = getPostsByCategory(validCategory, sort)

  function setSort(next: BlogSortOrder) {
    const params = new URLSearchParams(searchParams.toString())
    if (next === "oldest") {
      params.set("radenie", "najstarsie")
    } else {
      params.delete("radenie")
    }
    const q = params.toString()
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false })
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
      <BlogSidebar />
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <label htmlFor="blog-sort" className="text-sm text-zinc-400">
            {t.blog.sortLabel}
          </label>
          <select
            id="blog-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as BlogSortOrder)}
            className="h-10 min-w-[11rem] rounded-md border border-border bg-card/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={t.blog.sortLabel}
          >
            <option value="newest">{t.blog.sortNewest}</option>
            <option value="oldest">{t.blog.sortOldest}</option>
          </select>
        </div>
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
