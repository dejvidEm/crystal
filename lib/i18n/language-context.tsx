"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "./en"
import { sk } from "./sk"

type Language = "en" | "sk"
type Translations = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
  isChanging: boolean
}

const translations = {
  en,
  sk,
}

// Default to Slovak translations for server-side rendering
const defaultLanguage: Language = "sk"
const defaultTranslations = translations[defaultLanguage]

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: defaultTranslations,
  isChanging: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem("language") as Language | null
      if (storedLanguage && (storedLanguage === "en" || storedLanguage === "sk")) {
        setLanguageState(storedLanguage)
      } else {
        const browserLanguage = navigator.language.split("-")[0]
        if (browserLanguage === "sk") {
          setLanguageState("sk")
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  useEffect(() => {
    if (pendingLanguage && isChanging) {
      const timer = setTimeout(() => {
        setLanguageState(pendingLanguage)
        setPendingLanguage(null)
        setIsChanging(false)

        try {
          localStorage.setItem("language", pendingLanguage)
        } catch (error) {
          console.error("Error setting localStorage:", error)
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [pendingLanguage, isChanging])

  const setLanguage = (newLanguage: Language) => {
    if (newLanguage !== language && !isChanging) {
      setIsChanging(true)
      setPendingLanguage(newLanguage)
    }
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isChanging }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
