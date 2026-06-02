import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogArticlePageClient } from "@/components/blog/blog-article-page-client"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog-data"

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

  const title = post.title.sk
  const description = post.excerpt.sk
  const url = `https://crystaldetailing.sk/blog/${slug}`

  return {
    title: `${title} | Blog Crystal Detailing`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: `https://crystaldetailing.sk${post.image}`, alt: post.imageAlt.sk }],
    },
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
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
