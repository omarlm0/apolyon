"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavigationProps {
  currentVariant: "oceanic" | "lavender";
  onSelectVariant: (variant: "oceanic" | "lavender") => void;
}

export default function Navigation({
  currentVariant,
  onSelectVariant,
}: NavigationProps) {
  const [lang, setLang] = useState<"EN" | "FR" | "AR">("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070D1D]/90 backdrop-blur-md border-b border-[#C5A059]/25">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Left: APOLYON Brand */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => scrollTo("hero")}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-serif-brand font-medium tracking-[0.28em] text-[#FAF6EE] group-hover:text-[#C5A059] transition-colors">
              APOLYON
            </span>
          </button>
        </div>

        {/* Center: Navigation Links matching PDF */}
        <nav className="hidden md:flex items-center space-x-10 text-[11px] font-medium tracking-[0.22em] text-[#C5CBD3] uppercase">
          <button
            onClick={() => scrollTo("hero")}
            className="hover:text-[#FAF6EE] transition-colors relative py-1 border-b border-[#C5A059] text-[#FAF6EE]"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo("formula")}
            className="hover:text-[#FAF6EE] transition-colors py-1"
          >
            The Formula
          </button>
          <button
            onClick={() => {
              onSelectVariant("oceanic");
              scrollTo("hero");
            }}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              currentVariant === "oceanic" ? "text-[#C5A059] font-semibold" : "hover:text-[#FAF6EE]"
            }`}
          >
            Oceanic
          </button>
          <button
            onClick={() => {
              onSelectVariant("lavender");
              scrollTo("hero");
            }}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              currentVariant === "lavender" ? "text-[#D4AF37] font-semibold" : "hover:text-[#FAF6EE]"
            }`}
          >
            Lavande
          </button>
          <button
            onClick={() => scrollTo("reserve")}
            className="hover:text-[#FAF6EE] transition-colors py-1"
          >
            Wholesale
          </button>
        </nav>

        {/* Right: Language Switcher & PRE-ORDER button matching PDF */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center space-x-1 text-[11px] font-mono tracking-wider text-[#C5CBD3] hover:text-[#FAF6EE] py-1"
            >
              <span>{lang}</span>
              <ChevronDown className="w-3 h-3 text-[#C5CBD3]" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-[#0B132B] border border-[#C5A059]/30 rounded shadow-2xl py-1 z-50 text-[11px] font-mono">
                {(["EN", "FR", "AR"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#C5A059]/15 transition-colors ${
                      lang === l ? "text-[#C5A059] font-bold" : "text-[#C5CBD3]"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Exact PRE-ORDER rectangular button from PDF */}
          <button
            onClick={() => scrollTo("reserve")}
            className="px-5 py-2 text-[10px] font-medium tracking-[0.25em] uppercase text-[#FAF6EE] border border-[#C5A059] hover:bg-[#C5A059] hover:text-[#070D1D] transition-all duration-200"
          >
            Pre-Order
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={() => scrollTo("reserve")}
            className="px-3 py-1 text-[10px] uppercase font-mono border border-[#C5A059] text-[#C5A059]"
          >
            Pre-Order
          </button>
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
          <button
            onClick={() => scrollTo("hero")}
            className="block w-full text-left py-2 text-[#C5A059]"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo("formula")}
            className="block w-full text-left py-2 text-[#C5CBD3] hover:text-[#FAF6EE]"
          >
            The Formula
          </button>
          <button
            onClick={() => {
              onSelectVariant("oceanic");
              scrollTo("hero");
            }}
            className="block w-full text-left py-2 text-[#C5CBD3] hover:text-[#FAF6EE]"
          >
            Oceanic Collection
          </button>
          <button
            onClick={() => {
              onSelectVariant("lavender");
              scrollTo("hero");
            }}
            className="block w-full text-left py-2 text-[#C5CBD3] hover:text-[#FAF6EE]"
          >
            Lavender Collection
          </button>
          <button
            onClick={() => scrollTo("reserve")}
            className="block w-full text-left py-2 text-[#C5CBD3] hover:text-[#FAF6EE]"
          >
            Wholesale
          </button>
        </div>
      )}
    </header>
  );
}
