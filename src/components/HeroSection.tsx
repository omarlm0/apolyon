"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Wind, Feather, Droplets } from "lucide-react";

interface HeroSectionProps {
  currentVariant: "oceanic" | "lavande";
  onSelectVariant: (variant: "oceanic" | "lavande") => void;
  onOpenDirections?: () => void;
}

export default function HeroSection({
  currentVariant,
  onSelectVariant,
}: HeroSectionProps) {
  const isOceanic = currentVariant === "oceanic";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-24 pb-0 px-6 sm:px-12 flex flex-col justify-between overflow-hidden bg-[#070D1D]"
    >
      {/* Background Starry & Moonlit Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing Full Moon in upper right (matching PDF Page 2) */}
        <div className="absolute top-16 right-[15%] w-28 h-28 rounded-full bg-radial from-[#FFFDF0] via-[#EAE3CB] to-transparent opacity-85 blur-[1px] shadow-[0_0_60px_rgba(255,253,240,0.4)]" />
        
        {/* Ambient Oceanic / Lavender Haze */}
        <div
          className={`absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full blur-[130px] transition-colors duration-700 ${
            isOceanic ? "bg-blue-600/20" : "bg-purple-600/25"
          }`}
        />
      </div>

      {/* Main Two-Column Layout (Matching PDF Page 2) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10 py-10">
        {/* Left Column: Brand Impact & Typography */}
        <div className="lg:col-span-6 space-y-7 text-left">
          {/* Eyebrow: Exact matching PDF Page 2 */}
          <div className="flex items-center space-x-3 text-[#C5A059] text-[11px] font-mono tracking-[0.3em] uppercase">
            <span className="w-10 h-px bg-[#C5A059]/60" />
            <span>{isOceanic ? "THE OCEANIC COLLECTION" : "THE LAVANDE COLLECTION"}</span>
            <span className="w-10 h-px bg-[#C5A059]/60" />
          </div>

          {/* Headline: Exact matching PDF Page 2 ("A RITUAL OF PURE FRESHNESS") */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif-brand font-normal tracking-tight text-[#FAF6EE] leading-[1.06]">
            A RITUAL OF <br />
            <span className="text-[#FAF6EE] font-normal">
              PURE FRESHNESS
            </span>
          </h1>

          {/* Subtitle: Exact matching PDF Page 2 */}
          <p className="text-sm sm:text-base text-[#C5CBD3] font-light max-w-lg leading-relaxed">
            Concentrated care for deep cleaning,
            <br className="hidden sm:inline" /> lasting freshness and natural softness.
          </p>

          {/* Interactive Variant Switcher Pill */}
          <div className="pt-1">
            <div className="inline-flex p-1 bg-[#0B132B] border border-[#C5A059]/30 rounded-none">
              <button
                type="button"
                onClick={() => onSelectVariant("oceanic")}
                className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-widest transition-all ${
                  isOceanic
                    ? "bg-[#C5A059] text-[#070D1D] font-bold"
                    : "text-[#C5CBD3] hover:text-[#FAF6EE]"
                }`}
              >
                Oceanic (Navy)
              </button>
              <button
                type="button"
                onClick={() => onSelectVariant("lavande")}
                className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-widest transition-all ${
                  !isOceanic
                    ? "bg-[#C5A059] text-[#070D1D] font-bold"
                    : "text-[#C5CBD3] hover:text-[#FAF6EE]"
                }`}
              >
                Lavande (Purple)
              </button>
            </div>
          </div>

          {/* Dual CTAs matching PDF Page 2 */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("formula")}
              className="px-7 py-3.5 bg-[#C5A059] text-[#070D1D] text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-[#D4AF37] transition-all flex items-center space-x-2"
            >
              <span>DISCOVER {isOceanic ? "OCEANIC" : "LAVANDE"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollTo("reserve")}
              className="px-7 py-3.5 bg-transparent border border-[#FAF6EE]/40 text-[#FAF6EE] text-[11px] font-medium tracking-[0.25em] uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
            >
              WHOLESALE PRE-ORDER
            </button>
          </div>

          {/* Slogan matching PDF Page 2 */}
          <div className="pt-4 text-[10px] tracking-[0.3em] uppercase text-[#C5CBD3]/60 font-mono space-y-1">
            <p>CLEANER TOMORROWS</p>
            <p>A MORE BEAUTIFUL EVERYDAY</p>
          </div>
        </div>

        {/* Right Column: Exact Dramatic Bottle Reveal matching PDF Page 2 */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
          {/* Classical Temple Column Silhouette in background right (matching PDF) */}
          <div className="absolute right-0 top-6 bottom-10 w-24 opacity-25 pointer-events-none hidden sm:block">
            <div className="w-full h-full border-r-4 border-l-4 border-double border-[#C5A059]/40 flex flex-col justify-between">
              <div className="h-6 border-b-2 border-[#C5A059]/40" />
              <div className="h-6 border-t-2 border-[#C5A059]/40" />
            </div>
          </div>

          {/* The Bottle Showcase */}
          <div className="relative w-full max-w-sm flex items-center justify-center">
            {/* Standalone Cropped 5L Bottle */}
            <div className="relative w-64 sm:w-76 aspect-[420/655] z-20 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]">
              <Image
                src={
                  isOceanic
                    ? "/images/oceanic-front.jpg"
                    : "/images/lavande-front.jpg"
                }
                alt={isOceanic ? "Apolyon Oceanic 5L Bottle" : "Apolyon Lavande 5L Bottle"}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 260px, 320px"
              />
            </div>

            {/* Glowing Cursive Script Name floating next to bottle neck (Page 2 detail: "Oceanic") */}
            <div className="absolute top-14 sm:top-20 right-0 sm:right-2 z-30 pointer-events-none select-none">
              <span className="font-script-signature text-4xl sm:text-6xl text-[#EAE3CB] drop-shadow-[0_0_15px_rgba(234,227,203,0.6)] transform -rotate-12 block">
                {isOceanic ? "Oceanic" : "Lavande"}
              </span>
            </div>

            {/* Splashing Waves / Sea Foam effect around bottle base (matching PDF Page 2) */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-20 bg-gradient-to-t from-[#070D1D] via-blue-950/40 to-transparent z-25 pointer-events-none">
              {/* Subtle wave foam crests */}
              <div className="w-full h-full opacity-60 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/30 via-cyan-200/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal 4-Pillars Strip (Exact matching Page 2 of PDF) */}
      <div className="w-full border-t border-b border-[#C5A059]/25 py-3.5 bg-[#070D1D]/90 z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/25 text-center">
          {/* Pillar 1 */}
          <div className="flex items-center justify-center space-x-2.5 py-2 px-4">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
              Deep Clean
            </span>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-center justify-center space-x-2.5 py-2 px-4">
            <Wind className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
              Long-Lasting Freshness
            </span>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-center justify-center space-x-2.5 py-2 px-4">
            <Feather className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
              Natural Softness
            </span>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-center justify-center space-x-2.5 py-2 px-4">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
              5 L • Concentrated Formula
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
