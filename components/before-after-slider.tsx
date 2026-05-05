"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { GripVertical } from "lucide-react"

type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
  beforeLabel: string
  afterLabel: string
  dragHint?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  dragHint,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positionPct, setPositionPct] = useState(50)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = (x / rect.width) * 100
    setPositionPct(Math.min(100, Math.max(0, pct)))
  }, [])

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full max-h-[min(70vh,820px)] cursor-ew-resize select-none touch-none overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl ring-1 ring-white/5 md:rounded-3xl"
        onPointerDown={(e) => {
          updateFromClientX(e.clientX)
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return
          updateFromClientX(e.clientX)
        }}
        onPointerUp={(e) => {
          ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
        }}
        onPointerCancel={(e) => {
          try {
            ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
          } catch {
            /* already released */
          }
        }}
        role="img"
        aria-label={`${beforeLabel} / ${afterLabel}`}
      >
        <Image
          src={afterSrc}
          alt=""
          fill
          className="absolute inset-0 object-cover"
          sizes="(max-width: 768px) 100vw, min(1152px, 92vw)"
          priority
          draggable={false}
        />

        <Image
          src={beforeSrc}
          alt=""
          fill
          className="absolute inset-0 object-cover"
          sizes="(max-width: 768px) 100vw, min(1152px, 92vw)"
          priority
          draggable={false}
          style={{
            clipPath: `inset(0 ${100 - positionPct}% 0 0)`,
          }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          style={{ left: `${positionPct}%`, transform: "translateX(-50%)" }}
        />

        <div
          className="pointer-events-none absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/70 text-white shadow-xl backdrop-blur-sm md:h-14 md:w-14"
          style={{ left: `${positionPct}%` }}
        >
          <GripVertical className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md md:left-4 md:top-4 md:text-sm">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md md:right-4 md:top-4 md:text-sm">
          {afterLabel}
        </span>
      </div>
      {dragHint ? (
        <p className="mt-4 text-center text-sm text-zinc-500">{dragHint}</p>
      ) : null}
    </div>
  )
}
