"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionsProps {
  children: ReactNode
}

export function PageTransitions({ children }: PageTransitionsProps) {
  const pathnameRaw = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setIsFirstRender(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Po hydrácii až používame pathname — pri prvom renderi musí byť strom rovnaký ako na serveri
  if (!isMounted) {
    return <div style={{ position: "relative" }}>{children}</div>
  }

  const pathname = pathnameRaw ?? "/"
  const isCalcPage = pathname === "/calc"

  if (isCalcPage) {
    return <div style={{ position: "relative" }}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={isFirstRender ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ position: "relative" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
