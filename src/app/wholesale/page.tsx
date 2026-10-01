"use client";

import React, { useState } from "react";
import Image from "next/image";
import { submitOrder } from "@/actions/order";
import {
  Minus,
  Plus,
  ArrowRight,
  ShoppingCart,
  Mail,
  Truck,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import FooterBar from "@/components/FooterBar";
import { useLanguage } from "@/context/LanguageContext";

export default function WholesalePage() {
  const [currentVariant, setCurrentVariant] = useState<"oceanic" | "lavender">("oceanic");
  const [orderType, setOrderType] = useState<"personal" | "wholesale">("wholesale");
  const [quantity, setQuantity] = useState<number>(24);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const { lang, t, isRtl } = useLanguage();

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const handleOrderTypeChange = (type: "personal" | "wholesale") => {
    setOrderType(type);
    setIsCustom(false);
    setQuantity(type === "wholesale" ? 24 : 2);
  };

  const handlePreset = (units: number) => {
    setIsCustom(false);
    setQuantity(units);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => {
    const min = orderType === "wholesale" ? 12 : 1;
    if (quantity > min) setQuantity((q) => q - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const result = await submitOrder({
      fullName,
      email,
      phone,
      city,
      orderType,
      variant: currentVariant,
      quantity,
    });

    if (result.success && result.orderRef) {
      setOrderRef(result.orderRef);
      setSubmitted(true);
    } else {
      alert(result.error || "Something went wrong.");
    }
    
    setSubmitting(false);
  };

  const getWhatsAppLink = () => {
    const businessPhone = "212600000000";
    const variantName = currentVariant === "oceanic" ? "Oceanic (Navy)" : "Lavender (Purple)";
    const greeting =
      lang === "AR"
        ? `السلام عليكم أبوليو،\n\nقمت بإرسال طلب حجز عبر الموقع:\n• المرجع: #${orderRef}\n• المنتج: أبوليو ${variantName} (5 لتر)\n• الكمية: ${quantity} وحدة (${quantity * 5} لتر)\n• الاسم: ${fullName}\n• المدينة: ${city}\n\nيرجى تأكيد التوفر والسعر.`
        : lang === "FR"
        ? `Bonjour APOLYON,\n\nJe viens de soumettre ma demande de réservation :\n• Réf: #${orderRef}\n• Produit: Apolyon ${variantName} 5L\n• Type: ${orderType === "wholesale" ? "Wholesale (Professionnel)" : "Commande Privée"}\n• Quantité: ${quantity} unités (${quantity * 5} Litres)\n• Nom/Société: ${fullName}\n• Ville: ${city}\n\nMerci de me recontacter pour finaliser la disponibilité et le tarif.`
        : `Hello APOLYON,\n\nI have just submitted a reservation request:\n• Ref: #${orderRef}\n• Product: Apolyon ${variantName} 5L\n• Type: ${orderType === "wholesale" ? "Wholesale" : "Personal Pre-Order"}\n• Quantity: ${quantity} units (${quantity * 5} Liters)\n• Name/Company: ${fullName}\n• City: ${city}\n\nPlease confirm availability and delivery quotation.`;

    return `https://wa.me/${businessPhone}?text=${encodeURIComponent(greeting)}`;
  };

  return (
    <div className="min-h-screen bg-[#070D1D] p-2 sm:p-4 flex flex-col justify-between selection:bg-[#C5A059]/30">
      {/* Outer Vitrine Gold Frame matching mockup */}
      <div className="flex-1 w-full border border-[#C5A059]/40 rounded-sm bg-[#070D1D] flex flex-col justify-between overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Navigation */}
        <HeaderNav
          currentVariant={currentVariant}
          onSelectVariant={setCurrentVariant}
        />

        {/* Main Content */}
        <main className="flex-1 relative flex flex-col justify-center px-6 sm:px-12 py-8 z-10">
          {/* Header Title Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-3 text-[#C5A059] text-[10px] font-mono tracking-[0.3em] uppercase">
              <span className="w-10 h-px bg-[#C5A059]/60" />
              <span>{t.wholesale.eyebrow[lang]}</span>
              <span className="w-10 h-px bg-[#C5A059]/60" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif-brand font-medium tracking-tight text-[#FAF6EE] mt-2 uppercase">
              {t.wholesale.headline[lang]}
            </h1>

            <p className="text-xs sm:text-sm text-[#C5CBD3] font-light max-w-xl mx-auto mt-1">
              {t.wholesale.subhead[lang]}
            </p>
          </div>

          {/* Two-Column Booking Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-[1280px] mx-auto w-full">
            {/* Left Column: Bottle with Info Box */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="relative w-56 sm:w-68 aspect-[420/655] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]">
                <Image
                  src={
                    currentVariant === "oceanic"
                      ? "/images/oceanic-front.jpg"
                      : "/images/lavender-front.jpg"
                  }
                  alt="Apolyon 5L Reserve Preview"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 220px, 260px"
                />
              </div>

              {/* Info badge below bottle matching Page 4 mockup */}
              <div className="mt-3 p-2.5 bg-[#0B132B] border border-[#C5A059]/30 text-center w-full max-w-xs">
                <p className="text-xs font-serif-brand font-semibold text-[#FAF6EE] uppercase tracking-widest">
                  {currentVariant === "oceanic" ? "OCEANIC • 5 L" : "LAVENDER • 5 L"}
                </p>
                <p className="text-[10px] text-[#C5CBD3] font-mono mt-0.5">
                  {t.wholesale.badgeText[lang]}
                </p>
              </div>
            </div>

            {/* Right Column: Exact WARM IVORY CARD */}
            <div className="lg:col-span-7 bg-[#FAF6EE] text-[#070D1D] p-6 sm:p-8 shadow-2xl border border-[#C5A059]/40 relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. ORDER TYPE */}
                <div>
                  <span className="block text-center text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-1.5">
                    ─── {t.wholesale.orderTypeLabel[lang]} ───
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOrderTypeChange("personal")}
                      className={`py-2 text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                        orderType === "personal"
                          ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                          : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                      }`}
                    >
                      {t.wholesale.personalOrder[lang]}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOrderTypeChange("wholesale")}
                      className={`py-2 text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                        orderType === "wholesale"
                          ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                          : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                      }`}
                    >
                      {t.wholesale.wholesaleOrder[lang]}
                    </button>
                  </div>
                </div>

                {/* 2. SELECT QUANTITY PRESETS */}
                <div>
                  <span className="block text-center text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-1.5">
                    ─── {t.wholesale.selectQtyLabel[lang]} ───
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {orderType === "wholesale" ? (
                      <>
                        {[12, 24, 48].map((qty) => (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => handlePreset(qty)}
                            className={`py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                              quantity === qty && !isCustom
                                ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                                : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                            }`}
                          >
                            {qty} {t.wholesale.units[lang]}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsCustom(true)}
                          className={`py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                            isCustom
                              ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                              : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                          }`}
                        >
                          {t.wholesale.custom[lang]}
                        </button>
                      </>
                    ) : (
                      <>
                        {[1, 2, 4].map((qty) => (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => handlePreset(qty)}
                            className={`py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                              quantity === qty && !isCustom
                                ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                                : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                            }`}
                          >
                            {qty} {qty === 1 ? t.wholesale.unitSingle[lang] : t.wholesale.units[lang]}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsCustom(true)}
                          className={`py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                            isCustom
                              ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                              : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                          }`}
                        >
                          {t.wholesale.custom[lang]}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* 3. STEPPER */}
                <div>
                  <span className="block text-center text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-1">
                    {t.wholesale.qtyLabel[lang]}
                  </span>
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center bg-white border border-[#D6CEBF]">
                      <button
                        type="button"
                        onClick={decrement}
                        className="w-9 h-9 flex items-center justify-center text-[#070D1D] hover:bg-[#FAF6EE] border-r border-[#D6CEBF] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-16 text-center text-sm font-serif-brand font-bold text-[#070D1D]">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        onClick={increment}
                        className="w-9 h-9 flex items-center justify-center text-[#070D1D] hover:bg-[#FAF6EE] border-l border-[#D6CEBF] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. FORM FIELDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="block text-[8px] uppercase font-mono tracking-widest text-[#718096] mb-0.5">
                      {t.wholesale.fullNameLabel[lang]}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.wholesale.fullNamePlaceholder[lang]}
                      className="w-full px-3 py-2 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase font-mono tracking-widest text-[#718096] mb-0.5">
                      {t.wholesale.phoneLabel[lang]}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.wholesale.phonePlaceholder[lang]}
                      className="w-full px-3 py-2 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase font-mono tracking-widest text-[#718096] mb-0.5">
                      {t.wholesale.emailLabel[lang]}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.wholesale.emailPlaceholder[lang]}
                      className="w-full px-3 py-2 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase font-mono tracking-widest text-[#718096] mb-0.5">
                      {t.wholesale.cityLabel[lang]}
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t.wholesale.cityPlaceholder[lang]}
                      className="w-full px-3 py-2 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 5. ACTION CTA BUTTON */}
                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#070D1D] text-xs font-semibold tracking-[0.25em] uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>
                      {submitting
                        ? t.wholesale.submitting[lang]
                        : t.wholesale.submitBtn[lang]}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                  </button>

                  <p className="text-center text-[10px] text-[#718096] italic">
                    {t.wholesale.noPaymentNote[lang]}
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* 3 Step Process Footnote */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/25 border-t border-b border-[#C5A059]/25 py-4 mt-8 max-w-[1280px] mx-auto w-full text-center sm:text-left">
            {/* Step 1 */}
            <div className="flex items-center space-x-3 py-1.5 px-4">
              <span className="text-xs font-mono text-[#C5A059] font-bold">01</span>
              <div className="p-1.5 border border-[#C5A059]/40 rounded-full text-[#C5A059]">
                <ShoppingCart className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#FAF6EE] font-bold">
                  {t.wholesale.step1Title[lang]}
                </h4>
                <p className="text-[9px] text-[#C5CBD3]">
                  {t.wholesale.step1Desc[lang]}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center space-x-3 py-1.5 px-4">
              <span className="text-xs font-mono text-[#C5A059] font-bold">02</span>
              <div className="p-1.5 border border-[#C5A059]/40 rounded-full text-[#C5A059]">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#FAF6EE] font-bold">
                  {t.wholesale.step2Title[lang]}
                </h4>
                <p className="text-[9px] text-[#C5CBD3]">
                  {t.wholesale.step2Desc[lang]}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center space-x-3 py-1.5 px-4">
              <span className="text-xs font-mono text-[#C5A059] font-bold">03</span>
              <div className="p-1.5 border border-[#C5A059]/40 rounded-full text-[#C5A059]">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#FAF6EE] font-bold">
                  {t.wholesale.step3Title[lang]}
                </h4>
                <p className="text-[9px] text-[#C5CBD3]">
                  {t.wholesale.step3Desc[lang]}
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <FooterBar />

        {/* Client WhatsApp Handover Dialog */}
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-[#FAF6EE] text-[#070D1D] border border-[#C5A059] p-8 shadow-2xl text-center">
              <div className="w-14 h-14 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-[#C5A059]" />
              </div>

              <p className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                {t.wholesale.modalTitle[lang]} • Réf: #{orderRef}
              </p>

              <h3 className="text-xl font-serif-brand font-medium mt-1 text-[#070D1D] uppercase">
                {t.wholesale.modalTitle[lang]}
              </h3>

              <p className="text-xs text-[#5A6578] mt-2 leading-relaxed">
                {t.wholesale.modalDesc[lang]} <strong>{quantity} {t.wholesale.units[lang]} ({quantity * 5} {t.wholesale.modalLiters[lang]})</strong>{" "}
                {currentVariant === "oceanic" ? "Apolyon Oceanic" : "Apolyon Lavender"} — <strong>{city}</strong>.
              </p>

              {/* Direct WhatsApp Client Button */}
              <div className="mt-5 space-y-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#20ba59] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.wholesale.continueWhatsApp[lang]}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full py-2 text-xs text-[#718096] hover:text-[#070D1D] cursor-pointer"
                >
                  {t.wholesale.close[lang]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
