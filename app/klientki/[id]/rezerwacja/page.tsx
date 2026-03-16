"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getClientById, formatPhone, addVisit, visitsStore } from "@/lib/mockData";
import Link from "next/link";

const SERVICES = [
  "Strzyżenie damskie",
  "Strzyżenie męskie",
  "Koloryzacja jednolita",
  "Sombre / Ombre / Baleyage",
  "Modelowanie okazjonalne",
];

export default function RezerwacjaPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const client = getClientById(id);

  const [form, setForm] = useState({
    date: "",
    time: "",
    endTime: "",
    service: SERVICES[0],
    notes: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!client) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[oklch(96.7%_0.001_286.375)]">
        <p className="text-slate-500 text-xl font-[family-name:var(--font-oswald-light)]">
          Nie znaleziono klientki.
        </p>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.date || !form.time || !form.endTime) {
      setError("Proszę wypełnić wszystkie wymagane pola.");
      return;
    }

    if (form.endTime <= form.time) {
      setError("Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.");
      return;
    }

    // Walidacja nakładania się wizyt
    const sameDayVisits = visitsStore.filter((v: any) => v.date === form.date);

    const hasOverlap = sameDayVisits.some((v: any) => {
      return (form.time < v.endTime) && (form.endTime > v.time);
    });

    if (hasOverlap) {
      setError("W wybranym terminie istnieje już inna rezerwacja. Proszę wybrać inną godzinę.");
      return;
    }

    // Dodanie do store'a
    addVisit({
      clientId: id,
      date: form.date,
      time: form.time,
      endTime: form.endTime,
      service: form.service,
      notes: form.notes,
      status: "nadchodząca"
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-[family-name:var(--font-oswald-bold)] text-slate-800 tracking-wide mb-2">
            Wizyta zapisana!
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-oswald-light)] text-lg mb-8">
            Rezerwacja dla <span className="font-[family-name:var(--font-oswald-bold)] text-slate-700">{client.firstName} {client.lastName}</span> na {form.date} w godzinach {form.time} - {form.endTime} została dodana.
          </p>
          <Link
            href={`/klientki/${client.id}`}
            className="inline-block rounded-full bg-pink-400 px-8 py-3 text-white font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-pink-500 transition-colors shadow-md"
          >
            Wróć do profilu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] text-slate-900 py-12 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-slate-400 text-sm font-[family-name:var(--font-oswald-light)]">
          <Link href="/klientki" className="hover:text-pink-400 transition-colors">
            Baza Klientek
          </Link>
          <span>/</span>
          <Link href={`/klientki/${client.id}`} className="hover:text-pink-400 transition-colors">
            {client.firstName} {client.lastName}
          </Link>
          <span>/</span>
          <span className="text-slate-600">Nowa wizyta</span>
        </div>

        {/* MINI PROFIL */}
        <div className="bg-white rounded-2xl shadow-xl outline outline-black/5 px-8 py-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-[family-name:var(--font-oswald-bold)] text-pink-400">
              {client.firstName[0]}{client.lastName[0]}
            </span>
          </div>
          <div>
            <p className="text-xl font-[family-name:var(--font-oswald-bold)] text-slate-800">
              {client.firstName} {client.lastName}
            </p>
            <p className="text-slate-500 font-[family-name:var(--font-oswald-light)]">
              {formatPhone(client.phone)}
            </p>
          </div>
        </div>

        {/* FORMULARZ */}
        <div className="bg-white rounded-2xl shadow-xl outline outline-black/5 p-8 md:p-10">
          <h1 className="text-3xl font-[family-name:var(--font-oswald-bold)] text-pink-400 tracking-wide mb-8">
            Nowa wizyta
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7">

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded text-red-700 font-[family-name:var(--font-oswald-light)]">
                {error}
              </div>
            )}

            {/* Data */}
            <div>
              <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-2">
                Data wizyty
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border-b-2 border-slate-200 py-2 text-lg font-[family-name:var(--font-oswald-light)] focus:outline-none focus:border-pink-400 transition-colors bg-transparent text-slate-700"
              />
            </div>

            {/* Godziny */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-2">
                  Godzina rozpoczęcia
                </label>
                <input
                  type="time"
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full border-b-2 border-slate-200 py-2 text-lg font-[family-name:var(--font-oswald-light)] focus:outline-none focus:border-pink-400 transition-colors bg-transparent text-slate-700"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-2">
                  Godzina zakończenia
                </label>
                <input
                  type="time"
                  required
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="w-full border-b-2 border-slate-200 py-2 text-lg font-[family-name:var(--font-oswald-light)] focus:outline-none focus:border-pink-400 transition-colors bg-transparent text-slate-700"
                />
              </div>
            </div>

            {/* Usługa */}
            <div>
              <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-2">
                Usługa
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full border-b-2 border-slate-200 py-2 text-lg font-[family-name:var(--font-oswald-light)] focus:outline-none focus:border-pink-400 transition-colors bg-transparent text-slate-700 cursor-pointer"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Notatki */}
            <div>
              <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-2">
                Notatki (opcjonalnie)
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Np. klientka woli krótkie włosy, uczulona na farby..."
                className="w-full border-b-2 border-slate-200 py-2 text-lg font-[family-name:var(--font-oswald-light)] focus:outline-none focus:border-pink-400 transition-colors bg-transparent text-slate-700 resize-none placeholder-slate-300"
              />
            </div>

            {/* Przyciski */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 text-slate-500 font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-pink-400 text-white font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-pink-500 rounded-xl transition-colors shadow-sm"
              >
                Zapisz wizytę
              </button>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}
