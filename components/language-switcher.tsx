"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Language } from "@/lib/i18n/language-cookie"
import { LOCALE_LABELS, LOCALE_SHORT } from "@/lib/i18n/locale"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  variant?: "icon" | "full" | "minimal"
  className?: string
}

const LANGUAGES: Language[] = ["sk", "en", "de"]

export function LanguageSwitcher({ variant = "full", className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage, t, isChanging } = useLanguage()
  const [open, setOpen] = useState(false)

  const handleLanguageChange = (newLanguage: Language) => {
    if (language !== newLanguage && !isChanging) {
      setLanguage(newLanguage)
    }
    setOpen(false)
  }

  if (variant === "icon") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full hover:bg-white/10 ${className}`}
            aria-label={t.languageSwitcher.changeLanguage}
            disabled={isChanging}
          >
            <Globe className={`h-5 w-5 ${isChanging ? "opacity-50" : ""}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md border-zinc-800">
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem
              key={lang}
              className={`${language === lang ? "bg-white/10" : ""} hover:bg-white/10 text-zinc-200`}
              onClick={() => handleLanguageChange(lang)}
              disabled={isChanging}
            >
              {LOCALE_LABELS[lang]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center space-x-2">
        {LANGUAGES.map((lang, index) => (
          <span key={lang} className="flex items-center gap-2">
            {index > 0 && <span className="text-zinc-500">|</span>}
            <button
              className={`text-sm ${language === lang ? "text-primary" : "text-zinc-400 hover:text-zinc-200"} ${
                isChanging ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleLanguageChange(lang)}
              disabled={isChanging}
            >
              {LOCALE_SHORT[lang]}
            </button>
          </span>
        ))}
      </div>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`hover:bg-white/10 ${className}`}
          aria-label={t.languageSwitcher.changeLanguage}
          disabled={isChanging}
        >
          <Globe className={`h-4 w-4 mr-2 ${isChanging ? "opacity-50" : ""}`} />
          {LOCALE_LABELS[language]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md border-zinc-800">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className={`${language === lang ? "bg-white/10" : ""} hover:bg-white/10 text-zinc-200`}
            onClick={() => handleLanguageChange(lang)}
            disabled={isChanging}
          >
            {LOCALE_LABELS[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
