"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

type HashAwareLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

export function HashAwareLink({ href, className, children }: HashAwareLinkProps) {
  const pathname = usePathname() ?? "/"
  const router = useRouter()

  if (!href.includes("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  const hash = href.split("#")[1]
  if (!hash) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  const scrollToHash = () => {
    const el = document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      scrollToHash()
      window.history.replaceState(null, "", `/#${hash}`)
      return
    }

    e.preventDefault()
    router.push("/")
    window.setTimeout(scrollToHash, 400)
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
