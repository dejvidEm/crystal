"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

type OptimizedImageProps = ImageProps & {
  loadingClassName?: string
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  className,
  loadingClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  loading,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "transition-all duration-500",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
          loadingClassName,
        )}
        onLoad={() => setIsLoading(false)}
        sizes={sizes}
        quality={quality}
        loading={props.priority ? undefined : loading}
        {...props}
      />
    </div>
  )
}
