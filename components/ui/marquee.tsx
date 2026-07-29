import { type ComponentPropsWithoutRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: ReactNode
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "marquee-group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, copyIndex) => (
        <div
          key={copyIndex}
          className={cn(
            "marquee-track flex shrink-0 gap-[var(--gap)]",
            pauseOnHover && "marquee-track-pause-on-hover",
            {
              "flex-row": !vertical,
              "flex-col": vertical,
              "marquee-track-vertical": vertical,
              "[animation-direction:reverse]": reverse,
            },
          )}
          aria-hidden={copyIndex > 0 ? true : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
