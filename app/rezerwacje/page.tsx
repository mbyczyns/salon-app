"use client";

import { useState, useEffect, useMemo } from "react";
import { visitsStore, clientsStore, type Visit, addVisit, subscribe, searchClients, type Client } from "@/lib/mockData";
import Link from "next/link";
import VisitDetailsModal from "@/components/VisitDetailsModal";

type ViewMode = "Lista" | "Kalendarz" | "Mój Dzień";

const SERVICES = [
    "Strzyżenie damskie",
    "Strzyżenie męskie",
    "Koloryzacja jednolita",
    "Sombre / Ombre / Baleyage",
    "Modelowanie okazjonalne",
];

export default function RezerwacjePage() {
    const [viewMode, setViewMode] = useState<ViewMode>("Lista");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    
    // Używamy stanu do wymuszenia re-renderu przy zmianach w store
    const [visits, setVisits] = useState(visitsStore);

    useEffect(() => {
        // Subskrypcja na zmiany w mockData (prosta reaktywność)
        const unsubscribe = subscribe(() => {
            setVisits([...visitsStore]);
        });
        return unsubscribe;
    }, []);

    const handleVisitClick = (visit: Visit) => {
        setSelectedVisit(visit);
        setIsDetailsModalOpen(true);
    };

    // Helper: Pobierz nazwę klienta po ID
    const getClientName = (clientId: string) => {
        const client = clientsStore.find(c => c.id === clientId);
        return client ? `${client.firstName} ${client.lastName}` : "Nieznany Klient";
    };

    // Helper: Formatuj datę do wyświetlenia
    const formatDateLong = (date: Date) => {
        return date.toLocaleDateString("pl-PL", { weekday: 'long', day: 'numeric', month: 'long' });
    };

    // Filtrowanie wizyt dla wybranego dnia
    const getVisitsForDate = (date: Date) => {
        const dateString = date.toLocaleDateString('en-CA');
        return visits.filter(v => v.date === dateString).sort((a, b) => a.time.localeCompare(b.time));
    };

    // Nawigacja datami
    const changeDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const changeMonth = (months: number) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + months);
        setSelectedDate(newDate);
    };

    return (
        <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] text-slate-900 py-12 px-4 md:px-8 flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto flex flex-col">
                
                {/* NAGŁÓWEK */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-pink-400 mb-2 font-[family-name:var(--font-oswald-bold)] drop-shadow-sm">
                            Kalendarz Rezerwacji
                        </h1>
                        <p className="text-lg text-slate-500 font-[family-name:var(--font-oswald-light)]">
                            Zarządzaj wizytami i planuj swój czas pracy.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="w-full md:w-auto rounded-full bg-pink-400 px-6 py-3 text-white font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-pink-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nowa Rezerwacja
                        </button>

                        <div className="flex bg-white p-1 rounded-full shadow-md border border-slate-100">
                            {(["Lista", "Kalendarz", "Mój Dzień"] as ViewMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-6 py-2 rounded-full font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase text-sm transition-all ${
                                        viewMode === mode 
                                        ? "bg-pink-400 text-white shadow-sm" 
                                        : "text-slate-400 hover:text-pink-400"
                                    }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* NAWIGACJA DATĄ */}
                {viewMode !== "Lista" && (
                    <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex gap-2">
                            <button 
                                onClick={() => viewMode === "Kalendarz" ? changeMonth(-1) : changeDate(-1)}
                                className="p-2 hover:bg-pink-50 text-pink-400 rounded-lg transition-colors border border-pink-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => setSelectedDate(new Date())}
                                className="px-4 py-2 hover:bg-pink-50 text-pink-400 rounded-lg transition-colors border border-pink-100 font-[family-name:var(--font-oswald-bold)] text-xs uppercase tracking-widest"
                            >
                                Dzisiaj
                            </button>
                            <button 
                                onClick={() => viewMode === "Kalendarz" ? changeMonth(1) : changeDate(1)}
                                className="p-2 hover:bg-pink-50 text-pink-400 rounded-lg transition-colors border border-pink-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                        <h2 className="text-2xl font-[family-name:var(--font-oswald-bold)] text-slate-700 capitalize">
                            {viewMode === "Kalendarz" 
                                ? selectedDate.toLocaleDateString("pl-PL", { month: 'long', year: 'numeric' })
                                : formatDateLong(selectedDate)
                            }
                        </h2>

                        <div className="w-32 hidden md:block"></div>
                    </div>
                )}

                {/* WIDOKI */}
                <div className="w-full">
                    {viewMode === "Lista" && <ListView visits={visits} getClientName={getClientName} onVisitClick={handleVisitClick} />}
                    {viewMode === "Kalendarz" && <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} setViewMode={setViewMode} visits={visits} />}
                    {viewMode === "Mój Dzień" && <DayView selectedDate={selectedDate} getVisitsForDate={getVisitsForDate} getClientName={getClientName} onVisitClick={handleVisitClick} />}
                </div>

                {/* MODAL NOWEJ REZERWACJI */}
                {isAddModalOpen && (
                    <AddReservationModal 
                        isOpen={isAddModalOpen} 
                        onClose={() => setIsAddModalOpen(false)} 
                        initialDate={selectedDate.toLocaleDateString('en-CA')}
                    />
                )}

                {/* MODAL SZCZEGÓŁÓW WIZYTY */}
                {selectedVisit && (
                    <VisitDetailsModal 
                        visit={selectedVisit} 
                        isOpen={isDetailsModalOpen} 
                        onClose={() => setIsDetailsModalOpen(false)} 
                    />
                )}
            </div>
        </main>
    );
}

// ─── MODAL REZERWACJI ─────────────────────────────────────────────────────────

function AddReservationModal({ isOpen, onClose, initialDate }: { isOpen: boolean, onClose: () => void, initialDate: string }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [form, setForm] = useState({
        date: initialDate,
        time: "",
        endTime: "",
        service: SERVICES[0],
        notes: "",
    });
    const [error, setError] = useState<string | null>(null);

    const filteredClients = useMemo(() => {
        if (searchQuery.length < 2) return [];
        return searchClients(searchQuery);
    }, [searchQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!selectedClient) {
            setError("Proszę wybrać klientkę.");
            return;
        }
        if (!form.time || !form.endTime) {
            setError("Proszę podać godziny.");
            return;
        }
        if (form.endTime <= form.time) {
            setError("Godzina zakończenia musi być późniejsza.");
            return;
        }

        // Prosta walidacja overlapu
        const hasOverlap = visitsStore.filter(v => v.date === form.date).some(v => 
            (form.time < v.endTime) && (form.endTime > v.time)
        );

        if (hasOverlap) {
            setError("Ten termin jest już zajęty.");
            return;
        }

        addVisit({
            clientId: selectedClient.id,
            date: form.date,
            time: form.time,
            endTime: form.endTime,
            service: form.service,
            notes: form.notes,
            status: "nadchodząca"
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-pink-50">
                    <h3 className="text-2xl font-[family-name:var(--font-oswald-bold)] text-pink-500 tracking-wide">Nowa Rezerwacja</h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-pink-500 rounded-full transition-colors flex items-center justify-center bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[80vh]">
                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold uppercase tracking-wide">{error}</div>}

                    {/* WYBÓR KLIENTKI */}
                    <div>
                        <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Klientka (szukaj po nazwisku)</label>
                        {!selectedClient ? (
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Wpisz min. 2 znaki..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-pink-400 transition-colors font-[family-name:var(--font-oswald-light)] text-lg placeholder-slate-300"
                                />
                                {filteredClients.length > 0 && (
                                    <div className="absolute z-10 top-full left-0 right-0 bg-white shadow-xl rounded-b-xl border border-slate-100 max-h-40 overflow-y-auto py-2">
                                        {filteredClients.map(c => (
                                            <button 
                                                key={c.id} 
                                                type="button" 
                                                onClick={() => { setSelectedClient(c); setSearchQuery(""); }}
                                                className="w-full text-left px-4 py-2 hover:bg-pink-50 text-slate-700 font-[family-name:var(--font-oswald-light)]"
                                            >
                                                {c.firstName} <span className="font-bold">{c.lastName}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-between items-center bg-pink-50 p-3 rounded-lg border border-pink-100">
                                <span className="font-[family-name:var(--font-oswald-bold)] text-pink-600">{selectedClient.firstName} {selectedClient.lastName}</span>
                                <button type="button" onClick={() => setSelectedClient(null)} className="text-xs text-slate-400 hover:text-red-500 uppercase font-bold px-2 py-1">Zmień</button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Data</label>
                            <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full border-b-2 border-slate-200 py-2 text-slate-700 bg-transparent" />
                        </div>
                        <div>
                            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Usługa</label>
                            <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full border-b-2 border-slate-200 py-2 bg-transparent">
                                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Start</label>
                            <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="w-full border-b-2 border-slate-200 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Koniec</label>
                            <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} className="w-full border-b-2 border-slate-200 py-2" />
                        </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Anuluj</button>
                        <button type="submit" className="flex-1 py-3 bg-pink-400 text-white font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest rounded-lg hover:bg-pink-500 shadow-md transition-colors">Zapisz</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── SUBSKŁADNIKI ─────────────────────────────────────────────────────────────

function ListView({ visits, getClientName, onVisitClick }: { visits: Visit[], getClientName: (id: string) => string, onVisitClick: (visit: Visit) => void }) {
    const sortedVisits = [...visits].sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 font-[family-name:var(--font-oswald-bold)] tracking-wider uppercase text-sm">
                        <th className="py-4 px-6 font-normal">Data i Godzina</th>
                        <th className="py-4 px-6 font-normal">Klientka</th>
                        <th className="py-4 px-6 font-normal">Usługa</th>
                        <th className="py-4 px-6 font-normal text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="font-[family-name:var(--font-oswald-light)] text-lg text-slate-700">
                    {sortedVisits.map((visit) => (
                        <tr key={visit.id} onClick={() => onVisitClick(visit)} className="border-b border-slate-50 hover:bg-pink-50/30 transition-colors cursor-pointer group">
                            <td className="py-4 px-6">
                                <div className="flex flex-col">
                                    <span className="font-[family-name:var(--font-oswald-bold)] text-slate-800">{visit.date}</span>
                                    <span className="text-pink-400 font-bold">{visit.time} - {visit.endTime}</span>
                                </div>
                            </td>
                            <td className="py-4 px-6 font-medium text-slate-800 group-hover:text-pink-500 transition-colors">
                                {getClientName(visit.clientId)}
                            </td>
                            <td className="py-4 px-6 text-slate-500 italic">
                                {visit.service}
                            </td>
                            <td className="py-4 px-6 text-right">
                                <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold ${
                                    visit.status === "odbyła się" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                                }`}>
                                    {visit.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function CalendarView({ selectedDate, setSelectedDate, setViewMode, visits }: { selectedDate: Date, setSelectedDate: (d: Date) => void, setViewMode: (m: ViewMode) => void, visits: Visit[] }) {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    const dayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

    const getVisitCount = (date: Date) => {
        const ds = date.toLocaleDateString('en-CA');
        return visits.filter(v => v.date === ds).length;
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <div className="grid grid-cols-7 mb-4">
                {dayNames.map(d => (
                    <div key={d} className="text-center py-2 text-slate-400 font-[family-name:var(--font-oswald-bold)] text-sm uppercase tracking-widest">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days.map((date, idx) => {
                    if (!date) return <div key={`empty-${idx}`} className="aspect-square"></div>;
                    const count = getVisitCount(date);
                    const isToday = new Date().toDateString() === date.toDateString();
                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => { setSelectedDate(date); setViewMode("Mój Dzień"); }}
                            className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all hover:border-pink-300 hover:bg-pink-50 group ${isToday ? "border-pink-400 bg-pink-50" : "border-slate-100 bg-slate-50/30"}`}
                        >
                            <span className={`text-xl font-[family-name:var(--font-oswald-bold)] ${isToday ? "text-pink-500" : "text-slate-700"}`}>{date.getDate()}</span>
                            {count > 0 && <div className="absolute top-2 right-2"><div className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]"></div></div>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function DayView({ selectedDate, getVisitsForDate, getClientName, onVisitClick }: { selectedDate: Date, getVisitsForDate: (d: Date) => Visit[], getClientName: (id: string) => string, onVisitClick: (visit: Visit) => void }) {
    const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 do 20:00
    const dayVisits = getVisitsForDate(selectedDate);
    const HOUR_HEIGHT = 100; // px

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col relative overflow-hidden">
            {/* Siatka godzinowa w tle */}
            <div className="flex flex-col relative z-0">
                {hours.map((hour) => {
                    const isNow = new Date().getHours() === hour && new Date().toDateString() === selectedDate.toDateString();
                    return (
                        <div key={hour} style={{ height: `${HOUR_HEIGHT}px` }} className={`flex border-b border-slate-50 last:border-0 transition-colors ${isNow ? "bg-pink-50/20" : ""}`}>
                            <div className="w-20 md:w-32 py-4 px-4 border-r border-slate-50 flex flex-col items-center justify-start bg-slate-50/30">
                                <span className={`text-xl font-[family-name:var(--font-oswald-bold)] ${isNow ? "text-pink-500" : "text-slate-400"}`}>{hour}:00</span>
                                {isNow && <span className="text-[10px] text-pink-400 font-bold uppercase tracking-tighter mt-1 animate-pulse">Teraz</span>}
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    );
                })}
            </div>

            {/* Warstwa wizyt (pozycjonowana absolutnie) */}
            <div className="absolute top-0 right-0 left-20 md:left-32 bottom-0 z-10 pointer-events-none">
                {dayVisits.map((visit) => {
                    const [h, m] = visit.time.split(":").map(Number);
                    const [eh, em] = visit.endTime.split(":").map(Number);
                    
                    const startPos = ((h - 8) * HOUR_HEIGHT) + (m / 60 * HOUR_HEIGHT);
                    const durationInMin = (eh * 60 + em) - (h * 60 + m);
                    const height = (durationInMin / 60) * HOUR_HEIGHT;

                    return (
                        <div 
                            key={visit.id}
                            onClick={() => onVisitClick(visit)}
                            style={{ 
                                top: `${startPos}px`, 
                                height: `${height}px`,
                                width: 'calc(100% - 2rem)',
                                left: '1rem'
                            }}
                            className="absolute pointer-events-auto bg-white border-l-4 border-pink-400 shadow-lg rounded-r-xl p-4 overflow-hidden hover:z-20 transition-all flex flex-col justify-start gap-1 cursor-pointer hover:bg-pink-50/20"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col min-w-0">
                                    <span className="text-pink-500 font-[family-name:var(--font-oswald-bold)] text-lg leading-tight truncate">
                                        {visit.time} — {visit.endTime} : {getClientName(visit.clientId)}
                                    </span>
                                    <span className="text-slate-600 font-[family-name:var(--font-oswald-light)] text-sm font-bold truncate">
                                        {visit.service}
                                    </span>
                                </div>
                                <span className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${visit.status === "odbyła się" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                                    {visit.status}
                                </span>
                            </div>
                            {visit.notes && <p className="text-xs text-slate-400 italic line-clamp-2 mt-1">{visit.notes}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
