"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function VideoBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Use loadedmetadata event - fires when metadata is loaded (much faster than canplay)
    // This allows the video to start playing without downloading the full file
    const handleLoadedMetadata = () => {
      setIsLoaded(true)
      // Attempt to play - browser will stream the video as needed
      video.play().catch((error) => {
        console.error("Error playing video:", error)
        // If play fails, still show the video (might be autoplay policy)
        setIsLoaded(true)
      })
    }

    // Also listen for canplay as fallback
    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    // Check if metadata is already loaded
    if (video.readyState >= 1) {
      setIsLoaded(true)
      video.play().catch(() => {})
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata)
      video.addEventListener("canplay", handleCanPlay)
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Show background immediately - don't wait for video */}
      <div className="absolute inset-0 bg-black"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="relative h-full w-full"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/two.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Multiple overlay layers for better text readability */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </motion.div>
    </div>
  )
}
