"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  type BlogPost,
  formatBlogDate,
  getCategoryLabel,
  getReadingTimeMinutes,
} from "@/lib/blog-data"
import { toContentLocale } from "@/lib/i18n/locale"

interface BlogCardProps {
  post: BlogPost
  variant?: "default" | "compact"
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const { language, t } = useLanguage()
  const lang = toContentLocale(language)
  const title = post.title[lang]
  const excerpt = post.excerpt[lang]
  const readingMin = getReadingTimeMinutes(post.body[lang])
  const readLabel =
    readingMin === 1
      ? t.blog.readingTimeOne
      : t.blog.readingTimeMany.replace("{minutes}", String(readingMin))

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex gap-4 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/40 hover:bg-card"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
          <Image
            src={post.image}
            alt={post.imageAlt[lang]}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="112px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {getCategoryLabel(post.category, lang)}
          </span>
          <h3 className="mt-1 line-clamp-2 font-semibold text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
            <Calendar className="h-3 w-3" aria-hidden />
            {formatBlogDate(post.publishedAt, lang)}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/40">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt[lang]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden />
            {formatBlogDate(post.publishedAt, lang)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary" aria-hidden />
            {readLabel}
          </span>
        </div>
        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
          {getCategoryLabel(post.category, lang)}
        </span>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-primary line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="mb-4 flex-1 text-sm text-zinc-400 line-clamp-3">{excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          {t.blog.readMore}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
