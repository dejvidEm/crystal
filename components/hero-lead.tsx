"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles, Star } from "lucide-react"
import Image from "next/image"
import { VideoBackground } from "@/components/video-background"
import { HeroLeadForm } from "@/components/hero-lead-form"
import { GoogleLogo } from "@/components/google-logo"
import { useLanguage } from "@/lib/i18n/language-context"

const SOCIAL_AVATARS = [
  { src: "/images/hero-review-avatar-1.png", name: "Tomáš M." },
  { src: "/images/hero-review-avatar-2.png", name: "Lucia S." },
  { src: "/images/hero-review-avatar-3.png", name: "Zákazník" },
] as const

export function HeroLead() {
  const { t } = useLanguage()
  const copy = t.heroLead
  const trustItems = [copy.trust1, copy.trust2, copy.trust3]

  return (
    <section id="hero" className="relative min-h-screen w-full">
      <VideoBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/45 via-black/25 to-black/55" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1400px] items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-[minmax(0,1fr)_minmax(380px,520px)] md:gap-10 md:pb-20 md:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-2 text-sm font-semibold text-amber-100 shadow-[0_0_28px_-8px_rgba(251,191,36,0.5)] backdrop-blur-sm">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
            {copy.badge}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{copy.title}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">{copy.subtitle}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center">
              {SOCIAL_AVATARS.map((person, index) => (
                <span
                  key={person.src}
                  title={person.name}
                  className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-800 sm:h-8 sm:w-8"
                  style={{ marginLeft: index === 0 ? 0 : -8, zIndex: SOCIAL_AVATARS.length - index }}
                >
                  <Image
                    src={person.src}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <GoogleLogo className="h-7 w-7" aria-hidden />
            <div>
              <div className="flex items-center gap-1" aria-label={copy.socialProofAria}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden />
                ))}
              </div>
              <p className="mt-0.5 text-sm font-medium text-zinc-200">{copy.socialProof}</p>
            </div>
          </div>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-zinc-100 sm:text-base">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="w-full"
        >
          <HeroLeadForm />
        </motion.div>
      </div>
    </section>
  )
}
