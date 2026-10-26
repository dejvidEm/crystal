"use client"

import { createContext, useContext, type ReactNode } from "react"

export type SiteVertical = "detailing" | "home"

const SiteVerticalContext = createContext<SiteVertical>("detailing")

export function SiteVerticalProvider({
  value,
  children,
}: {
  value: SiteVertical
  children: ReactNode
}) {
  return <SiteVerticalContext.Provider value={value}>{children}</SiteVerticalContext.Provider>
}

export function useSiteVertical(): SiteVertical {
  return useContext(SiteVerticalContext)
}

export function useIsHomeUpholstery(): boolean {
  return useSiteVertical() === "home"
}
