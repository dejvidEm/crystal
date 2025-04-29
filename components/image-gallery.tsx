"use client"

import { useState } from "react"
import { OptimizedImage } from "./optimized-image"
import { getSizes } from "@/lib/image-optimization"

type ImageGalleryProps = {
  images: {
    src: string
    alt: string
    width?: number
    height?: number
  }[]
  className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className={className}>
      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-500 ${selectedIndex === index ? "opacity-100" : "opacity-0"}`}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={getSizes("fill")}
              quality={85}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={`thumb-${image.src}`}
            onClick={() => setSelectedIndex(index)}
            className={`relative aspect-video rounded-md overflow-hidden ${selectedIndex === index ? "ring-2 ring-primary" : "opacity-70"}`}
          >
            <OptimizedImage
              src={image.src}
              alt={`Thumbnail for ${image.alt}`}
              fill
              className="object-cover"
              sizes={getSizes("thumbnail")}
              quality={60}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
