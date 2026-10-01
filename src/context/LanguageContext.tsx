"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    // Check localStorage on mount
    const saved = localStorage.getItem("apolyon_lang") as Language | null;
    if (saved && (saved === "EN" || saved === "FR" || saved === "AR")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("apolyon_lang", newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang.toLowerCase();
      document.documentElement.dir = newLang === "AR" ? "rtl" : "ltr";
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang.toLowerCase();
      document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
    }
  }, [lang]);

  const isRtl = lang === "AR";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations, isRtl }}>
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
