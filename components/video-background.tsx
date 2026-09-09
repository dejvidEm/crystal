"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { shouldLoadHeavyMedia } from "@/lib/connection"

export function VideoBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!shouldLoadHeavyMedia()) return

    const enableVideo = () => setLoadVideo(true)
    const requestIdle = window.requestIdleCallback
    if (typeof requestIdle === "function") {
      const idleId = requestIdle(enableVideo, { timeout: 1800 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(enableVideo, 400)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !loadVideo) return

    const playVideo = () => {
      setIsLoaded(true)
      video.play().catch(() => {
        setIsLoaded(true)
      })
    }

    if (video.readyState >= 1) {
      playVideo()
      return
    }

    video.addEventListener("loadedmetadata", playVideo)
    video.addEventListener("canplay", playVideo)
    return () => {
      video.removeEventListener("loadedmetadata", playVideo)
      video.removeEventListener("canplay", playVideo)
    }
  }, [loadVideo])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src="/images/hero-poster.jpg"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="relative h-full w-full"
      >
        {loadVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/two.mp4" type="video/mp4" />
          </video>
        ) : null}
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/55 via-black/25 to-transparent md:hidden" />
    </div>
  )
}
