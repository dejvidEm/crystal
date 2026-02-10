"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LanguageWrapper } from "@/components/language-wrapper"

export function Navbar() {
  const pathname = usePathname()
  const isCalcPage = pathname === "/calc"
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

  return (
    <LanguageWrapper>
      {(t) => {
        // Check if we're on the homepage
        const isHomePage = pathname === "/"
        
        // Helper function to get the correct href for anchor links
        const getHref = (anchor: string) => {
          if (anchor === "/lokality") return "/lokality"
          if (isHomePage) return anchor
          return `/${anchor.startsWith("#") ? anchor.slice(1) : anchor}`
        }

        const navItems = [
          { name: t.nav.home, href: isHomePage ? "#" : "/" },
          { name: t.nav.services, href: isHomePage ? "#services" : "/#services" },
          { name: t.nav.howItWorks, href: isHomePage ? "#how-it-works" : "/#how-it-works" },
          { name: "Lokality", href: "/lokality" },
          { name: t.nav.reviews, href: isHomePage ? "#reviews" : "/#reviews" },
          { name: t.nav.contact, href: isHomePage ? "#contact" : "/#contact" },
        ]

        return (
          <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${
              scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-xl" : "bg-transparent py-6"
            }`}
          >
            <div className="container mx-auto px-6">
              <div className="relative flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 z-20">
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

                {/* Desktop Navigation - Hidden on calc page */}
                {!isCalcPage && (
                  <nav className="hidden lg:flex items-center" aria-label="Main navigation">
                    <div className="flex items-center space-x-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="relative px-5 py-2 text-sm uppercase tracking-widest text-zinc-300 transition-colors hover:text-primary group"
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

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center space-x-4">
                  {/* Language Switcher */}
                  <LanguageSwitcher variant="minimal" />

                  {/* Book Now Button */}
                  <a href="https://services.bookio.com/crystal-detailing-ob6b7b8y/widget?lang=sk" target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 uppercase tracking-widest text-sm"
                    >
                      {t.common.bookNow}
                    </motion.button>
                  </a>
                </div>

                {/* Mobile Menu Button and Language Switcher - Hidden on calc page */}
                {!isCalcPage && (
                  <div className="lg:hidden flex items-center space-x-2 z-20">
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
                {/* Mobile Language Switcher only on calc page */}
                {isCalcPage && (
                  <div className="lg:hidden flex items-center space-x-2 z-20">
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
                    className="fixed top-0 left-0 w-full h-screen z-50 bg-black backdrop-blur-md lg:hidden"
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
                            className="text-xl uppercase tracking-widest text-zinc-200 hover:text-primary transition-colors"
                            onClick={handleLinkClick}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <a href="https://services.bookio.com/crystal-detailing-ob6b7b8y/widget?lang=sk" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
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
      }}
    </LanguageWrapper>
  )
}
