"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Wind, Feather, Droplet, ArrowRight } from "lucide-react";

interface FormulaSectionProps {
  currentVariant: "oceanic" | "lavande";
  onOpenDirections: () => void;
}

export default function FormulaSection({
  currentVariant,
  onOpenDirections,
}: FormulaSectionProps) {
  const isOceanic = currentVariant === "oceanic";

  // Olfactory notes matching Page 3
  const scentItems = isOceanic
    ? [
        { name: "MARINE AIR", color: "from-blue-200 via-sky-300 to-cyan-500", texture: "🌊" },
        { name: "WHITE MUSK", color: "from-slate-100 via-neutral-200 to-stone-300", texture: "☁️" },
        { name: "CLEAN COTTON", color: "from-amber-50 via-warm-gray-100 to-amber-100", texture: "🌸" },
      ]
    : [
        { name: "ATLAS LAVENDER", color: "from-purple-200 via-violet-300 to-purple-500", texture: "🌿" },
        { name: "WHITE MUSK", color: "from-slate-100 via-neutral-200 to-stone-300", texture: "☁️" },
        { name: "HERBAL BLOSSOM", color: "from-amber-50 via-rose-100 to-purple-100", texture: "🌸" },
      ];

  return (
    <section
      id="formula"
      className="relative min-h-[90vh] py-16 px-6 sm:px-12 bg-[#070D1D] flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
        {/* Left Column: Focused Bottle Visual on Dark Rocks & Waves */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-64 sm:w-80 aspect-[420/655] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
            <Image
              src={
                isOceanic
                  ? "/images/oceanic-front.jpg"
                  : "/images/lavande-front.jpg"
              }
              alt={isOceanic ? "Apolyon Oceanic Formula" : "Apolyon Lavande Formula"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 260px, 320px"
            />
          </div>

          {/* Splashing Waves at Bottle Base */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 h-16 bg-gradient-to-t from-[#070D1D] via-blue-950/30 to-transparent pointer-events-none" />
        </div>

        {/* Right Column: Exact WARM IVORY PANEL matching PDF Page 3 */}
        <div className="lg:col-span-7 bg-[#FAF6EE] text-[#070D1D] p-8 sm:p-12 shadow-2xl rounded-none border border-[#C5A059]/40 relative">
          {/* Eyebrow: THE FORMULA */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-3 text-[#C5A059] text-[10px] font-mono tracking-[0.3em] uppercase">
              <span className="w-8 h-px bg-[#C5A059]" />
              <span>THE FORMULA</span>
              <span className="w-8 h-px bg-[#C5A059]" />
            </div>

            {/* Headline matching PDF Page 3 */}
            <h2 className="text-2xl sm:text-4xl font-serif-brand font-medium tracking-tight text-[#070D1D] mt-3 leading-tight uppercase">
              POWERFUL ON STAINS. <br />
              GENTLE ON FIBRES.
            </h2>

            {/* Subhead matching PDF Page 3 */}
            <p className="text-xs sm:text-sm text-[#4A5568] font-light max-w-lg mx-auto mt-3 leading-relaxed">
              A concentrated liquid detergent designed for deep cleaning, enduring freshness and a naturally soft touch.
            </p>
          </div>

          {/* 3 Columns Divided by Lines (Deep Clean, Freshness, Softness) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D6CEBF] py-6 border-t border-b border-[#D6CEBF] text-center my-6">
            {/* Column 1 */}
            <div className="px-4 py-3 sm:py-0 flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-[#C5A059] mb-2" />
              <h4 className="text-xs font-serif-brand font-semibold uppercase tracking-wider text-[#070D1D] mb-1">
                Deep Clean
              </h4>
              <p className="text-[11px] text-[#5A6578] leading-normal">
                Targets everyday dirt and stubborn residues.
              </p>
            </div>

            {/* Column 2 */}
            <div className="px-4 py-3 sm:py-0 flex flex-col items-center">
              <Wind className="w-6 h-6 text-[#C5A059] mb-2" />
              <h4 className="text-xs font-serif-brand font-semibold uppercase tracking-wider text-[#070D1D] mb-1">
                Long-Lasting Freshness
              </h4>
              <p className="text-[11px] text-[#5A6578] leading-normal">
                Leaves a clean {isOceanic ? "oceanic" : "lavender"} scent after every wash.
              </p>
            </div>

            {/* Column 3 */}
            <div className="px-4 py-3 sm:py-0 flex flex-col items-center">
              <Feather className="w-6 h-6 text-[#C5A059] mb-2" />
              <h4 className="text-xs font-serif-brand font-semibold uppercase tracking-wider text-[#070D1D] mb-1">
                Natural Softness
              </h4>
              <p className="text-[11px] text-[#5A6578] leading-normal">
                Cares for fibres and preserves a smooth feel.
              </p>
            </div>
          </div>

          {/* Scent Signature Bar & 5L Dosage Pill (Matching PDF Page 3) */}
          <div className="pt-2">
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#C5A059]">
                {isOceanic ? "─── THE OCEANIC SIGNATURE ───" : "─── THE LAVANDE SIGNATURE ───"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* 3 Circular Scent Swatches */}
              <div className="flex items-center justify-center space-x-6">
                {scentItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} border border-[#C5A059]/40 shadow-inner flex items-center justify-center text-base mb-1.5`}
                    >
                      <span className="opacity-80">{item.texture}</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider uppercase text-[#070D1D] font-semibold">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-16 bg-[#D6CEBF]" />

              {/* 5L Concentrated Pill & View Directions link matching Page 3 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                <div className="flex items-center space-x-2 border border-[#C5A059] px-4 py-1.5 rounded-full bg-white/60">
                  <Droplet className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-[11px] font-mono font-bold text-[#070D1D] tracking-widest uppercase">
                    5 L CONCENTRATED
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onOpenDirections}
                  className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] hover:text-[#070D1D] font-semibold flex items-center pt-1 group"
                >
                  <span>VIEW DIRECTIONS</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal 4-Pillars Strip (Repeated on Page 3) */}
      <div className="w-full border-t border-b border-[#C5A059]/25 py-3.5 bg-[#070D1D]/90 z-20 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/25 text-center">
          <div className="flex items-center justify-center space-x-2.5 py-2 px-4">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
              Deep Clean
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2.5 py-2 px-4">
            <Wind className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
              Long-Lasting Freshness
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2.5 py-2 px-4">
            <Feather className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#FAF6EE]">
              Natural Softness
            </span>
          </div>
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
