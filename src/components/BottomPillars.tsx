"use client";

import React from "react";
import { Sparkles, Wind, Feather } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BottomPillars() {
  const { lang, t } = useLanguage();

  return (
    <div className="w-full border-t border-b border-[#C5A059]/30 py-3 bg-[#070D1D]/95 z-30">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/25 text-center">
        {/* 1. Deep Clean */}
        <div className="flex items-center justify-center space-x-2.5 py-1.5 px-4">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
            {t.pillars.deepClean[lang]}
          </span>
        </div>

        {/* 2. Long-Lasting Freshness */}
        <div className="flex items-center justify-center space-x-2.5 py-1.5 px-4">
          <Wind className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
            {t.pillars.freshness[lang]}
          </span>
        </div>

        {/* 3. Natural Softness */}
        <div className="flex items-center justify-center space-x-2.5 py-1.5 px-4">
          <Feather className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
            {t.pillars.softness[lang]}
          </span>
        </div>

        {/* 4. Concentrated Formula */}
        <div className="flex items-center justify-center space-x-2.5 py-1.5 px-4">
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
            {t.pillars.concentrated[lang]}
          </span>
        </div>
      </div>
    </div>
  );
}
