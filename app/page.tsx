import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[oklch(98.7%_0.022_95.277)] text-slate-900 flex flex-col items-center">

      {/* --- 1. PUDEŁKO (musi mieć klasę 'relative' i układ flex do wyśrodkowania) --- */}
      <div className="relative w-full flex items-center justify-center">

        {/* Twoje zdjęcie w tle */}
        <Image
          className="w-full h-auto opacity-35 grayscale"
          src={"/hair-salon-bg.png"}
          alt="Zdjęcie tła salonu"
          width={1920}
          height={300}
        />

        {/* --- 2. NAKŁADKA NA TŁO (klasa 'absolute' lewituje nad zdjęciem) --- */}
        <div className="absolute flex flex-col items-center text-center">

          <Image
            src="/globe.svg"
            alt="Logo na tle"
            width={80}
            height={80}
            className="rounded-full shadow-md"
          />
          {/* Możesz tu dać dowolny tekst... */}
          <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-petit)] font-black text-pink-600 drop-shadow-lg p-10">
            Ewelina Mądra Salon Fryzjerski
          </h2>
          <p className="mt-2 text-lg text-slate-700 font-medium">
            Profesjonalna pielęgnacja i stylizacja
          </p>




        </div>
      </div>
      {/* --- KONIEC SEKCJI Z TŁEM --- */}

      {/* Twoja biała wizytówka poniżej */}
      {/* KARTA "O MNIE" */}
      <div className="mt-12 mx-auto flex flex-col md:flex-row max-w-4xl items-center gap-8 rounded-xl bg-white p-8 shadow-xl outline outline-black/5 z-10 mb-20">

        {/* LEWA STRONA (TEKST) */}
        <div className="flex-1">
          {/* Zmieniłem <h1> na <h2> (na stronie powinno być tylko jedno główne <h1>, które masz już wyżej) */}
          <h2 className="text-3xl font-bold tracking-wider text-slate-900 mb-4">
            O mnie
          </h2>
          {/* Tekst akapitowy dajemy w tagu <p>, a nie w <span>, z dodatkowym odstępem między wierszami (leading-relaxed) */}
          <p className="text-lg font-normal text-slate-600 leading-relaxed">
            Od ponad 10 lat tworzę piękne fryzury dla moich klientek. Nasz zespół doświadczonych stylistów stale podnosi swoje kwalifikacje, uczestnicząc w szkoleniach i podążając za najnowszymi trendami. Używamy wyłącznie profesjonalnych kosmetyków renomowanych marek.
          </p>
        </div>

        {/* PRAWA STRONA (ZDJĘCIE) */}
        {/* Używamy relative i narzucamy wysokość (h-64 na tel, h-80 na komputerze), żeby użyć Image z atrybutem 'fill' */}
        <div className="flex-1 relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/portret.jpg" /* PAMIĘTAJ ZMIENIĆ NA NAZWĘ SWOJEGO ZDJĘCIA (np. Twojego portretu) z folderu public */
            alt="Ewelina Mądra przy pracy"
            fill
            className="object-cover"
          />
        </div>

      </div>

    </main>
  );
}