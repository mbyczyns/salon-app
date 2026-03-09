import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] text-slate-900 flex flex-col items-center">

      {/* --- 1. PUDEŁKO (musi mieć klasę 'relative' i układ flex do wyśrodkowania) --- */}
      <div className="relative w-full flex items-center justify-center">

        {/* Twoje zdjęcie w tle */}
        <Image
          className="w-full h-auto opacity-25 grayscale"
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
          {/* Zmieniony nagłówek ze spanami */}
          <h2 className="text-5xl md:text-7xl drop-shadow-lg p-10">
            {/* Pierwsza część: Oswald Bold (Ewelina Mądra) */}
            <span className="font-[family-name:var(--font-oswald-bold)] font-bold text-pink-400 tracking-wide">
              Ewelina Mądra
            </span>

            {/* Twarda spacja (odstęp) między wyrazami */}
            {" "}

            {/* Druga część: Oswald Light (Salon Fryzjerski) */}
            <span className="font-[family-name:var(--font-oswald-light)] text-slate-700 font-light">
              Salon Fryzjerski
            </span>
          </h2>
          <p className="mt-2 text-lg text-slate-700 font-[family-name:var(--font-oswald-light)]">
            Profesjonalna pielęgnacja i stylizacja
          </p>

        </div>
      </div>
      {/* --- KONIEC SEKCJI Z TŁEM --- */}


      {/* KARTA "O MNIE" */}
      <div className="mt-12 w-full mx-auto flex flex-col md:flex-row max-w-5xl rounded-xl bg-white shadow-xl outline outline-black/5 z-10 overflow-hidden">

        {/* LEWA STRONA (TEKST) - Marginesy (padding) przenieśliśmy tylko tutaj */}
        {/* Dodałem też flex flex-col justify-center, żeby tekst wyśrodkował się w pionie */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold tracking-wider text-pink-400 mb-2 font-[family-name:var(--font-oswald-bold)]">
            O mnie
          </h2>
          <p className="text-lg font-[family-name:var(--font-oswald-light)] text-slate-600 leading-relaxed">
            Od ponad 10 lat tworzę piękne fryzury dla moich klientek. Nasz zespół doświadczonych stylistów stale podnosi swoje kwalifikacje, uczestnicząc w szkoleniach i podążając za najnowszymi trendami. Używamy wyłącznie profesjonalnych kosmetyków renomowanych marek.
          </p>
        </div>

        {/* PRAWA STRONA (ZDJĘCIE) - Zero marginesów! */}
        {/* h-auto sprawia, że na komputerze zdjęcie dopasuje się do wysokości tekstu, a min-h-[300px] gwarantuje, że na telefonie nie będzie zbyt płaskie */}
        <div className="flex-1 relative w-full min-h-[300px] md:min-h-full">
          <Image
            src="/portret.jpg" /* PAMIĘTAJ ZMIENIĆ NA NAZWĘ SWOJEGO ZDJĘCIA */
            alt="Ewelina Mądra przy pracy"
            fill
            className="object-cover"
          />
        </div>

      </div>

      {/* KARTA "CENNIK" */}
      <div className="mt-12 w-full mx-auto flex flex-col md:flex-row max-w-5xl rounded-xl bg-white shadow-xl outline outline-black/5 z-10 overflow-hidden">

        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold tracking-wider text-pink-400 mb-6 font-[family-name:var(--font-oswald-bold)]">
            Usługi
          </h2>

          {/* --- TABELA CENNIKA --- */}
          <div className="w-full">
            <table className="w-full text-left border-collapse">

              {/* NAGŁÓWKI TABELI */}
              <thead>
                <tr className="text-sm text-slate-400 border-b-2 border-slate-100 font-[family-name:var(--font-oswald-bold)] tracking-wider uppercase">
                  <th className="py-2 pr-4 font-normal text-left">Usługa</th>
                  <th className="py-2 px-4 font-normal text-center">Czas</th>
                  <th className="py-2 font-normal text-right">Cena</th>
                </tr>
              </thead>

              {/* ZAWARTOŚĆ TABELI */}
              <tbody className="font-[family-name:var(--font-oswald-light)] text-lg text-slate-700">

                {/* Wiersz 1 */}
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">Strzyżenie damskie</td>
                  <td className="py-3 px-4 text-center text-slate-500 text-base">60 min</td>
                  <td className="py-3 font-[family-name:var(--font-oswald-bold)] text-pink-500 text-right tracking-wide">od 80 zł</td>
                </tr>

                {/* Wiersz 2 */}
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">Strzyżenie męskie</td>
                  <td className="py-3 px-4 text-center text-slate-500 text-base">30 min</td>
                  <td className="py-3 font-[family-name:var(--font-oswald-bold)] text-pink-500 text-right tracking-wide">50 zł</td>
                </tr>

                {/* Wiersz 3 */}
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">Koloryzacja jednolita</td>
                  <td className="py-3 px-4 text-center text-slate-500 text-base">120 min</td>
                  <td className="py-3 font-[family-name:var(--font-oswald-bold)] text-pink-500 text-right tracking-wide">od 150 zł</td>
                </tr>

                {/* Wiersz 4 */}
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">Sombre / Ombre / Baleyage</td>
                  <td className="py-3 px-4 text-center text-slate-500 text-base">180 min</td>
                  <td className="py-3 font-[family-name:var(--font-oswald-bold)] text-pink-500 text-right tracking-wide">od 250 zł</td>
                </tr>

                {/* Wiersz 5 */}
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">Modelowanie okazjonalne</td>
                  <td className="py-3 px-4 text-center text-slate-500 text-base">45 min</td>
                  <td className="py-3 font-[family-name:var(--font-oswald-bold)] text-pink-500 text-right tracking-wide">od 100 zł</td>
                </tr>

              </tbody>
            </table>

            {/* Mała notatka pod cennikiem */}
            <p className="mt-6 text-sm text-slate-400 font-[family-name:var(--font-oswald-light)]">
              * Podane ceny są cenami orientacyjnymi. Ostateczny koszt zależy od długości i gęstości włosów oraz zużycia materiału.
            </p>
          </div>
          {/* --- KONIEC TABELI --- */}
        </div>


      </div>


      {/* GALERIA ZDJEC */}
      <div className="mt-12 w-full max-w-5xl mx-auto rounded-xl bg-white shadow-xl outline outline-black/5 z-10 p-8 md:p-12">

        <div className="mb-10">
          <h2 className="text-4xl font-bold tracking-wider text-pink-400 mb-2 font-[family-name:var(--font-oswald-bold)]">
            Nasze Prace
          </h2>
          <p className="text-slate-600 font-[family-name:var(--font-oswald-light)] text-xl tracking-wide">
            Zobacz metamorfozy naszych klientek
          </p>
        </div>

        {/* SIATKA ZDJĘĆ (GRID) */}
        {/* Na telefonie 2 kolumny, na komputerze 3 kolumny, ładne odstępy (gap-4) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

          {/* ZDJĘCIE 1 */}
          {/* Klasa 'group' pozwala nam na stworzenie animacji po najechaniu, a 'aspect-square' robi idealne kwadraty */}
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm group cursor-pointer">
            <Image
              src="/portret.jpg" /* PODMIEŃ NA: /galeria-1.jpg itp. */
              alt="Metamorfoza włosów 1"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* ZDJĘCIE 2 */}
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm group cursor-pointer">
            <Image
              src="/portret.jpg" /* PODMIEŃ NA SWOJE ZDJĘCIE */
              alt="Metamorfoza włosów 2"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* ZDJĘCIE 3 */}
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm group cursor-pointer">
            <Image
              src="/portret.jpg" /* PODMIEŃ NA SWOJE ZDJĘCIE */
              alt="Metamorfoza włosów 3"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* ZDJĘCIE 4 */}
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm group cursor-pointer">
            <Image
              src="/portret.jpg" /* PODMIEŃ NA SWOJE ZDJĘCIE */
              alt="Metamorfoza włosów 4"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* ZDJĘCIE 5 */}
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm group cursor-pointer">
            <Image
              src="/portret.jpg" /* PODMIEŃ NA SWOJE ZDJĘCIE */
              alt="Metamorfoza włosów 5"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* ZDJĘCIE 6 */}
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm group cursor-pointer">
            <Image
              src="/portret.jpg" /* PODMIEŃ NA SWOJE ZDJĘCIE */
              alt="Metamorfoza włosów 6"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

        </div>

        {/* PRZYCISK "ZOBACZ WIĘCEJ" (Opcjonalnie, jeśli chcesz potem zrobić osobną podstronę) */}
        <div className="mt-20 flex justify-center">
          <button className="rounded-full border-2 border-pink-400 px-8 py-2 text-pink-500 font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-pink-400 hover:text-white transition-colors duration-300">
            Zobacz nasz Instagram
          </button>
        </div>

      </div>

      {/* KARTA "KONTAKT" */}
      {/* Zmieniłem mt-12 na mt-20, żeby utrzymać te równe odstępy, o których rozmawialiśmy! */}
      <div className="mt-20 mb-12 w-full mx-auto flex flex-col md:flex-row max-w-5xl rounded-xl bg-white shadow-xl outline outline-black/5 z-10 overflow-hidden">

        {/* LEWA STRONA - DANE KONTAKTOWE */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold tracking-wider text-pink-400 mb-8 font-[family-name:var(--font-oswald-bold)]">
            Kontakt
          </h2>

          {/* Lista z danymi (space-y-4 dodaje równe odstępy w pionie między elementami) */}
          <div className="space-y-4 font-[family-name:var(--font-oswald-light)] text-xl text-slate-600 mb-10">

            {/* Telefon */}
            <div className="flex items-center gap-4">
              <span className="text-2xl">📞</span>
              {/* href="tel:..." sprawia, że na telefonie kliknięcie otwiera aplikację dzwonienia */}
              <a href="tel:+48123456789" className="hover:text-pink-500 transition-colors">
                +48 123 456 789
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <span className="text-2xl">✉️</span>
              {/* href="mailto:..." otwiera program pocztowy */}
              <a href="mailto:kontakt@salonewelina.pl" className="hover:text-pink-500 transition-colors">
                kontakt@salonewelina.pl
              </a>
            </div>

            {/* Adres */}
            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <span>ul. Piękna 15, 00-001 Warszawa</span>
            </div>

          </div>

          {/* Social Media */}
          <h3 className="text-lg text-slate-400 font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest mb-4">
            Znajdź nas w sieci
          </h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="px-5 py-2 bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-500 rounded-full transition-colors font-[family-name:var(--font-oswald-bold)] text-sm tracking-wider uppercase border border-slate-100">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="px-5 py-2 bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-500 rounded-full transition-colors font-[family-name:var(--font-oswald-bold)] text-sm tracking-wider uppercase border border-slate-100">
              Facebook
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="px-5 py-2 bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-500 rounded-full transition-colors font-[family-name:var(--font-oswald-bold)] text-sm tracking-wider uppercase border border-slate-100">
              TikTok
            </a>
          </div>

        </div>

        {/* PRAWA STRONA - MAPA GOOGLE */}
        <div className="flex-1 relative w-full min-h-[400px] md:min-h-full bg-slate-100">
          {/* Zastąpiliśmy <Image> tagiem <iframe> od Google Maps */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.446884615367!2d21.006935115796853!3d52.23192367976159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c9269e9a5%3A0x8c603b57f12e1a3f!2sPa%C5%82ac%20Kultury%20i%20Nauki!5e0!3m2!1spl!2spl!4v1625565541604!5m2!1spl!2spl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>

      </div>

    </main>
  );
}