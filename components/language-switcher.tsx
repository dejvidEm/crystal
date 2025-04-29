"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  variant?: "icon" | "full" | "minimal"
  className?: string
}

export function LanguageSwitcher({ variant = "full", className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage, t, isChanging } = useLanguage()
  const [open, setOpen] = useState(false)

  const handleLanguageChange = (newLanguage: "en" | "sk") => {
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
          <DropdownMenuItem
            className={`${language === "en" ? "bg-white/10" : ""} hover:bg-white/10 text-zinc-200`}
            onClick={() => handleLanguageChange("en")}
            disabled={isChanging}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`${language === "sk" ? "bg-white/10" : ""} hover:bg-white/10 text-zinc-200`}
            onClick={() => handleLanguageChange("sk")}
            disabled={isChanging}
          >
            Slovenčina
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center space-x-2">
        <button
          className={`text-sm ${language === "en" ? "text-primary" : "text-zinc-400 hover:text-zinc-200"} ${
            isChanging ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleLanguageChange("en")}
          disabled={isChanging}
        >
          EN
        </button>
        <span className="text-zinc-500">|</span>
        <button
          className={`text-sm ${language === "sk" ? "text-primary" : "text-zinc-400 hover:text-zinc-200"} ${
            isChanging ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleLanguageChange("sk")}
          disabled={isChanging}
        >
          SK
        </button>
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
          {language === "en" ? "English" : "Slovenčina"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md border-zinc-800">
        <DropdownMenuItem
          className={`${language === "en" ? "bg-white/10" : ""} hover:bg-white/10 text-zinc-200`}
          onClick={() => handleLanguageChange("en")}
          disabled={isChanging}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${language === "sk" ? "bg-white/10" : ""} hover:bg-white/10 text-zinc-200`}
          onClick={() => handleLanguageChange("sk")}
          disabled={isChanging}
        >
          Slovenčina
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
