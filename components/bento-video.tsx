"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type BentoVideoProps = {
  src: string
  /** Shown only if the video fails to load/decode (e.g. unsupported .mov). */
  fallbackImage: string
  className?: string
  /** Passed to next/image when fallback is used. */
  fallbackSizes?: string
}

/**
 * Portrait bento clips: loads only when near viewport, plays while visible,
 * pauses off-screen to save CPU/GPU and bandwidth (preload="none").
 * If playback is not possible, shows fallbackImage so the tile is never empty.
 */
export function BentoVideo({ src, fallbackImage, className, fallbackSizes }: BentoVideoProps) {
  const [useFallback, setUseFallback] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (useFallback) return

    const video = videoRef.current
    const root = containerRef.current
    if (!video || !root) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // Autoplay can reject without a media error; only swap if the element reports failure.
            if (video.error) setUseFallback(true)
          })
        } else {
          video.pause()
        }
      },
      { rootMargin: "140px 0px", threshold: 0.12 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [useFallback])

  if (useFallback) {
    return (
      <div className="absolute inset-0">
        <Image
          src={fallbackImage}
          alt=""
          fill
          quality={82}
          sizes={fallbackSizes ?? "(max-width: 640px) 100vw, 25vw"}
          className={cn("object-cover", className)}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video
        ref={videoRef}
        className={cn("h-full w-full object-cover", className)}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
        onError={() => setUseFallback(true)}
      >
        <source src={src} type="video/quicktime" />
      </video>
    </div>
  )
}
