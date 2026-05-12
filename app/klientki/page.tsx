"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPhone } from "@/lib/mockData";

export default function KlientkiPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchClients();
    }, []);

    async function fetchClients() {
        const res = await fetch("/api/klientki");
        const data = await res.json();
        setClients(data);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<any | null>(null);

    const [newClient, setNewClient] = useState({ name: "", phone: "", email: "", otherInfo: "" });

    const filteredClients = clients.filter((client) => {
        const query = searchQuery.toLowerCase();
        return (
            client.name?.toLowerCase().includes(query) ||
            (client.phone ?? "").includes(query)
        );
    });

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newClient.name || !newClient.phone) return;

        const res = await fetch("/api/klientki", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newClient.name,
                phone: newClient.phone,
                email: newClient.email,
                notes: newClient.otherInfo
            })
        });

        if (res.ok) {
            await fetchClients(); // 🔥 odświeżenie z bazy
            setNewClient({ name: "", phone: "", email: "", otherInfo: "" });
            setIsModalOpen(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-slate-50 text-slate-900 py-12 px-4 md:px-8 flex justify-center overflow-x-hidden">

            {/* WARSTWA TŁA */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src="/hair-salon-bg.png"
                    alt="Background"
                    fill
                    priority
                    className="object-cover grayscale opacity-10" // 
                />
            </div>

            {/* KONTENER TREŚCI */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">

                {/* NAGŁÓWEK SEKCYJNY */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-slate-600 mb-2 font-[family-name:var(--font-oswald-bold)] drop-shadow-md">
                            Baza Klientek
                        </h1>
                        <p className="text-lg text-slate-600 font-[family-name:var(--font-oswald-light)] max-w-2xl">
                            Zarządzaj swoimi klientkami, dodawaj nowe i przeglądaj historię.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-full bg-slate-600 px-6 py-3 text-white font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-slate-700 transition-all shadow-md hover:shadow-xl flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Dodaj Klientkę
                    </button>
                </div>

                {/* WYSZUKIWARKA */}
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-t-xl shadow-sm border-b border-slate-100 flex items-center">
                    <div className="relative w-full max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Szukaj po imieniu, nazwisku lub telefonie..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-colors font-[family-name:var(--font-oswald-light)] text-lg bg-white/50"
                        />
                    </div>
                </div>

                {/* TABELA KLIENTEK */}
                <div className="bg-white/95 backdrop-blur-md rounded-b-xl shadow-xl outline outline-black/5 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50/80 text-slate-500 border-b-2 border-slate-100 font-[family-name:var(--font-oswald-bold)] tracking-wider uppercase text-sm">
                                <th className="py-4 px-6 font-normal text-left">Imię i Nazwisko</th>
                                <th className="py-4 px-6 font-normal text-center">Telefon</th>
                                {/* Pusty nagłówek dla akcji, żeby nie było napisu */}
                                <th className="py-4 pr-4 font-normal text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="font-[family-name:var(--font-oswald-light)] text-lg text-slate-700">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">

                                        {/* 1. IMIĘ I NAZWISKO */}
                                        <td className="py-4 px-6 font-medium text-slate-800">
                                            {client.name}
                                        </td>

                                        {/* 2. TELEFON */}
                                        <td className="py-4 px-6 text-slate-500 font-[family-name:var(--font-oswald-bold)] tracking-wide text-center">
                                            {formatPhone(client.phone)}
                                        </td>

                                        {/* 3. AKCJE (justify-end przesuwa do prawej, pr-4 to mały margines bezpieczeństwa od samej krawędzi) */}
                                        <td className="py-4 pl-6 pr-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/klientki/${client.id}/rezerwacja`}
                                                    title="Dodaj wizytę"
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors shadow-sm border border-transparent hover:border-slate-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={`/klientki/${client.id}`}
                                                    title="Szczegóły"
                                                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-white rounded-lg transition-colors shadow-sm border border-transparent hover:border-slate-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    title="Usuń"
                                                    onClick={() => setClientToDelete(client)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors shadow-sm border border-transparent hover:border-slate-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    {/* Zmiana colSpan z 4 na 3, bo mamy 3 kolumny */}
                                    <td colSpan={3} className="py-12 text-center text-slate-400 text-xl font-[family-name:var(--font-oswald-light)]">
                                        Nie znaleziono klientek pasujących do wyszukiwania.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="bg-slate-50/80 border-t border-slate-100 p-4 text-slate-400 text-sm font-[family-name:var(--font-oswald-bold)] tracking-wider uppercase text-right rounded-b-xl">
                        Liczba klientek: {filteredClients.length}
                    </div>
                </div>


                {/* MODAL DODAWANIA KLIENTKI */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="text-2xl font-[family-name:var(--font-oswald-bold)] text-slate-500 tracking-wide">
                                    Nowa Klientka
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-500 rounded-full transition-colors flex items-center justify-center bg-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Formularz */}
                            <form onSubmit={handleAddClient} className="p-6 md:p-8 flex flex-col gap-5">
                                <div>
                                    <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">
                                        Imię i nazwisko
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newClient.name}
                                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                        className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-400 transition-colors font-[family-name:var(--font-oswald-light)] text-lg placeholder-slate-300 bg-transparent"
                                        placeholder="Wpisz imię i nazwisko..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={newClient.phone}
                                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                                        className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-400 transition-colors font-[family-name:var(--font-oswald-light)] text-lg placeholder-slate-300 bg-transparent"
                                        placeholder="np. 123 456 789"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">
                                        Email (opcjonalnie)
                                    </label>
                                    <input
                                        type="email"
                                        value={newClient.email}
                                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                        className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-400 transition-colors font-[family-name:var(--font-oswald-light)] text-lg placeholder-slate-300 bg-transparent"
                                        placeholder="np. anna.kowalska@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">
                                        Dodatkowe informacje (opcjonalnie)
                                    </label>
                                    <input
                                        type="text"
                                        value={newClient.otherInfo}
                                        onChange={(e) => setNewClient({ ...newClient, otherInfo: e.target.value })}
                                        className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-400 transition-colors font-[family-name:var(--font-oswald-light)] text-lg bg-transparent text-slate-700"
                                        placeholder="Np. uczulenia, preferencje..."
                                    />
                                </div>


                                <div className="mt-4 pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-3 text-slate-500 font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                                    >
                                        Anuluj
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-slate-400 text-white font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-slate-500 rounded-lg transition-colors shadow-sm"
                                    >
                                        Zapisz
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL POTWIERDZENIA USUNIĘCIA */}
                {clientToDelete && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setClientToDelete(null)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-100 bg-red-50 flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-[family-name:var(--font-oswald-bold)] text-red-600 tracking-wide">
                                    Potwierdź usunięcie
                                </h3>
                            </div>
                            <div className="p-6">
                                <p className="text-slate-600 font-[family-name:var(--font-oswald-light)] text-lg">
                                    Czy na pewno chcesz usunąć klientkę{" "}
                                    <span className="font-[family-name:var(--font-oswald-bold)] text-slate-800">
                                        {clientToDelete.name}
                                    </span>
                                    ? Tej operacji nie można cofnąć.
                                </p>
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setClientToDelete(null)}
                                        className="flex-1 py-3 text-slate-500 font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                                    >
                                        Anuluj
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await fetch(`/api/klientki/${clientToDelete.id}`, {
                                                method: "DELETE"
                                            });

                                            await fetchClients();
                                            setClientToDelete(null);
                                        }}
                                        className="flex-1 py-3 bg-red-500 text-white font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-red-600 rounded-lg transition-colors shadow-sm"
                                    >
                                        Usuń
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}