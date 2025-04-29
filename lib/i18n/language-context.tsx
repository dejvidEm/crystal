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
  isLoaded: boolean
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
  isLoaded: false,
  isChanging: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    // Check if we have a stored language preference
    try {
      const storedLanguage = localStorage.getItem("language") as Language | null
      if (storedLanguage && (storedLanguage === "en" || storedLanguage === "sk")) {
        setLanguageState(storedLanguage)
      } else {
        // Try to detect browser language
        const browserLanguage = navigator.language.split("-")[0]
        if (browserLanguage === "sk") {
          setLanguageState("sk")
        }
      }
    } catch (error) {
      // Fallback if localStorage is not available
      console.error("Error accessing localStorage:", error)
    }

    setIsLoaded(true)
  }, [])

  // Handle pending language change
  useEffect(() => {
    if (pendingLanguage && isChanging) {
      const timer = setTimeout(() => {
        // Apply the language change after animation
        setLanguageState(pendingLanguage)
        setPendingLanguage(null)
        setIsChanging(false)

        try {
          localStorage.setItem("language", pendingLanguage)
        } catch (error) {
          console.error("Error setting localStorage:", error)
        }
      }, 1000) // This should be less than the animation duration to ensure smooth transition

      return () => clearTimeout(timer)
    }
  }, [pendingLanguage, isChanging])

  const setLanguage = (newLanguage: Language) => {
    if (newLanguage !== language && !isChanging) {
      setIsChanging(true)
      setPendingLanguage(newLanguage)
    }
  }

  // Get translations for the current language
  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded, isChanging }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
