import type { Metadata } from "next";
import { Inter, Petit_Formal_Script, Oswald } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] });

const font_petit = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-petit'
});

// POPRAWKA: Zmiana wagi na 700 dla wersji BOLD
const font_oswald_bold = Oswald({
  weight: "600",
  subsets: ["latin"],
  variable: '--font-oswald-bold'
})

const font_oswald_light = Oswald({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-oswald-light'
})

export const metadata: Metadata = {
  title: "Ewelina Mądra-Czech - Salon Fryzjerski",
  description: "Najlepszy salon fryzjerski w mieście.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      {/* POPRAWKA: Dodano zmienne Oswalda do tagu body */}
      <body className={`${inter.className} ${font_petit.variable} ${font_oswald_light.variable} ${font_oswald_bold.variable} bg-white text-slate-900`}>

        {/* --- PASEK NAWIGACJI --- */}
        <nav className="sticky top-0 z-50 w-full bg-[oklch(96.7%_0.001_286.375)] backdrop-blur-md shadow-sm">
          <div className="flex w-full justify-between p-4 px-8 items-center">

            {/* Logo + Nazwa po lewej stronie */}
            <div className="flex gap-x-4 font-medium items-center text-slate-600">
              {/* Lewy róg teraz na pewno złapie czcionkę oswald-light */}
              <Link href="/" className="text-xl font-bold text-pink-400 hover:text-pink-500 transition font-[family-name:var(--font-oswald-light)]">
                Ewelina Mądra-Czech
              </Link>
            </div>

            {/* Przyciski po prawej stronie */}
            <div className="flex gap-x-6 font-medium text-slate-600 items-center">
              {/* POPRAWKA: Dodano klasę z czcionką Oswald Bold do przycisku Panel CRM. 
                  Dodałem też klasę tracking-wide (lekkie rozsunięcie liter), bo Oswald to dość wąska czcionka i tak wygląda lepiej. */}

              <Link
                href="/klientki"
                className="ml-4 px-3 py-1.5 text-pink-500 hover:text-slate-700 transition font-[family-name:var(--font-oswald-bold)] tracking-wide"
              >
                Klientki
              </Link>
              <Link
                href="/rezerwacje"
                className="ml-4 px-3 py-1.5 text-pink-500 hover:text-slate-700 transition font-[family-name:var(--font-oswald-bold)] tracking-wide"
              >
                Rezerwacje
              </Link>

              <Link
                href="/stats"
                className="ml-4 px-3 py-1.5 text-pink-500 hover:text-slate-700 transition font-[family-name:var(--font-oswald-bold)] tracking-wide"
              >
                Statystyki
              </Link>
              <Link
                href="/admin"
                className="ml-4 rounded-full bg-pink-400 px-5 py-1.5 text-white hover:bg-slate-700 transition font-[family-name:var(--font-oswald-bold)] tracking-wide"
              >
                Panel CRM
              </Link>
            </div>

          </div>
        </nav>
        {/* --- KONIEC PASKA NAWIGACJI --- */}

        {children}

      </body>
    </html>
  );
}