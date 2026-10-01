"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function FooterBar() {
  const { lang, t } = useLanguage();

  return (
    <footer className="w-full bg-[#070D1D] border-t border-[#C5A059]/25 py-6 px-6 sm:px-12 text-[#C5CBD3] z-30">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Left: APOLYON Brand */}
        <div>
          <Link href="/">
            <span className="text-xl font-serif-brand font-medium tracking-[0.28em] text-[#FAF6EE] hover:text-[#C5A059] transition-colors">
              APOLYON
            </span>
          </Link>
        </div>

        {/* Center: Links & Made in Morocco */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center space-x-5 text-[10px] uppercase font-mono tracking-widest text-[#C5CBD3]">
            <Link href="/wholesale" className="hover:text-[#C5A059] transition-colors">
              {t.footer.contact[lang]}
            </Link>
            <span className="text-[#C5A059]/40">|</span>
            <button
              onClick={() =>
                alert(
                  lang === "FR"
                    ? "Garantie Qualité APOLYON : Formule 5L concentrée. Tensioactifs biodégradables. Fabriqué et embouteillé au Maroc."
                    : lang === "AR"
                    ? "ضمان جودة أبوليو: تركيبة 5 لتر فائقة التركيز، مواد قابلة للتحلل الحيوي. صنع وعُبّئ في المغرب."
                    : "APOLYON Quality Guarantee: Concentrated 5L formula. Biodegradable surfactants. Formulated and Bottled in Morocco."
                )
              }
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {t.footer.terms[lang]}
            </button>
            <span className="text-[#C5A059]/40">|</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C5A059] transition-colors"
            >
              {t.footer.instagram[lang]}
            </a>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase border-l-0 sm:border-l border-[#C5A059]/30 pl-0 sm:pl-8">
            {t.footer.madeInMorocco[lang]}
          </div>
        </div>

        {/* Right: Slogan matching mockup */}
        <div className="text-center md:text-right text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5CBD3]/70">
          <span>{t.footer.sloganTop[lang]}</span>
          <br className="hidden sm:inline" />
          <span>{t.footer.sloganBottom[lang]}</span>
        </div>
      </div>
    </footer>
  );
}
