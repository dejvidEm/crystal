import { type ComponentPropsWithoutRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content (use 2 for a seamless loop)
   * @default 2
   */
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max will-change-transform",
          {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "[animation-direction:reverse]": reverse,
            "[@media(hover:hover)]:group-hover:[animation-play-state:paused]": pauseOnHover,
          },
        )}
      >
        {Array.from({ length: repeat }).map((_, copyIndex) => (
          <div
            key={`marquee-copy-${copyIndex}`}
            className={cn("flex shrink-0 gap-[var(--gap)]", {
              "flex-row": !vertical,
              "flex-col": vertical,
            })}
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
