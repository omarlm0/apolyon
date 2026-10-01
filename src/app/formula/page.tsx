"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Wind, Feather, Droplet, ArrowRight } from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import BottomPillars from "@/components/BottomPillars";
import DosageModal from "@/components/DosageModal";
import { useLanguage } from "@/context/LanguageContext";

export default function FormulaPage() {
  const [currentVariant, setCurrentVariant] = useState<"oceanic" | "lavender">("oceanic");
  const [dosageOpen, setDosageOpen] = useState(false);
  const { lang, t, isRtl } = useLanguage();
  const isOceanic = currentVariant === "oceanic";

  const scents = isOceanic ? t.formula.scentsOceanic : t.formula.scentsLavender;
  const gradientStyles = isOceanic
    ? [
        "from-blue-400 via-sky-500 to-indigo-700",
        "from-neutral-100 via-stone-200 to-amber-100",
        "from-slate-100 via-blue-50 to-neutral-200",
      ]
    : [
        "from-purple-300 via-purple-500 to-indigo-700",
        "from-neutral-100 via-stone-200 to-amber-100",
        "from-rose-100 via-purple-100 to-amber-50",
      ];

  return (
    <div className="min-h-screen bg-[#070D1D] p-2 sm:p-4 flex flex-col justify-between selection:bg-[#C5A059]/30">
      {/* Outer Vitrine Gold Frame matching mockup */}
      <div className="flex-1 w-full border border-[#C5A059]/40 rounded-sm bg-[#070D1D] flex flex-col justify-between overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Navigation */}
        <HeaderNav
          currentVariant={currentVariant}
          onSelectVariant={setCurrentVariant}
        />

        {/* Main Content matching media_1790517002839.jpg */}
        <main className="flex-1 relative flex items-center px-6 sm:px-12 py-8 overflow-hidden">
          {/* Subtle Arch Background glow */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-900/10 via-amber-100/5 to-transparent pointer-events-none" />

          <div className="max-w-[1340px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
            {/* Left Column: Bottle with Drapery & Archway */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px]">
              {/* Velvet Navy Drapery Graphic on Left */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-transparent rounded-r-3xl pointer-events-none hidden sm:block" />

              {/* Mediterranean Coastal Arch Silhouette */}
              <div className="absolute inset-0 m-auto w-72 h-88 border-t-8 border-l-4 border-r-4 border-[#C5A059]/30 rounded-t-full pointer-events-none opacity-40 hidden sm:block" />

              {/* The 5L Bottle Showcase */}
              <div className="relative w-64 sm:w-76 aspect-[420/655] z-20 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
                <Image
                  src={
                    isOceanic
                      ? "/images/oceanic-front.jpg"
                      : "/images/lavender-front.jpg"
                  }
                  alt={isOceanic ? "Apolyon Oceanic Formula" : "Apolyon Lavender Formula"}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 260px, 320px"
                />
              </div>

              {/* Water Splash & Stone Pedestal effect at base */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 h-16 bg-gradient-to-t from-[#070D1D] via-blue-950/40 to-transparent pointer-events-none">
                <div className="w-full h-full opacity-60 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-200/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Right Column: Exact WARM IVORY PANEL */}
            <div className="lg:col-span-7 bg-[#FAF6EE] text-[#070D1D] p-6 sm:p-10 shadow-2xl border border-[#C5A059]/40 relative">
              {/* Eyebrow: THE FORMULA */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center space-x-3 text-[#C5A059] text-[10px] font-mono tracking-[0.3em] uppercase">
                  <span className="w-8 h-px bg-[#C5A059]" />
                  <span>{t.formula.eyebrow[lang]}</span>
                  <span className="w-8 h-px bg-[#C5A059]" />
                </div>

                {/* Headline */}
                <h1 className="text-2xl sm:text-4xl font-serif-brand font-medium tracking-tight text-[#070D1D] mt-2 leading-tight uppercase">
                  {t.formula.title1[lang]} <br />
                  {t.formula.title2[lang]}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#4A5568] font-light max-w-lg mx-auto mt-2 leading-relaxed">
                  {t.formula.desc[lang]}
                </p>
              </div>

              {/* 3 Columns Divided by Vertical Lines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D6CEBF] py-5 border-t border-b border-[#D6CEBF] text-center my-4">
                {/* Column 1 */}
                <div className="px-3 py-2 sm:py-0 flex flex-col items-center">
                  <Sparkles className="w-6 h-6 text-[#C5A059] mb-1.5" />
                  <h4 className="text-[11px] font-serif-brand font-semibold uppercase tracking-wider text-[#070D1D] mb-1">
                    {t.pillars.deepClean[lang]}
                  </h4>
                  <p className="text-[10px] text-[#5A6578] leading-normal">
                    {t.formula.deepCleanDesc[lang]}
                  </p>
                </div>

                {/* Column 2 */}
                <div className="px-3 py-2 sm:py-0 flex flex-col items-center">
                  <Wind className="w-6 h-6 text-[#C5A059] mb-1.5" />
                  <h4 className="text-[11px] font-serif-brand font-semibold uppercase tracking-wider text-[#070D1D] mb-1">
                    {t.pillars.freshness[lang]}
                  </h4>
                  <p className="text-[10px] text-[#5A6578] leading-normal">
                    {isOceanic
                      ? t.formula.freshnessDescOceanic[lang]
                      : t.formula.freshnessDescLavender[lang]}
                  </p>
                </div>

                {/* Column 3 */}
                <div className="px-3 py-2 sm:py-0 flex flex-col items-center">
                  <Feather className="w-6 h-6 text-[#C5A059] mb-1.5" />
                  <h4 className="text-[11px] font-serif-brand font-semibold uppercase tracking-wider text-[#070D1D] mb-1">
                    {t.pillars.softness[lang]}
                  </h4>
                  <p className="text-[10px] text-[#5A6578] leading-normal">
                    {t.formula.softnessDesc[lang]}
                  </p>
                </div>
              </div>

              {/* Scent Signature Bar & 5L Dosage Pill */}
              <div className="pt-2">
                <div className="text-center mb-3">
                  <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#C5A059]">
                    ─── {isOceanic ? t.formula.scentSignatureOceanic[lang] : t.formula.scentSignatureLavender[lang]} ───
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* 3 Circular Scent Swatches */}
                  <div className="flex items-center justify-center space-x-6">
                    {scents.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradientStyles[idx]} border border-[#C5A059]/40 shadow-inner flex items-center justify-center text-base mb-1`}
                        >
                          <span className="opacity-90">{item.symbol}</span>
                        </div>
                        <span className="text-[9px] font-mono tracking-wider uppercase text-[#070D1D] font-semibold">
                          {item.name[lang]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden sm:block w-px h-14 bg-[#D6CEBF]" />

                  {/* 5L Concentrated Pill & View Directions link */}
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                    <div className="flex items-center space-x-2 border border-[#C5A059] px-3.5 py-1 rounded-full bg-white/70">
                      <Droplet className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="text-[10px] font-mono font-bold text-[#070D1D] tracking-widest uppercase">
                        {t.formula.concentratedBadge[lang]}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDosageOpen(true)}
                      className="text-[9px] font-mono tracking-widest uppercase text-[#C5A059] hover:text-[#070D1D] font-semibold flex items-center pt-1 group cursor-pointer"
                    >
                      <span>{t.formula.viewDirections[lang]}</span>
                      <ArrowRight className={`w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform ${isRtl ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom 4-Pillars Strip */}
        <BottomPillars />

        {/* Dosage Modal */}
        <DosageModal
          isOpen={dosageOpen}
          onClose={() => setDosageOpen(false)}
          variant={currentVariant}
        />
      </div>
    </div>
  );
}
