"use client"

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import en from '@/locales/en.json'
import az from '@/locales/az.json'
import ru from '@/locales/ru.json'

const translations = { en, az, ru }

type Language = 'en' | 'az' | 'ru'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('az')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = React.useCallback((key: string): string => {
    const keys = key.split('.')
    let result: unknown = translations[language]
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        result = undefined
        break;
      }
    }
    
    if (result === undefined) {
      // Fallback to English if translation is missing
      let fallbackResult: unknown = translations.en
      for (const fk of keys) {
        if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
          fallbackResult = (fallbackResult as Record<string, unknown>)[fk];
        } else {
          return key
        }
      }
      return String(fallbackResult) || key
    }
    
    return String(result) || key
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang)
      localStorage.setItem('language', lang)
    },
    t,
  }), [language, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}