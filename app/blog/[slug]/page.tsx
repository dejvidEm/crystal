import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogArticlePageClient } from "@/components/blog/blog-article-page-client"
import { JsonLd } from "@/components/seo/json-ld"
import { getAllPostSlugs, getBlogPostKeywords, getPostBySlug } from "@/lib/blog-data"
import { buildBlogArticleMetadata } from "@/lib/seo-metadata"
import { buildBlogPostPageJsonLd } from "@/lib/seo-structured-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Článok nenájdený" }

  return buildBlogArticleMetadata({
    title: post.title.sk,
    description: post.excerpt.sk,
    slug,
    publishedAt: post.publishedAt,
    imagePath: post.image,
    imageAlt: post.imageAlt.sk,
    keywords: getBlogPostKeywords(post),
  })
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <JsonLd data={buildBlogPostPageJsonLd(post)} />
      <Navbar />
      <main className="pt-28 pb-20 md:pt-32">
        <article className="container mx-auto px-4">
          <BlogArticlePageClient post={post} />
        </article>
      </main>
      <Footer />
    </div>
  )
}
