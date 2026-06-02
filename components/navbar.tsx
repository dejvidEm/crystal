"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"

export function Navbar() {
  const pathnameRaw = usePathname()
  const pathname = pathnameRaw ?? "/"
  const isCalcPage = pathname === "/calc"
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Memoize scroll handler for better performance
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  // Add passive event listener for better scroll performance
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const isHomePage = pathname === "/"

  const navItems = [
    { name: t.nav.aboutUs, href: "/o-nas" },
    { name: t.nav.services, href: isHomePage ? "#services" : "/#services" },
    { name: t.nav.howItWorks, href: isHomePage ? "#how-it-works" : "/#how-it-works" },
    { name: "Lokality", href: "/lokality" },
    { name: t.nav.blog, href: "/blog" },
    { name: t.nav.reviews, href: isHomePage ? "#reviews" : "/#reviews" },
    { name: t.nav.contact, href: isHomePage ? "#contact" : "/#contact" },
  ]

  return (
          <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${
              scrolled ? "bg-black/80 backdrop-blur-md py-7 shadow-xl" : "bg-transparent py-11"
            }`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
              <div className="relative flex w-full items-center justify-between 2xl:justify-center">
                {/* Logo */}
                <Link href="/" className="z-20 shrink-0 2xl:mr-16">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                  >
                    <span className="text-2xl font-light tracking-wider">
                      <span className="text-white">CRYSTAL</span>
                      <span className="text-primary">DETAILING</span>
                    </span>
                  </motion.div>
                </Link>

                {/* Desktop navigácia – od 2xl (1536px), burger skôr; font bez zmenšenia */}
                {!isCalcPage && (
                  <nav
                    className="hidden 2xl:flex shrink-0 items-center"
                    aria-label="Main navigation"
                  >
                    <div className="flex items-center space-x-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="relative whitespace-nowrap px-5 py-4 text-sm uppercase tracking-widest text-zinc-300 transition-colors hover:text-primary group"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                          <motion.span
                            className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                          />
                        </Link>
                      ))}
                    </div>
                  </nav>
                )}

                {/* Jazyk + Rezervovať */}
                <div className="hidden 2xl:flex shrink-0 items-center space-x-5 2xl:ml-16">
                  <LanguageSwitcher variant="minimal" />
                  <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-4 bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 uppercase tracking-widest text-sm"
                    >
                      {t.common.bookNow}
                    </motion.button>
                  </a>
                </div>

                {/* Burger + jazyk – pod 2xl */}
                {!isCalcPage && (
                  <div className="2xl:hidden flex items-center gap-4 z-20">
                    <LanguageSwitcher variant="icon" />
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-white focus:outline-none"
                      aria-label={isOpen ? "Close menu" : "Open menu"}
                      aria-expanded={isOpen}
                      aria-controls="mobile-menu"
                    >
                      {isOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
                )}
                {isCalcPage && (
                  <div className="2xl:hidden flex items-center gap-4 z-20">
                    <LanguageSwitcher variant="icon" />
                  </div>
                )}

                {/* Mobile Menu */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                    id="mobile-menu"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full h-screen z-50 bg-black backdrop-blur-md 2xl:hidden"
                  >
                    {/* X Button */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-6 right-6 text-white z-50"
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6 text-primary" />
                    </button>
                  
                    <div className="flex flex-col items-center justify-center h-full">
                      <nav className="flex flex-col items-center space-y-8" aria-label="Mobile navigation">
                        {navItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="whitespace-nowrap text-xl uppercase tracking-widest text-zinc-200 hover:text-primary transition-colors"
                            onClick={handleLinkClick}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 uppercase tracking-widest"
                          >
                            {t.common.bookNow}
                          </motion.button>
                        </a>
                      </nav>
                    </div>
                  </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>
  )
}
