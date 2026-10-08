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

interface PreOrderSectionProps {
  currentVariant: "oceanic" | "lavender";
  onSelectVariant: (variant: "oceanic" | "lavender") => void;
}

export default function PreOrderSection({
  currentVariant,
  onSelectVariant,
}: PreOrderSectionProps) {
  const [orderType, setOrderType] = useState<"personal" | "wholesale">("wholesale");
  const [quantity, setQuantity] = useState<number>(24);
  const [isCustom, setIsCustom] = useState<boolean>(false);

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
    // The number your customers will message. Set this in .env.local
    const businessPhone = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || "212600000000";
    const variantName = currentVariant === "oceanic" ? "Oceanic (Navy)" : "Lavender (Purple)";
    const msg = encodeURIComponent(
      `Bonjour APOLYON,\n\nJe viens de soumettre ma demande de réservation :\n• Réf: #${orderRef}\n• Produit: Apolyon ${variantName} 5L\n• Type: ${orderType === "wholesale" ? "Wholesale (Professionnel)" : "Commande Privée"}\n• Quantité: ${quantity} unités (${quantity * 5} Litres)\n• Nom/Société: ${fullName}\n• Ville: ${city}\n\nMerci de me recontacter pour finaliser la disponibilité et le tarif.`
    );
    return `https://wa.me/${businessPhone}?text=${msg}`;
  };

  return (
    <section
      id="reserve"
      className="relative min-h-screen py-16 px-6 sm:px-12 bg-[#070D1D] flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        {/* Header matching PDF Page 4 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-3 text-[#C5A059] text-[10px] font-mono tracking-[0.3em] uppercase">
            <span className="w-10 h-px bg-[#C5A059]/60" />
            <span>PRIVATE ORDERS & WHOLESALE</span>
            <span className="w-10 h-px bg-[#C5A059]/60" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-brand font-medium tracking-tight text-[#FAF6EE] mt-3 uppercase">
            RESERVE YOUR APOLYON ORDER
          </h2>

          <p className="text-xs sm:text-sm text-[#C5CBD3] font-light max-w-xl mx-auto mt-2">
            Choose your quantity. We will confirm availability, pricing and delivery with you directly.
          </p>
        </div>

        {/* Two-Column Booking Area matching PDF Page 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Bottle Spotlight with Info Box */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-56 sm:w-72 aspect-[420/655] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]">
              <Image
                src={
                  currentVariant === "oceanic"
                    ? "/images/oceanic-front.jpg"
                    : "/images/lavender-front.jpg"
                }
                alt="Apolyon 5L Reserve Preview"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 240px, 280px"
              />
            </div>

            {/* Info badge below bottle matching Page 4 */}
            <div className="mt-4 p-3 bg-[#0B132B] border border-[#C5A059]/30 text-center w-full max-w-xs">
              <p className="text-xs font-serif-brand font-semibold text-[#FAF6EE] uppercase tracking-widest">
                {currentVariant === "oceanic" ? "OCEANIC • 5 L" : "LAVENDER • 5 L"}
              </p>
              <p className="text-[10px] text-[#C5CBD3] font-mono mt-0.5">
                For homes, retailers and professional buyers.
              </p>
            </div>
          </div>

          {/* Right Column: Exact WARM IVORY CARD matching PDF Page 4 */}
          <div className="lg:col-span-7 bg-[#FAF6EE] text-[#070D1D] p-6 sm:p-9 shadow-2xl rounded-none border border-[#C5A059]/40">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. ORDER TYPE */}
              <div>
                <span className="block text-center text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-2">
                  ─── ORDER TYPE ───
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOrderTypeChange("personal")}
                    className={`py-2.5 text-[11px] font-mono tracking-wider uppercase transition-all ${
                      orderType === "personal"
                        ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                        : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                    }`}
                  >
                    PERSONAL PRE-ORDER
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderTypeChange("wholesale")}
                    className={`py-2.5 text-[11px] font-mono tracking-wider uppercase transition-all ${
                      orderType === "wholesale"
                        ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                        : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                    }`}
                  >
                    WHOLESALE
                  </button>
                </div>
              </div>

              {/* 2. SELECT QUANTITY PRESETS matching Page 4 */}
              <div>
                <span className="block text-center text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-2">
                  ─── SELECT QUANTITY ───
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {orderType === "wholesale" ? (
                    <>
                      {[12, 24, 48].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => handlePreset(qty)}
                          className={`py-2 text-[10px] font-mono tracking-wider uppercase transition-all ${
                            quantity === qty && !isCustom
                              ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                              : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                          }`}
                        >
                          {qty} UNITS
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setIsCustom(true)}
                        className={`py-2 text-[10px] font-mono tracking-wider uppercase transition-all ${
                          isCustom
                            ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                            : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                        }`}
                      >
                        CUSTOM
                      </button>
                    </>
                  ) : (
                    <>
                      {[1, 2, 4].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => handlePreset(qty)}
                          className={`py-2 text-[10px] font-mono tracking-wider uppercase transition-all ${
                            quantity === qty && !isCustom
                              ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                              : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                          }`}
                        >
                          {qty} {qty === 1 ? "UNIT" : "UNITS"}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setIsCustom(true)}
                        className={`py-2 text-[10px] font-mono tracking-wider uppercase transition-all ${
                          isCustom
                            ? "bg-[#070D1D] text-[#FAF6EE] font-bold"
                            : "bg-white border border-[#D6CEBF] text-[#070D1D] hover:bg-[#FAF6EE]"
                        }`}
                      >
                        CUSTOM
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* 3. STEPPER matching PDF Page 4: [ - ] [ 24 ] [ + ] */}
              <div>
                <span className="block text-center text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-1.5">
                  QUANTITY
                </span>
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center bg-white border border-[#D6CEBF] rounded-none">
                    <button
                      type="button"
                      onClick={decrement}
                      className="w-10 h-10 flex items-center justify-center text-[#070D1D] hover:bg-[#FAF6EE] border-r border-[#D6CEBF]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-20 text-center text-base font-serif-brand font-bold text-[#070D1D]">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={increment}
                      className="w-10 h-10 flex items-center justify-center text-[#070D1D] hover:bg-[#FAF6EE] border-l border-[#D6CEBF]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. FORM FIELDS matching Page 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-widest text-[#718096] mb-1">
                    Full Name / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name or company name"
                    className="w-full px-3 py-2.5 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-widest text-[#718096] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full px-3 py-2.5 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-widest text-[#718096] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2.5 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-widest text-[#718096] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your city"
                    className="w-full px-3 py-2.5 bg-white border border-[#D6CEBF] text-xs text-[#070D1D] placeholder:text-[#A0AEC0] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              {/* 5. ACTION CTA BUTTON matching Page 4 */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#070D1D] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>{submitting ? "SENDING..." : "REQUEST AVAILABILITY & QUOTE"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-center text-[10px] text-[#718096] italic">
                  No payment is taken at this stage. Our team will contact you to confirm your order.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* 3 Step Process Footnote matching PDF Page 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/25 border-t border-b border-[#C5A059]/25 py-6 mt-16 text-center sm:text-left">
          {/* Step 1 */}
          <div className="flex items-center space-x-4 py-2 px-6">
            <span className="text-xs font-mono text-[#C5A059] font-bold">01</span>
            <div className="p-2 border border-[#C5A059]/40 rounded-full text-[#C5A059]">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#FAF6EE] font-bold">
                CHOOSE QUANTITY
              </h4>
              <p className="text-[10px] text-[#C5CBD3]">
                Select the amount you need.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center space-x-4 py-2 px-6">
            <span className="text-xs font-mono text-[#C5A059] font-bold">02</span>
            <div className="p-2 border border-[#C5A059]/40 rounded-full text-[#C5A059]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#FAF6EE] font-bold">
                RECEIVE CONFIRMATION
              </h4>
              <p className="text-[10px] text-[#C5CBD3]">
                We'll get back to you directly.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center space-x-4 py-2 px-6">
            <span className="text-xs font-mono text-[#C5A059] font-bold">03</span>
            <div className="p-2 border border-[#C5A059]/40 rounded-full text-[#C5A059]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#FAF6EE] font-bold">
                DELIVERY ARRANGED
              </h4>
              <p className="text-[10px] text-[#C5CBD3]">
                Once confirmed, we prepare your order.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Client Handover Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#FAF6EE] text-[#070D1D] border border-[#C5A059] p-8 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#C5A059]" />
            </div>

            <p className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
              Demande Reçue • Réf: #{orderRef}
            </p>

            <h3 className="text-2xl font-serif-brand font-medium mt-2 text-[#070D1D] uppercase">
              RÉSERVATION ENREGISTRÉE
            </h3>

            <p className="text-xs text-[#5A6578] mt-2 leading-relaxed">
              Votre demande pour <strong>{quantity} unités ({quantity * 5} Litres)</strong> de la formule{" "}
              <strong>Apolyon {currentVariant === "oceanic" ? "Oceanic" : "Lavande"}</strong> à destination de{" "}
              <strong>{city}</strong> a été enregistrée avec succès.
            </p>

            {/* Direct WhatsApp Client Button */}
            <div className="mt-6 space-y-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#20ba59] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continuer sur WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="w-full py-2 text-xs text-[#718096] hover:text-[#070D1D]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
