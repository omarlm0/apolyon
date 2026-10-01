"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#070D1D] border-t border-[#C5A059]/25 py-8 px-6 sm:px-12 text-[#C5CBD3]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        {/* Left: APOLYON Brand */}
        <div>
          <span className="text-xl font-serif-brand font-medium tracking-[0.28em] text-[#FAF6EE]">
            APOLYON
          </span>
        </div>

        {/* Center: Links & Made in Morocco Badge */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center space-x-6 text-[10px] uppercase font-mono tracking-widest text-[#C5CBD3]">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-[#C5A059] transition-colors"
            >
              Contact
            </a>
            <span className="text-[#C5A059]/40">|</span>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                alert("APOLYON Quality Guarantee: Concentrated 5L formula. Biodegradable surfactants. Moroccan production.");
              }}
              className="hover:text-[#C5A059] transition-colors"
            >
              Terms
            </a>
            <span className="text-[#C5A059]/40">|</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C5A059] transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase border-l-0 sm:border-l border-[#C5A059]/30 pl-0 sm:pl-8">
            MADE AND BOTTLED IN MOROCCO
          </div>
        </div>

        {/* Right: Slogan matching PDF Page 4 */}
        <div className="text-center md:text-right text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5CBD3]/70">
          <span>CLEANER TOMORROWS</span>
          <br className="hidden sm:inline" />
          <span>A MORE BEAUTIFUL EVERYDAY</span>
        </div>
      </div>
    </footer>
  );
}
