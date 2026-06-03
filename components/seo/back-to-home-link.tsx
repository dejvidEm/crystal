"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

type BackToHomeLinkProps = {
  className?: string
}

export function BackToHomeLink({ className = "" }: BackToHomeLinkProps) {
  const { t } = useLanguage()

  return (
    <Link
      href="/"
      className={`relative z-10 mb-6 inline-block text-sm text-primary hover:underline ${className}`}
    >
      ← {t.cennikPage.backHome}
    </Link>
  )
}
