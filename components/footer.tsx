"use client"

import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { Instagram, Facebook, Mail, Phone } from "lucide-react"
import {
  COMPANY_LEGAL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  SOCIAL_LINKS,
} from "@/lib/site-config"

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
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-primary transition-colors"
                  >
                    <Instagram size={20} />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-primary transition-colors"
                  >
                    <Facebook size={20} />
                    <span className="sr-only">Facebook</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading mb-4 text-white">{t.footer.contactHeading}</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone size={18} className="text-primary mr-2 shrink-0" aria-hidden />
                    <a
                      href={CONTACT_PHONE_TEL}
                      className="text-zinc-300 hover:text-primary transition-colors"
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </a>
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
                <h3 className="text-xl font-heading mb-4 text-white">{t.footer.quickLinksHeading}</h3>
                <div className="grid grid-cols-1 gap-2">
                  <Link href="/o-nas" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.nav.aboutUs}
                  </Link>
                  <Link href="/#services" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.nav.services}
                  </Link>
                  <Link href="/#how-it-works" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.nav.howItWorks}
                  </Link>
                  <Link href="/#reviews" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.nav.reviews}
                  </Link>
                  <Link href="/lokality" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.footer.locations}
                  </Link>
                  <Link href="/blog" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.footer.blog}
                  </Link>
                  <Link href="/calc" className="text-zinc-400 hover:text-primary transition-colors">
                    {t.footer.priceCalculator}
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-zinc-500 text-center md:text-left">
                <div suppressHydrationWarning>© {currentYear} Crystal Detailing. {t.footer.allRightsReserved}</div>
                <div className="mt-2 text-xs text-zinc-600">
                  {COMPANY_LEGAL.name} | IČO: {COMPANY_LEGAL.ico} | DIČ: {COMPANY_LEGAL.dic}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
                <Link href="/ochrana-osobnych-udajov" className="hover:text-primary">
                  {t.footer.privacyPolicy}
                </Link>
                <Link href="/obchodne-podmienky" className="hover:text-primary">
                  {t.footer.termsOfService}
                </Link>
                <LanguageSwitcher variant="minimal" />
              </div>
            </div>
          </div>
        </footer>
  )
}
