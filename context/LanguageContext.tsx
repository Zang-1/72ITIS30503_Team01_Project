'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import vi from '@/locales/vi';
import en from '@/locales/en';

export type Locale = 'vi' | 'en';

type Translations = typeof vi;

const dictionaries: Record<Locale, Translations> = { vi, en };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved locale from localStorage on mount
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('app-locale') as Locale | null;
      if (savedLocale && (savedLocale === 'vi' || savedLocale === 'en')) {
        setLocaleState(savedLocale);
      }
    } catch (error) {
      console.error('Failed to load locale from localStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  // Persist locale to localStorage when it changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('app-locale', locale);
      // Also update the <html lang="..."> attribute dynamically
      document.documentElement.lang = locale;
    } catch (error) {
      console.error('Failed to save locale to localStorage:', error);
    }
  }, [locale, isHydrated]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: keyof Translations): string => {
      return dictionaries[locale][key] || key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
