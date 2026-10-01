"use client";

import React from "react";
import { X, Droplet, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DosageModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "oceanic" | "lavande";
}

export default function DosageModal({
  isOpen,
  onClose,
  variant,
}: DosageModalProps) {
  const { lang, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0B142B] border border-[#C5A059]/40 rounded-xl shadow-2xl p-6 sm:p-8 text-[#FAF6EE] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#C5CBD3] hover:text-[#FAF6EE] hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close directions dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-6 border-b border-[#C5A059]/20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-mono">
            {variant === "oceanic" ? "APOLYON OCEANIC" : "APOLYON LAVANDE"}
          </p>
          <h3 className="text-2xl sm:text-3xl font-serif-brand tracking-wide mt-1 text-gold-gradient">
            {t.dosage.title[lang]}
          </h3>
          <p className="text-xs text-[#C5CBD3] mt-2 max-w-md mx-auto">
            {t.dosage.subhead[lang]}
          </p>
        </div>

        {/* 3 Dosage Columns (From Back Label) */}
        <div className="grid grid-cols-3 gap-4 py-8">
          {/* Light */}
          <div className="text-center p-4 rounded-lg bg-[#070D1D]/70 border border-[#C5A059]/20 flex flex-col items-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5CBD3]">
              {t.dosage.lightSoil[lang]}
            </span>
            <div className="my-3 w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center border border-[#C5A059]/30">
              <Droplet className="w-5 h-5 text-[#C5A059]" />
            </div>
            <span className="text-2xl font-serif-brand font-semibold text-[#FAF6EE]">
              35 ml
            </span>
            <span className="text-[10px] text-[#C5CBD3]/80 mt-1">
              {t.dosage.capLight[lang]}
            </span>
          </div>

          {/* Normal */}
          <div className="text-center p-4 rounded-lg bg-[#0E1831] border border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.15)] flex flex-col items-center relative">
            <span className="absolute -top-2.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#C5A059] text-[#070D1D] font-bold">
              {t.dosage.standard[lang]}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-semibold">
              {t.dosage.normalSoil[lang]}
            </span>
            <div className="my-3 w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center border border-[#C5A059]">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <span className="text-2xl font-serif-brand font-semibold text-[#FAF6EE]">
              50 ml
            </span>
            <span className="text-[10px] text-[#C5CBD3]/80 mt-1">
              {t.dosage.capNormal[lang]}
            </span>
          </div>

          {/* Heavy */}
          <div className="text-center p-4 rounded-lg bg-[#070D1D]/70 border border-[#C5A059]/20 flex flex-col items-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5CBD3]">
              {t.dosage.heavySoil[lang]}
            </span>
            <div className="my-3 w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center border border-[#C5A059]/30">
              <Droplet className="w-5 h-5 text-[#C5A059] fill-[#C5A059]/20" />
            </div>
            <span className="text-2xl font-serif-brand font-semibold text-[#FAF6EE]">
              70 ml
            </span>
            <span className="text-[10px] text-[#C5CBD3]/80 mt-1">
              {t.dosage.capHeavy[lang]}
            </span>
          </div>
        </div>

        {/* Back Label Information: Precautions & Storage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#C5A059]/20 text-xs text-[#C5CBD3]">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[#C5A059] font-medium text-[11px] uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.dosage.precautions[lang]}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {t.dosage.precautionsText[lang]}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[#C5A059] font-medium text-[11px] uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t.dosage.provenance[lang]}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {t.dosage.provenanceText[lang]}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-2.5 bg-[#C5A059] text-[#070D1D] text-xs font-semibold tracking-widest uppercase rounded hover:bg-[#D4AF37] transition-colors cursor-pointer"
          >
            {t.dosage.closeBtn[lang]}
          </button>
        </div>
      </div>
    </div>
  );
}
