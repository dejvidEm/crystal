"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function MobileServiceBanner() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Opacity effect for the content
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1])

  // Scale effect for the content
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

  return (
    <section ref={ref} className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Image with parallax effect */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, position: 'relative' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-10"></div>
        <div className="relative h-full w-full">
          <Image
            src="/images/van-with-logo.png"
            alt="LuxDetail Mobile Detailing Van"
            fill
            className="object-cover"
            style={{ objectPosition: "60% center" }}
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Content overlay */}
      <div className="container relative z-20 h-full mx-auto px-4" style={{ position: 'relative' }}>
        <motion.div className="flex flex-col items-start justify-center h-full max-w-2xl" style={{ opacity, scale, position: 'relative' }}>
          <div className="glass-card p-8 md:p-10 rounded-lg border border-primary/20 backdrop-blur-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t.mobileService?.title || "We Come To You"}
            </h2>
            <p className="text-zinc-200 text-lg mb-6">
              {t.mobileService?.description ||
                "Our fully equipped mobile detailing unit brings the premium car wash experience directly to your location. No need to drive anywhere or wait in line - we handle everything while you focus on what matters to you."}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t.common.bookNow} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <span className="text-zinc-400">{t.mobileService?.availability || "Available 7 days a week"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
