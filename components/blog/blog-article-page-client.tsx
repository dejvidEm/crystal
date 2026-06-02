"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calculator, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogArticleBody } from "@/components/blog/blog-article-body"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"
import {
  type BlogPost,
  formatBlogDate,
  getCategoryLabel,
  getReadingTimeMinutes,
} from "@/lib/blog-data"

export function BlogArticlePageClient({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage()
  const lang = language === "en" ? "en" : "sk"
  const title = post.title[lang]
  const blocks = post.body[lang]
  const readingMin = getReadingTimeMinutes(blocks)
  const readLabel =
    readingMin === 1
      ? t.blog.readingTimeOne
      : t.blog.readingTimeMany.replace("{minutes}", String(readingMin))

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/blog" className="mb-8 inline-block text-sm text-primary hover:underline">
        ← {t.blog.backToBlog}
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-primary" aria-hidden />
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, lang)}</time>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-primary" aria-hidden />
          {readLabel}
        </span>
      </div>

      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-gradient">
        {title}
      </h1>

      <p className="mt-4">
        <Link
          href={`/blog?kategoria=${post.category}`}
          className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {getCategoryLabel(post.category, lang)}
        </Link>
      </p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-tl-3xl rounded-br-3xl">
        <Image
          src={post.image}
          alt={post.imageAlt[lang]}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <div className="mt-10">
        <BlogArticleBody blocks={blocks} />
      </div>

      <div className="mt-12 border-t border-border pt-10">
        <h2 className="text-center text-2xl font-bold sm:text-3xl text-gradient">
          {t.booking.title}
        </h2>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              {t.common.bookNow} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <Link href="/calc">
            <Button
              size="lg"
              variant="outline"
              className="w-full min-w-[200px] border-primary text-primary hover:bg-primary/10 sm:w-auto"
            >
              <Calculator className="mr-2 h-4 w-4" />
              {t.common.getQuote}
            </Button>
          </Link>
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-primary hover:underline">
            ← {t.blog.backToBlog}
          </Link>
        </div>
      </div>
    </div>
  )
}
