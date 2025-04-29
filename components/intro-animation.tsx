"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function IntroAnimation() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Prevent scrolling during animation
    document.body.style.overflow = "hidden"

    // Enable scrolling after animation completes
    const timer = setTimeout(() => {
      document.body.style.overflow = ""
      setIsComplete(true)
    }, 3500) // Total animation duration

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      animate={{
        opacity: isComplete ? 0 : 1,
        pointerEvents: isComplete ? "none" : "auto",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative h-32 w-32 md:h-40 md:w-40"
        >
          <Image
            src="/images/logo.png"
            alt="Crystal Detailing Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 128px, 160px"
          />
        </motion.div>

        {/* Text Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-2 text-3xl font-light tracking-wider md:text-4xl">
            <span className="text-white">CRYSTAL</span>
            <span className="text-primary">DETAILING</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">Premium Mobile Car Detailing</p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-8 h-0.5 w-48 bg-zinc-800 overflow-hidden"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1.5 }}
          />
        </motion.div>

        {/* Swipe Animation */}
        <motion.div
          className="absolute inset-0 z-10 bg-black"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{
            delay: 2.5,
            duration: 1.5,
            times: [0, 0.4, 0.6, 1],
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  )
}
