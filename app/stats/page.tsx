export default function StatsPage() {
    return (
        <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] text-slate-900 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-pink-400 mb-6 font-[family-name:var(--font-oswald-bold)] drop-shadow-sm">
                Statystyki
            </h1>
            <p className="text-xl text-slate-600 font-[family-name:var(--font-oswald-light)] max-w-2xl leading-relaxed">
                To jest strona statystyk. Routing działa poprawnie. W tym miejscu w przyszłości zintegrujesz kalendarz, harmonogram pracy i nadchodzące spotkania klientek.
            </p>
        </main>
    );
}
