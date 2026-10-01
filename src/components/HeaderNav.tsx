"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

interface HeaderNavProps {
  currentVariant?: "oceanic" | "lavande";
  onSelectVariant?: (variant: "oceanic" | "lavande") => void;
}

export default function HeaderNav({
  currentVariant = "oceanic",
  onSelectVariant,
}: HeaderNavProps) {
  const pathname = usePathname();
  const { lang, setLang, t, isRtl } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isFormula = pathname.startsWith("/formula");
  const isWholesale = pathname.startsWith("/wholesale");

  const languages: { code: Language; label: string }[] = [
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "AR", label: "العربية" },
  ];

  return (
    <header className="w-full border-b border-[#C5A059]/30 bg-[#070D1D]/90 backdrop-blur-md z-40">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand: APOLYON */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="group focus:outline-none">
            <span className="text-xl sm:text-2xl font-serif-brand font-medium tracking-[0.28em] text-[#FAF6EE] group-hover:text-[#C5A059] transition-colors">
              APOLYON
            </span>
          </Link>
        </div>

        {/* Center Links matching mockup */}
        <nav className="hidden md:flex items-center space-x-10 text-[11px] font-medium tracking-[0.22em] text-[#C5CBD3] uppercase">
          <Link
            href="/"
            className={`transition-colors py-1 relative ${
              isHome
                ? "text-[#FAF6EE] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C5A059]"
                : "hover:text-[#FAF6EE]"
            }`}
          >
            {t.nav.home[lang]}
          </Link>

          <Link
            href="/formula"
            className={`transition-colors py-1 relative ${
              isFormula
                ? "text-[#FAF6EE] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C5A059]"
                : "hover:text-[#FAF6EE]"
            }`}
          >
            {t.nav.formula[lang]}
          </Link>

          {/* Oceanic / Lavande Toggle */}
          {onSelectVariant ? (
            <button
              type="button"
              onClick={() => onSelectVariant(currentVariant === "oceanic" ? "lavande" : "oceanic")}
              className="hover:text-[#FAF6EE] transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
            >
              <span>
                {currentVariant === "oceanic" ? t.nav.oceanic[lang] : t.nav.lavande[lang]}
              </span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded border border-[#C5A059]/40 text-[#C5A059]">
                {currentVariant === "oceanic" ? "Navy" : "Purple"}
              </span>
            </button>
          ) : (
            <span className="text-[#C5CBD3] py-1">{t.nav.oceanic[lang]}</span>
          )}

          <Link
            href="/wholesale"
            className={`transition-colors py-1 relative ${
              isWholesale
                ? "text-[#FAF6EE] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#C5A059]"
                : "hover:text-[#FAF6EE]"
            }`}
          >
            {t.nav.wholesale[lang]}
          </Link>
        </nav>

        {/* Right side: Language Switcher & PRE-ORDER button matching mockup */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative flex items-center space-x-1 text-[11px] font-mono tracking-wider text-[#C5CBD3]">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center space-x-1 hover:text-[#FAF6EE] py-1 cursor-pointer"
              aria-label="Select Language"
            >
              <span>{lang}</span>
              <ChevronDown className="w-3 h-3 text-[#C5CBD3]" />
            </button>
            <span className="text-[#C5A059]/40 ml-2">|</span>

            {langOpen && (
              <div
                className={`absolute top-8 w-28 bg-[#0B132B] border border-[#C5A059]/30 rounded shadow-2xl py-1 z-50 text-[11px] font-mono ${
                  isRtl ? "left-0" : "right-6"
                }`}
              >
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#C5A059]/15 transition-colors cursor-pointer flex items-center justify-between ${
                      lang === item.code ? "text-[#C5A059] font-bold bg-[#C5A059]/10" : "text-[#C5CBD3]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] opacity-60">({item.code})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/wholesale"
            className={`px-5 py-2 text-[10px] font-medium tracking-[0.25em] uppercase transition-all duration-200 ${
              isWholesale
                ? "bg-[#C5A059] text-[#070D1D] font-bold border border-[#C5A059]"
                : "text-[#FAF6EE] border border-[#C5A059] hover:bg-[#C5A059] hover:text-[#070D1D]"
            }`}
          >
            {t.nav.preOrder[lang]}
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <Link
            href="/wholesale"
            className="px-3 py-1 text-[10px] uppercase font-mono border border-[#C5A059] text-[#C5A059]"
          >
            {t.nav.preOrder[lang]}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-[#FAF6EE]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#070D1D] border-b border-[#C5A059]/30 px-6 py-6 space-y-4 text-xs font-mono tracking-widest uppercase">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`block py-2 ${isHome ? "text-[#C5A059] font-bold" : "text-[#C5CBD3]"}`}
          >
            {t.nav.home[lang]}
          </Link>
          <Link
            href="/formula"
            onClick={() => setMobileOpen(false)}
            className={`block py-2 ${isFormula ? "text-[#C5A059] font-bold" : "text-[#C5CBD3]"}`}
          >
            {t.nav.formula[lang]}
          </Link>
          <Link
            href="/wholesale"
            onClick={() => setMobileOpen(false)}
            className={`block py-2 ${isWholesale ? "text-[#C5A059] font-bold" : "text-[#C5CBD3]"}`}
          >
            {t.nav.wholesale[lang]}
          </Link>

          {/* Language Switcher in Mobile Drawer */}
          <div className="pt-4 border-t border-[#C5A059]/20 flex items-center justify-between">
            <span className="text-[10px] text-[#C5CBD3]">LANG:</span>
            <div className="flex space-x-2">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLang(item.code);
                    setMobileOpen(false);
                  }}
                  className={`px-2.5 py-1 text-[11px] rounded border ${
                    lang === item.code
                      ? "border-[#C5A059] text-[#C5A059] font-bold bg-[#C5A059]/10"
                      : "border-white/10 text-white/60"
                  }`}
                >
                  {item.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
