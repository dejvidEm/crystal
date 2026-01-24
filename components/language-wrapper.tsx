"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/lib/i18n/language-context"

interface LanguageWrapperProps {
  children: (t: any) => ReactNode
}

export function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { t, isLoaded } = useLanguage()

  if (!isLoaded) {
    // Return a minimal loading state that doesn't cause layout shift
    return (
      <div className="min-h-screen bg-background">
        <div className="opacity-0">{children(t)}</div>
      </div>
    )
  }

  return <>{children(t)}</>
}
