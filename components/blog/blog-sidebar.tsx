"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { blogCategories, type BlogCategoryId } from "@/lib/blog-data"

export function BlogSidebar() {
  const { language, t } = useLanguage()
  const lang = language === "en" ? "en" : "sk"
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("kategoria") as BlogCategoryId | null

  const isBlogIndex = pathname === "/blog"

  function categoryHref(id: BlogCategoryId | null): string {
    const params = new URLSearchParams()
    if (id) params.set("kategoria", id)
    const radenie = searchParams.get("radenie")
    if (radenie === "najstarsie") params.set("radenie", "najstarsie")
    const q = params.toString()
    return q ? `/blog?${q}` : "/blog"
  }

  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <div className="rounded-lg border border-border bg-card/50 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
          {t.blog.sidebarCategories}
        </h2>
        <nav className="flex flex-col gap-1" aria-label={t.blog.sidebarCategories}>
          <Link
            href={categoryHref(null)}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              isBlogIndex && !activeCategory
                ? "bg-primary/15 text-primary font-medium"
                : "text-zinc-300 hover:bg-white/5 hover:text-white",
            )}
          >
            {t.blog.allCategories}
          </Link>
          {blogCategories.map((cat) => (
            <Link
              key={cat.id}
              href={categoryHref(cat.id)}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                isBlogIndex && activeCategory === cat.id
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white",
              )}
            >
              {cat.label[lang]}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
