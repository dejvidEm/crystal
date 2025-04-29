"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxLogo() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()

  // Transform values based on scroll position
  const opacity = useTransform(scrollY, [0, 300], [0.9, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.2])
  const y = useTransform(scrollY, [0, 300], [0, -50])

  // Handle client-side mounting to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <motion.div
      className="absolute top-[15%] left-1/2 -translate-x-1/2 z-0 w-40 h-40 md:w-56 md:h-56"
      style={{
        opacity,
        scale,
        y,
        position: 'relative'
      }}
    >
      <Image
        src="/images/logo.png"
        alt="LuxDetail Logo"
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 160px, 224px"
        quality={90}
      />
    </motion.div>
  )
}
