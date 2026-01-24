"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionsProps {
  children: ReactNode
}

export function PageTransitions({ children }: PageTransitionsProps) {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    // Skip animation on first render
    const timer = setTimeout(() => {
      setIsFirstRender(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // For calculator page, skip animation to prevent double loading
  const isCalcPage = pathname === "/calc"

  // If it's the calc page, render without animation
  if (isCalcPage) {
    return <div style={{ position: 'relative' }}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={isFirstRender ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
