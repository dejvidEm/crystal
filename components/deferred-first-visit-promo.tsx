"use client"

import { useEffect, useState, type ComponentType } from "react"

export function DeferredFirstVisitPromo() {
  const [PromoModal, setPromoModal] = useState<ComponentType | null>(null)

  useEffect(() => {
    let cancelled = false

    void import("@/components/first-visit-promo-modal").then((module) => {
      if (!cancelled) {
        setPromoModal(() => module.FirstVisitPromoModal)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (!PromoModal) {
    return null
  }

  return <PromoModal />
}
