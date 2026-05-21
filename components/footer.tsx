"use client"

import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { Instagram, Facebook, Mail, Phone } from "lucide-react"
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-config"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
        <footer id="contact" className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-heading mb-4 text-white">Crystal Detailing</h3>
                <p className="text-zinc-400 mb-6">{t.footer.tagline}</p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-zinc-400 hover:text-primary transition-colors">
                    <Instagram size={20} />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-zinc-400 hover:text-primary transition-colors">
                    <Facebook size={20} />
                    <span className="sr-only">Facebook</span>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading mb-4 text-white">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone size={18} className="text-primary mr-2" />
                    <span className="text-zinc-300">+421 918 722 720</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={18} className="text-primary mr-2 shrink-0" aria-hidden />
                    <a
                      href={CONTACT_MAILTO}
                      className="text-zinc-300 hover:text-primary transition-colors break-all text-left"
                      suppressHydrationWarning
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading mb-4 text-white">Quick Links</h3>
                <div className="grid grid-cols-1 gap-2">
                  <Link href="#services" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.nav.services}
                  </Link>
                  <Link href="#how-it-works" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.nav.howItWorks}
                  </Link>
                  <Link href="#reviews" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.nav.reviews}
                  </Link>
                  <Link href="/lokality" className="text-zinc-400 hover:text-primary transition-colors">
                    Lokality
                  </Link>
                  <Link href="/calc" className="text-zinc-400 hover:text-primary transition-colors">
                    Cenová kalkulačka
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-zinc-500 text-center md:text-left">
                <div>© {currentYear} Crystal Detailing. {t.footer.allRightsReserved}</div>
                <div className="mt-2 text-xs text-zinc-600">
                  INVEST M, s.r.o. | IČO: 36685984 | DIČ: 2022258535
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
                <Link href="#" className="hover:text-primary">
                  {t.footer.privacyPolicy}
                </Link>
                <Link href="#" className="hover:text-primary">
                  {t.footer.termsOfService}
                </Link>
                <LanguageSwitcher variant="minimal" />
              </div>
            </div>
          </div>
        </footer>
  )
}
