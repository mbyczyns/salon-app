import type { Metadata } from "next";
import { Inter, Petit_Formal_Script } from "next/font/google";
import "./globals.css";
// 1. Importujemy specjalny komponent Link z Next.js
import Link from "next/link";
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] });

const font_petit = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-petit'
});

export const metadata: Metadata = {
  title: "Ewelina Mądra - Salon Fryzjerski",
  description: "Najlepszy salon fryzjerski w mieście.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className} ${font_petit.variable} bg-[oklch(98.7%_0.022_95.277)] text-slate-900`}>

        {/* ---  PASEK NAWIGACJI  --- */}
        <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur-md shadow-sm">
          <div className="flex w-full justify-between p-4 px-8">

            {/* Logo / Nazwa po lewej stronie */}
            <div className="flex gap-x-4 font-medium items-center text-slate-600">

              <Link href="/" className="text-xl font-bold text-pink-600 hover:text-pink-500 transition font-[family-name:var(--font-petit)]">
                Salon Fryzjerski Ewelina Mądra
              </Link>
            </div>

            {/* Linki po prawej stronie */}
            <div className="flex gap-x-6 font-medium text-slate-600">

              {/* Wyraźniejszy przycisk do Twojego panelu zarządzania */}
              <Link
                href="/admin"
                className="ml-4 rounded-full bg-pink-400 px-4 py-1 text-white hover:bg-slate-700 transition"
              >
                Panel CRM
              </Link>
            </div>

          </div>
        </nav>
        {/* --- KONIEC PASKA NAWIGACJI --- */}

        {/* Tutaj ładuje się zawartość poszczególnych stron (np. Twoje page.tsx) */}
        {children}

      </body>
    </html>
  );
}