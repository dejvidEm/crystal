"use client"

import { type ReactNode } from "react"

interface PageTransitionsProps {
  children: ReactNode
}

/** Stabilný wrapper bez fade – AnimatePresence + hydratácia spôsobovali prebliknutie pri navigácii. */
export function PageTransitions({ children }: PageTransitionsProps) {
  return <div style={{ position: "relative" }}>{children}</div>
}
