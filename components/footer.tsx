"use client"

import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LanguageWrapper } from "@/components/language-wrapper"
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <LanguageWrapper>
      {(t) => (
        <footer id="contact" className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-heading mb-4 text-white">Crystal Detailing</h3>
                <p className="text-zinc-400 mb-6">
                  Slovakia's first luxury mobile car detailing service that comes to your location.
                </p>
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
                    <Mail size={18} className="text-primary mr-2" />
                    <span className="text-zinc-300">crystalbratislava@gmail.com</span>
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
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-zinc-500">
                © {currentYear} Crystal Detailing. {t.footer.allRightsReserved}
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
      )}
    </LanguageWrapper>
  )
}
