"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { BentoVideo } from "@/components/bento-video"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  MEDIA_GALLERY_ITEMS,
  MOBILE_GALLERY_VISIBLE_COUNT,
  type MediaGalleryItem,
} from "@/lib/media-gallery-data"
import { cn } from "@/lib/utils"

function MediaGalleryTile({
  item,
  alt,
  layout = "mobile",
}: {
  item: MediaGalleryItem
  alt: string
  layout?: "mobile" | "desktop"
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10",
        layout === "desktop" ? "col-span-1 row-span-5" : "aspect-[2/3]",
      )}
    >
      {item.type === "video" ? (
        <BentoVideo
          src={item.src}
          fallbackImage={item.fallbackImage}
          fallbackAlt={alt}
          fallbackSizes="(max-width: 768px) 50vw, 25vw"
          className="transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <Image
          src={item.src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          quality={82}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
    </div>
  )
}

function MediaGalleryGrid({
  items,
  getAlt,
  layout = "mobile",
}: {
  items: MediaGalleryItem[]
  getAlt: (item: MediaGalleryItem) => string
  layout?: "mobile" | "desktop"
}) {
  return (
    <>
      {items.map((item) => (
        <MediaGalleryTile key={item.id} item={item} alt={getAlt(item)} layout={layout} />
      ))}
    </>
  )
}

export function MediaGallery() {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const getAlt = (item: MediaGalleryItem) => {
    if (item.type === "video") {
      return t.mediaBento.videoFallbackAlt
    }

    return t.mediaBento.photoAlts[item.altIndex] ?? ""
  }

  const mobileVisibleItems = MEDIA_GALLERY_ITEMS.slice(0, MOBILE_GALLERY_VISIBLE_COUNT)
  const mobileHiddenItems = MEDIA_GALLERY_ITEMS.slice(MOBILE_GALLERY_VISIBLE_COUNT)
  const hasMobileHiddenItems = mobileHiddenItems.length > 0

  return (
    <>
      <div className="hidden md:grid md:grid-cols-4 md:auto-rows-[110px] md:gap-4">
        <MediaGalleryGrid items={MEDIA_GALLERY_ITEMS} getAlt={getAlt} layout="desktop" />
      </div>

      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <MediaGalleryGrid items={mobileVisibleItems} getAlt={getAlt} />
        </div>

        {hasMobileHiddenItems ? (
          <Collapsible open={expanded} onOpenChange={setExpanded} className="mt-4">
            <CollapsibleContent className="overflow-hidden">
              <div className="grid grid-cols-2 gap-3 pt-3">
                <MediaGalleryGrid items={mobileHiddenItems} getAlt={getAlt} />
              </div>
            </CollapsibleContent>

            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="mt-4 w-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {expanded ? t.mediaBento.showLess : t.mediaBento.showMore}
                <ChevronDown
                  className={cn("ml-2 h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
                />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        ) : null}
      </div>
    </>
  )
}
