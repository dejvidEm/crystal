import type { BlogContentBlock } from "@/lib/blog-data"

export function BlogArticleBody({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="space-y-5 text-zinc-300 leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="pt-2 text-2xl font-semibold text-white">
              {block.text}
            </h2>
          )
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={index} className="text-zinc-300">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}
