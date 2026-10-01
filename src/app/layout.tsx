import type { Metadata } from "next";
import { Cinzel, Inter, Alex_Brush } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "APOLYON — A Digital Showcase for Oceanic Care",
  description:
    "A premium vitrine website that introduces the product, explains its effects, and converts interest into personal pre-orders or wholesale enquiries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${alexBrush.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#070D1D] text-[#FAF6EE] font-sans selection:bg-[#C5A059]/30">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
