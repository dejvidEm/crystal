"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { bookioUrl } from "@/lib/site-config"
import { getServicePageCopy, SERVICE_PAGE_SLUGS } from "@/lib/service-pages-data"

const navLinkClass =
  "relative whitespace-nowrap px-5 py-4 text-sm uppercase tracking-widest text-zinc-300 transition-colors hover:text-primary group"

export function Navbar() {
  const pathnameRaw = usePathname()
  const pathname = pathnameRaw ?? "/"
  const isCalcPage = pathname === "/calc"
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [servicesHovered, setServicesHovered] = useState(false)
  const [servicesDropdownDismissed, setServicesDropdownDismissed] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const showServicesDropdown = servicesHovered && !servicesDropdownDismissed

  const lang = language === "en" ? "en" : "sk"

  const serviceNavLinks = useMemo(
    () =>
      SERVICE_PAGE_SLUGS.map((slug) => ({
        slug,
        href: `/${slug}`,
        label: getServicePageCopy(slug, lang)?.h1 ?? slug,
      })),
    [lang],
  )

  const isServicePageActive = serviceNavLinks.some((link) => pathname === link.href)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const handleLinkClick = () => {
    setIsOpen(false)
    setServicesOpen(false)
    setServicesDropdownDismissed(true)
  }

  const handleServicesMainClick = () => {
    setServicesDropdownDismissed(true)
    handleLinkClick()
  }

  const handleServicesMouseLeave = () => {
    setServicesHovered(false)
    setServicesDropdownDismissed(false)
  }

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
  const servicesHref = isHomePage ? "#services" : "/#services"

  const navItems = [
    { name: t.nav.aboutUs, href: "/o-nas" },
    { name: t.nav.pricing, href: "/cennik" },
    { name: t.nav.howItWorks, href: isHomePage ? "#how-it-works" : "/#how-it-works" },
    { name: "Lokality", href: "/lokality" },
    { name: t.nav.blog, href: "/blog" },
    { name: t.nav.reviews, href: isHomePage ? "#reviews" : "/#reviews" },
    { name: t.nav.contact, href: isHomePage ? "#contact" : "/#contact" },
  ]

  const servicesTriggerClass = `${navLinkClass} inline-flex items-center gap-1 ${
    isServicePageActive ? "text-primary" : ""
  }`

  function renderNavLink(item: { name: string; href: string }) {
    return (
      <Link key={item.name} href={item.href} className={navLinkClass} onClick={handleLinkClick}>
        {item.name}
        <motion.span
          className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
        />
      </Link>
    )
  }

  function renderServicesDropdown() {
    return (
      <div
        className="relative"
        onMouseEnter={() => setServicesHovered(true)}
        onMouseLeave={handleServicesMouseLeave}
      >
        <Link
          href={servicesHref}
          className={servicesTriggerClass}
          aria-haspopup="true"
          aria-expanded={showServicesDropdown}
          aria-label={t.nav.servicesMenu}
          onClick={handleServicesMainClick}
        >
          {t.nav.services}
          <ChevronDown
            className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${
              showServicesDropdown ? "rotate-180" : ""
            }`}
            aria-hidden
          />
          <span
            className={`absolute bottom-0 left-5 right-5 h-px bg-primary transition-all duration-300 ${
              showServicesDropdown ? "w-[calc(100%-2.5rem)]" : "w-0"
            }`}
          />
        </Link>

        <div
          className={`absolute left-1/2 top-full z-50 w-[14rem] -translate-x-1/2 pt-2 transition-opacity duration-200 ${
            showServicesDropdown
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          role="menu"
        >
          <div className="overflow-hidden rounded-md border border-zinc-800 bg-black/95 py-1 shadow-lg backdrop-blur-md">
            {serviceNavLinks.map((link) => (
              <Link
                key={link.slug}
                href={link.href}
                role="menuitem"
                onClick={handleLinkClick}
                className={`block px-4 py-2.5 text-sm uppercase tracking-widest text-zinc-300 transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none ${
                  pathname === link.href ? "text-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  function renderMobileServices() {
    return (
      <div className="flex w-full max-w-xs flex-col items-center">
        <div className="inline-flex items-center gap-3">
          <Link
            href={servicesHref}
            className="text-xl uppercase tracking-widest text-zinc-200 transition-colors hover:text-primary"
            onClick={handleLinkClick}
          >
            {t.nav.services}
          </Link>
          <button
            type="button"
            onClick={() => setServicesOpen((open) => !open)}
            className="text-zinc-200 transition-colors hover:text-primary"
            aria-expanded={servicesOpen}
            aria-controls="mobile-services-submenu"
            aria-label={t.nav.servicesMenu}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </div>
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              id="mobile-services-submenu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex flex-col items-center gap-4 overflow-hidden"
            >
              {serviceNavLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={link.href}
                  className={`text-base uppercase tracking-widest transition-colors ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-zinc-400 hover:text-primary"
                  }`}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-7 shadow-xl" : "bg-transparent py-11"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex w-full items-center justify-between 2xl:justify-center">
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

          {!isCalcPage && (
            <nav
              className="hidden shrink-0 items-center 2xl:flex"
              aria-label="Main navigation"
            >
              <div className="flex items-center space-x-2">
                {renderNavLink(navItems[0])}
                {renderNavLink(navItems[1])}
                {renderServicesDropdown()}
                {navItems.slice(2).map((item) => renderNavLink(item))}
              </div>
            </nav>
          )}

          <div className="hidden shrink-0 items-center space-x-5 2xl:ml-16 2xl:flex">
            <LanguageSwitcher variant="minimal" />
            <a href={bookioUrl(language)} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-primary bg-transparent px-6 py-4 text-sm uppercase tracking-widest text-primary transition-colors duration-300 hover:bg-primary/10"
              >
                {t.common.bookNow}
              </motion.button>
            </a>
          </div>

          {!isCalcPage && (
            <div className="z-20 flex items-center gap-4 2xl:hidden">
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
            <div className="z-20 flex items-center gap-4 2xl:hidden">
              <LanguageSwitcher variant="icon" />
            </div>
          )}

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed left-0 top-0 z-50 h-screen w-full bg-black backdrop-blur-md 2xl:hidden"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-6 top-6 z-50 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-primary" />
                </button>

                <div className="flex h-full flex-col items-center justify-center">
                  <nav className="flex flex-col items-center space-y-8" aria-label="Mobile navigation">
                    <Link
                      href="/o-nas"
                      className="whitespace-nowrap text-xl uppercase tracking-widest text-zinc-200 transition-colors hover:text-primary"
                      onClick={handleLinkClick}
                    >
                      {t.nav.aboutUs}
                    </Link>
                    <Link
                      href="/cennik"
                      className="whitespace-nowrap text-xl uppercase tracking-widest text-zinc-200 transition-colors hover:text-primary"
                      onClick={handleLinkClick}
                    >
                      {t.nav.pricing}
                    </Link>
                    {renderMobileServices()}
                    {navItems.slice(2).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="whitespace-nowrap text-xl uppercase tracking-widest text-zinc-200 transition-colors hover:text-primary"
                        onClick={handleLinkClick}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <a
                      href={bookioUrl(language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 border border-primary bg-transparent px-8 py-3 uppercase tracking-widest text-primary transition-colors duration-300 hover:bg-primary/10"
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
