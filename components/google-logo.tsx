import Image from "next/image"
import { cn } from "@/lib/utils"

type GoogleLogoProps = {
  className?: string
  "aria-hidden"?: boolean
}

export function GoogleLogo({ className, "aria-hidden": ariaHidden }: GoogleLogoProps) {
  return (
    <Image
      src="/images/google-g-logo.png"
      alt={ariaHidden ? "" : "Google"}
      width={32}
      height={32}
      className={cn("h-8 w-8 shrink-0", className)}
      aria-hidden={ariaHidden}
    />
  )
}
