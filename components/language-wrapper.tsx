"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

interface LanguageWrapperProps {
  children: (t: any) => ReactNode
}

export function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { t, isLoaded } = useLanguage()

  if (!isLoaded) {
    // Return a minimal loading state or null
    return null
  }

  return <>{children(t)}</>
}
