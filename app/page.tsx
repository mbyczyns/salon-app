import Image from "next/image";
import GallerySection from "@/components/GallerySection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await prisma.service.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] text-slate-900 flex flex-col items-center pb-12">

      {/* --- 1. SEKCJA HERO (TŁO) --- */}
      <div className="relative w-full flex items-center justify-center">
        <Image
          className="w-full h-auto opacity-25 grayscale"
          src={"/hair-salon-bg.png"}
          alt="Zdjęcie tła salonu"
          width={1920}
          height={300}
        />
        <div className="absolute flex flex-col items-center text-center -mt-8 md:-mt-16">
          <Image
            src="/globe.svg"
            alt="Logo na tle"
            width={120}
            height={120}
            className="rounded-full shadow-md mb-20 md:mb-15"
          />
          <h2 className="text-5xl md:text-7xl drop-shadow-lg p-6">
            <span className="font-[family-name:var(--font-oswald-bold)] font-bold text-slate-700 tracking-wide">
              Ewelina Mądra-Czech
            </span>
            {" "}
            <span className="font-[family-name:var(--font-oswald-light)] text-slate-700 font-light">
              Salon Fryzjerski
            </span>
          </h2>
          <p className="mt-2 text-lg text-slate-700 font-[family-name:var(--font-oswald-light)]">
            Profesjonalna pielęgnacja i stylizacja
          </p>
        </div>
      </div>


      {/* --- 2. KARTA "O MNIE" (Klasyczna, jasna) --- */}
      <div className="mt-16 w-full mx-auto flex flex-col md:flex-row max-w-6xl rounded-2xl bg-white shadow-xl outline outline-black/5 z-10 overflow-hidden">

        {/* ZDJĘCIE PO LEWEJ */}
        <div className="flex-1 relative w-full min-h-[400px] md:min-h-full">
          <Image
            src="/portret.jpg"
            alt="Ewelina Mądra przy pracy"
            fill
            className="object-cover"
          />
        </div>

        {/* TEKST PO PRAWEJ */}
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold tracking-wider text-center text-slate-700 mb-6 font-[family-name:var(--font-oswald-bold)]">
            O mnie
          </h2>
          <p className="text-justify text-lg font-[family-name:var(--font-oswald-light)] text-slate-600 leading-relaxed">
            Cześć! Nazywam się Ewelina Mądra-Czech. <br />
            Fryzjerstwo to moja pasja od 17 lat, a od dekady z sukcesem prowadzę własny salon, budując relacje oparte na zaufaniu i profesjonalizmie. Łączę wieloletnie doświadczenie z biegłością w najnowszych technikach strzyżenia i koloryzacji. W moim salonie stawiam na indywidualne podejście do klienta. Regularnie biorę udział w zaawansowanych szkoleniach, aby oferować moim klientom najnowsze techniki i światowe trendy na najwyższym poziomie.
            Z radością zapraszam Was do mojego nowego salonu, który stworzyłam z myślą o totalnej regeneracji. Oprócz perfekcyjnej koloryzacji, z której mnie znacie, stawiamy teraz na zaawansowaną pielęgnację. Nowością jest nasza strefa Head Spa – rytuał, który ukoi Twoje zmysły po przez masaż - zadba o skórę głowy i pielęgnację włosów.
          </p>
        </div>
      </div>


      {/* --- 3. SEKCJA HEAD-SPA (Naprawiona struktura i mniejszy padding tekstu) --- */}
      <div className="mt-16 w-full mx-auto flex flex-col max-w-6xl rounded-2xl bg-white shadow-xl outline outline-black/5 z-10 overflow-hidden">

        {/* GÓRA: ZDJĘCIE W TLE Z NAPISEM (Teraz na samej górze kontenera) */}
        <div className="relative w-full h-[400px] md:h-[500px] flex flex-col items-center justify-center text-center">
          <Image
            src="/headspa.jpg"
            alt="Nowa strefa Head Spa w salonie Ewelina Mądra"
            fill
            className="object-cover"
          />
          {/* Przyciemniająca nakładka na zdjęcie */}
          <div className="absolute inset-0 bg-slate-900/40"></div>

          {/* Wyśrodkowany tekst na zdjęciu */}
          <div className="relative z-10 p-6 flex flex-col items-center">
            <span className="inline-block px-5 py-1.5 bg-slate-500 text-white font-[family-name:var(--font-oswald-bold)] text-sm tracking-widest rounded-full uppercase mb-4 shadow-lg">
              Nowość
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-wider text-white font-[family-name:var(--font-oswald-bold)] drop-shadow-lg">
              Strefa <span className="text-slate-300">Head Spa</span>
            </h2>
          </div>
        </div>

        {/* DÓŁ: OPIS NA BIAŁYM TLE (Zmniejszony padding p-6 md:p-10) */}
        <div className="p-6 md:p-10 flex justify-center">
          <p className="text-justify text-lg md:text-xl font-[family-name:var(--font-oswald-light)] text-slate-600 leading-relaxed w-full">
            W moim nowym salonie czeka na Ciebie strefa Head Spa – prawdziwy azyl relaksu i pielęgnacji, stworzona z myślą o Twoim absolutnym komforcie i regeneracji. To coś więcej niż zabieg – to rytuał, który koi zmysły i kompleksowo dba o skórę głowy oraz włosy. W świecie pędzącym na co dzień, ta chwila jest tylko dla Ciebie – możesz zrelaksować się, posłuchać ulubionej muzyki i oddać się profesjonalnej pielęgnacji, która przywraca równowagę i piękno włosów. Zapraszam Cię do świata, w którym nowoczesna wiedza spotyka się z relaksem i troską.
          </p>
        </div>
      </div>


      {/* --- 4. KARTA "CENNIK" (Szerokość 6xl z powrotem) --- */}
      <div className="mt-16 w-full mx-auto flex flex-col max-w-6xl rounded-2xl bg-white shadow-xl outline outline-black/5 z-10 overflow-hidden">
        <div className="p-8 md:p-14 flex flex-col">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold tracking-wider text-center text-slate-700 mb-2 font-[family-name:var(--font-oswald-bold)]">
              Cennik Usług
            </h2>
            <p className="text-slate-500 font-[family-name:var(--font-oswald-light)] text-xl tracking-wide text-center">Sprawdź naszą ofertę podstawową</p>
          </div>

          <div className="w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-slate-400 border-b-2 border-slate-100 font-[family-name:var(--font-oswald-bold)] tracking-wider uppercase">
                  <th className="py-3 pr-4 font-normal text-left">Usługa</th>
                  <th className="py-3 px-4 font-normal text-center">Czas</th>
                  <th className="py-3 font-normal text-right">Cena</th>
                </tr>
              </thead>
              <tbody className="font-[family-name:var(--font-oswald-light)] text-lg text-slate-700">
                {services.map((service: any) => (
                  <tr key={service.name} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-4">{service.name}</td>
                    <td className="py-4 px-4 text-center text-slate-400 text-base">{service.duration}</td>
                    <td className="py-4 font-[family-name:var(--font-oswald-bold)] text-slate-400 text-right tracking-wide">{service.price} zł</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-8 text-sm text-slate-400 font-[family-name:var(--font-oswald-light)] text-center bg-slate-50 p-4 rounded-lg">
              * Podane ceny i czasy trwania usług są orientacyjne. Ostateczny koszt i czas trwania usługi mogą się różnić w zależności od długości i gęstości włosów oraz ilości zużytego materiału.
            </p>
          </div>
        </div>
      </div>


      {/* --- 5. GALERIA ZDJĘĆ --- */}
      <div className="mt-16 w-full justify-center flex">
        <GallerySection />
      </div>


      {/* --- 6. KARTA "KONTAKT" --- */}
      <div className="mt-16 w-full mx-auto flex flex-col md:flex-row max-w-6xl rounded-2xl bg-white shadow-xl outline outline-black/5 z-10 overflow-hidden">

        {/* DANE KONTAKTOWE */}
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold tracking-wider text-center text-slate-700 mb-6 font-[family-name:var(--font-oswald-bold)]">
            Kontakt
          </h2>
          <div className="space-y-6 font-[family-name:var(--font-oswald-light)] text-xl text-slate-600 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-3xl">📞</span>
              <a href="tel:+48123456789" className="hover:text-slate-500 transition-colors">
                +48 123 456 789
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">✉️</span>
              <a href="mailto:kontakt@salonewelina.pl" className="hover:text-slate-500 transition-colors">
                kontakt@salonewelina.pl
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">📍</span>
              <span>ul. Piękna 15, 00-001 Warszawa</span>
            </div>
          </div>

          <h3 className="text-base text-slate-400 font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest mb-4">
            Znajdź nas w sieci
          </h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-slate-50 hover:bg-slate-50 text-slate-600 hover:text-slate-500 rounded-full transition-colors font-[family-name:var(--font-oswald-bold)] text-sm tracking-wider uppercase border border-slate-100">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-slate-50 hover:bg-slate-50 text-slate-600 hover:text-slate-500 rounded-full transition-colors font-[family-name:var(--font-oswald-bold)] text-sm tracking-wider uppercase border border-slate-100">
              Facebook
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-slate-50 hover:bg-slate-50 text-slate-600 hover:text-slate-500 rounded-full transition-colors font-[family-name:var(--font-oswald-bold)] text-sm tracking-wider uppercase border border-slate-100">
              TikTok
            </a>
          </div>
        </div>

        {/* MAPA GOOGLE */}
        <div className="flex-1 relative w-full min-h-[400px] md:min-h-full bg-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2409.689875948817!2d17.7193129770767!3d52.84597301204408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47037b53515e31cd%3A0x49fb5198500c1d71!2sI%20Liceum%20Og%C3%B3lnokszta%C5%82c%C4%85ce%20im.%20Braci%20%C5%9Aniadeckich%20w%20%C5%BBninie!5e0!3m2!1spl!2spl!4v1773327935012!5m2!1spl!2spl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          ></iframe>
        </div>

      </div>

    </main>
  );
}