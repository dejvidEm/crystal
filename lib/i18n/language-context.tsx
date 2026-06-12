"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "./en"
import { de } from "./de"
import { sk } from "./sk"
import { setLanguageCookie, type Language } from "./language-cookie"

type Translations = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
  isChanging: boolean
}

const translations: Record<Language, Translations> = {
  en,
  de,
  sk,
}

const defaultLanguage: Language = "sk"
const defaultTranslations = translations[defaultLanguage]

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: defaultTranslations,
  isChanging: false,
})

interface LanguageProviderProps {
  children: ReactNode
  /** Jazyk z cookie na serveri — musí zodpovedať prvému klientskemu renderu. */
  initialLanguage?: Language
}

export function LanguageProvider({ children, initialLanguage = defaultLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage === "en" || storedLanguage === "sk" || storedLanguage === "de") {
        setLanguageState(storedLanguage)
        setLanguageCookie(storedLanguage)
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
          setLanguageCookie(pendingLanguage)
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

  const t = translations[language] ?? translations.sk

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isChanging }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
