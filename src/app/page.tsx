"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import BottomPillars from "@/components/BottomPillars";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const [currentVariant, setCurrentVariant] = useState<"oceanic" | "lavande">("oceanic");
  const { lang, t, isRtl } = useLanguage();
  const isOceanic = currentVariant === "oceanic";

  return (
    <div className="min-h-screen bg-[#070D1D] p-2 sm:p-4 flex flex-col justify-between selection:bg-[#C5A059]/30">
      {/* Outer Vitrine Gold Border matching mockup */}
      <div className="flex-1 w-full border border-[#C5A059]/40 rounded-sm bg-[#070D1D] flex flex-col justify-between overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Header Navigation */}
        <HeaderNav
          currentVariant={currentVariant}
          onSelectVariant={setCurrentVariant}
        />

        {/* Hero Section Container */}
        <main className="flex-1 relative flex items-center px-6 sm:px-12 py-8 overflow-hidden">
          {/* Background Ambient Lighting & Moon */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Glowing Moon in Upper Right matching mockup */}
            <div className="absolute top-10 right-[18%] w-24 h-24 rounded-full bg-radial from-[#FFFDF0] via-[#EAE3CB] to-transparent opacity-80 blur-[1px] shadow-[0_0_50px_rgba(255,253,240,0.45)]" />
            
            {/* Ambient Oceanic / Lavender Glow */}
            <div
              className={`absolute top-1/4 right-[10%] w-[500px] h-[500px] rounded-full blur-[140px] transition-colors duration-700 ${
                isOceanic ? "bg-blue-600/20" : "bg-purple-600/25"
              }`}
            />
          </div>

          <div className="max-w-[1340px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
            {/* Left Column: Typography & CTAs matching mockup */}
            <div className={`lg:col-span-6 space-y-6 ${isRtl ? "text-right" : "text-left"}`}>
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-3 text-[#C5A059] text-[10px] font-mono tracking-[0.3em] uppercase">
                <span className="w-12 h-px bg-[#C5A059]/60" />
                <span>
                  {isOceanic
                    ? t.home.eyebrowOceanic[lang]
                    : t.home.eyebrowLavande[lang]}
                </span>
                <span className="w-12 h-px bg-[#C5A059]/60" />
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif-brand font-normal tracking-tight text-[#FAF6EE] leading-[1.08]">
                {t.home.headlinePart1[lang]} <br />
                <span className="text-[#FAF6EE] font-normal">
                  {t.home.headlinePart2[lang]}
                </span>
              </h1>

              {/* Subhead */}
              <p className="text-xs sm:text-sm text-[#C5CBD3] font-light max-w-md leading-relaxed">
                {t.home.subtitle[lang]}
              </p>

              {/* Dual Action Buttons matching mockup */}
              <div className={`flex flex-wrap items-center gap-4 pt-2 ${isRtl ? "justify-end" : "justify-start"}`}>
                <Link
                  href="/formula"
                  className="px-6 py-3 bg-[#C5A059] text-[#070D1D] text-[10px] font-semibold tracking-[0.25em] uppercase hover:bg-[#D4AF37] transition-all flex items-center space-x-2"
                >
                  <span>
                    {t.home.discoverBtn[lang]} {isOceanic ? "OCEANIC" : "LAVANDE"}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                </Link>

                <Link
                  href="/wholesale"
                  className="px-6 py-3 bg-transparent border border-[#FAF6EE]/40 text-[#FAF6EE] text-[10px] font-medium tracking-[0.25em] uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                >
                  {t.home.wholesaleBtn[lang]}
                </Link>
              </div>

              {/* Slogan with diamond accent matching mockup */}
              <div className="pt-4 text-[10px] tracking-[0.3em] uppercase text-[#C5CBD3]/60 font-mono space-y-1">
                <p>{t.home.sloganTop[lang]}</p>
                <div className={`flex items-center space-x-2 w-32 py-1 ${isRtl ? "ml-auto" : ""}`}>
                  <span className="flex-1 h-px bg-[#C5A059]/30" />
                  <span className="text-[#C5A059] text-[8px]">◆</span>
                  <span className="flex-1 h-px bg-[#C5A059]/30" />
                </div>
                <p>{t.home.sloganBottom[lang]}</p>
              </div>
            </div>

            {/* Right Column: Bottle Showcase */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
              {/* Classical Fluted Column Silhouette on right */}
              <div className="absolute right-0 top-0 bottom-0 w-24 opacity-30 pointer-events-none hidden sm:block">
                <div className="w-full h-full border-r-4 border-l-4 border-double border-[#C5A059]/40 flex flex-col justify-between">
                  <div className="h-8 border-b-2 border-[#C5A059]/40" />
                  <div className="h-8 border-t-2 border-[#C5A059]/40" />
                </div>
              </div>

              {/* Standalone 5L Bottle Showcase */}
              <div className="relative w-full max-w-sm flex items-center justify-center">
                <div className="relative w-64 sm:w-76 aspect-[420/655] z-20 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)]">
                  <Image
                    src={
                      isOceanic
                        ? "/images/oceanic-front.jpg"
                        : "/images/lavande-front.jpg"
                    }
                    alt={isOceanic ? "Apolyon Oceanic 5L" : "Apolyon Lavande 5L"}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 260px, 320px"
                  />
                </div>

                {/* Glowing Cursive Calligraphy Name next to neck */}
                <div className="absolute top-14 sm:top-20 right-0 sm:right-2 z-30 pointer-events-none select-none">
                  <span className="font-script-signature text-5xl sm:text-6xl text-[#EAE3CB] drop-shadow-[0_0_15px_rgba(234,227,203,0.6)] transform -rotate-12 block">
                    {isOceanic ? "Oceanic" : "Lavande"}
                  </span>
                </div>

                {/* Waves & Splashing Sea Foam at base */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-20 bg-gradient-to-t from-[#070D1D] via-blue-950/40 to-transparent z-25 pointer-events-none">
                  <div className="w-full h-full opacity-60 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/30 via-cyan-200/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom 4-Pillars Strip */}
        <BottomPillars />
      </div>
    </div>
  );
}
