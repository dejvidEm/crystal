"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function MobileServiceBanner() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={ref} className="relative h-[500px] overflow-hidden md:h-[600px]">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <Image
          src="/images/van-with-logo.png"
          alt="Mobilná detailingová jednotka Crystal Detailing v Bratislave"
          fill
          className="object-cover brightness-[0.72]"
          style={{ objectPosition: "60% center" }}
          priority
          sizes="100vw"
        />
      </motion.div>

      <div className="container relative z-20 mx-auto flex h-full items-start justify-center px-4 pt-32 md:pt-36">
        <motion.div
          className="w-full max-w-xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="glass-card rounded-lg border border-primary/20 p-8 backdrop-blur-md md:p-10">
            <h2 className="text-gradient mb-3 text-3xl font-bold md:text-4xl">
              {t.mobileService?.title || "Sme Crystal Detailing"}
            </h2>
            <p className="mb-6 text-base text-zinc-300 md:text-lg">
              {t.mobileService?.shortLead ||
                "Prémiový mobilný detailing pre tých, ktorí očakávajú dokonalosť v každom detaile."}
            </p>
            <Link href="/o-nas">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t.nav.aboutUs}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
