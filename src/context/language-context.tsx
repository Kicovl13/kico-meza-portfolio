"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, type Language, type TranslationDictionary } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check if user previously saved a manual preference
    const saved = localStorage.getItem("portfolio_lang") as Language | null;
    if (saved === "es" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved;
      return;
    }

    // 2. Auto-detect by location & browser language
    try {
      const browserLang = (navigator.language || (navigator as any).userLanguage || "").toLowerCase();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

      const spanishZones = [
        "mexico",
        "cancun",
        "tijuana",
        "monterrey",
        "bogota",
        "buenos_aires",
        "santiago",
        "lima",
        "caracas",
        "madrid",
        "guatemala",
        "san_jose",
        "panama",
        "montevideo",
      ];

      const isSpanishZone = spanishZones.some((z) => timeZone.toLowerCase().includes(z));
      const isSpanishLang = browserLang.startsWith("es");

      // If user is from a Spanish-speaking locale or timezone, use "es", else "en"
      const detected: Language = isSpanishLang || isSpanishZone ? "es" : "en";
      setLangState(detected);
      document.documentElement.lang = detected;
    } catch {
      setLangState("es");
      document.documentElement.lang = "es";
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("portfolio_lang", newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
