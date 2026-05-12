"use client";

import { formatPhone, type Visit } from "@/lib/mockData";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import VisitDetailsModal from "@/components/VisitDetailsModal";

export default function KlientkaDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

  const router = useRouter();

  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/klientki/${id}/details`)
      .then(res => res.json())
      .then(data => {
        setClient(data.client);
        setVisits(data.visits);
      })
      .catch(console.error);
  }, [id]);

  if (!client) return <div>Ładowanie...</div>;

  const upcoming = visits
    .filter((v) => v.status === "Nadchodząca")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = visits
    .filter((v) => v.status === "Odbyta")
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsModalOpen(true);
  };

  const handleEditSave = async (updatedData: any) => {
    try {
      const res = await fetch(`/api/klientki/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const updatedClient = await res.json();
        setClient(updatedClient);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/klientki/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        router.push("/klientki");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] text-slate-900 py-12 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-slate-400 text-sm font-[family-name:var(--font-oswald-light)]">
          <Link href="/klientki" className="hover:text-slate-500 transition-colors">
            Baza Klientek
          </Link>
          <span>/</span>
          <span className="text-slate-600">{client.name}</span>
        </div>

        {/* KARTA PROFILU I INFORMACJI (Nowy, zwarty układ z przyciskami po prawej) */}
        <div className="bg-white rounded-2xl shadow-xl outline outline-black/5 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start gap-8 w-full">

          {/* LEWA STRONA: Awatar + Informacje ułożone pionowo */}
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            {/* Awatar */}
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-[family-name:var(--font-oswald-bold)] text-slate-400">
                {client.name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
              </span>
            </div>

            {/* Dane pionowo */}
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald-bold)] text-slate-800 tracking-wide mb-2">
                {client.name}
              </h1>

              <div className="flex items-center gap-3 text-lg text-slate-600 font-[family-name:var(--font-oswald-light)]">
                <span className="text-xl">📞</span>
                {formatPhone(client.phone)}
              </div>

              {client.email && (
                <div className="flex items-center gap-3 text-lg text-slate-600 font-[family-name:var(--font-oswald-light)]">
                  <span className="text-xl">✉️</span>
                  {client.email}
                </div>
              )}

              {/* Dodatkowe informacje */}
              <div className="mt-4">
                <span className="text-xs font-[family-name:var(--font-oswald-bold)] text-slate-400 uppercase tracking-widest block mb-1">
                  Dodatkowe informacje
                </span>
                <p className="text-base text-slate-600 font-[family-name:var(--font-oswald-light)] leading-snug">
                  {client.notes ? client.notes : "Brak informacji"}
                </p>
              </div>
            </div>
          </div>

          {/* PRAWA STRONA: Przyciski akcji (kolumna) */}
          <div className="flex flex-col gap-3 w-full md:w-48 flex-shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">

            {/* 1. Dodaj wizytę (Główny przycisk) */}
            <Link
              href={`/klientki/${id}/rezerwacja`}
              className="w-full rounded-xl bg-slate-400 px-4 py-3 text-white font-[family-name:var(--font-oswald-bold)] text-sm tracking-widest uppercase hover:bg-slate-500 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Dodaj wizytę
            </Link>

            {/* 2. Edytuj dane (Neutralny) */}
            <button
              className="w-full rounded-xl bg-slate-100 px-4 py-3 text-slate-600 font-[family-name:var(--font-oswald-bold)] text-sm tracking-widest uppercase hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              onClick={() => setIsEditModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              Edytuj dane
            </button>

            {/* 3. Usuń klienta (Ostrzegawczy) */}
            <button
              className="w-full rounded-xl bg-red-50 px-4 py-3 text-red-500 font-[family-name:var(--font-oswald-bold)] text-sm tracking-widest uppercase hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Usuń klienta
            </button>

          </div>
        </div>

        {/* NADCHODZĄCE WIZYTY */}
        <VisitsSection
          title="Nadchodzące wizyty"
          visits={upcoming}
          emptyText="Brak zaplanowanych wizyt."
          accent="slate"
          onVisitClick={handleVisitClick}
        />

        {/* HISTORIA WIZYT */}
        <VisitsSection
          title="Historia wizyt"
          visits={past}
          emptyText="Brak historii wizyt."
          accent="slate"
          onVisitClick={handleVisitClick}
        />

        {selectedVisit && (
          <VisitDetailsModal
            visit={selectedVisit}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {isEditModalOpen && (
          <EditClientModal
            client={client}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEditSave}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteClientModal
            clientName={client.name}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
        )}

      </div>
    </main>
  );
}

// ─── Sub-komponenty ────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-[family-name:var(--font-oswald-bold)] text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </dt>
      <dd className="text-lg font-[family-name:var(--font-oswald-light)] text-slate-700">
        {value}
      </dd>
    </div>
  );
}

function VisitsSection({
  title,
  visits,
  emptyText,
  accent,
  onVisitClick,
}: {
  title: string;
  visits: Visit[];
  emptyText: string;
  accent: "slate";
  onVisitClick: (v: Visit) => void;
}) {
  const headingColor = "text-slate-500";
  const badgeClass = "bg-slate-100 text-slate-500 border border-slate-200";

  return (
    <div className="bg-white rounded-2xl shadow-xl outline outline-black/5 p-8 md:p-10">
      <h2 className={`text-2xl font-[family-name:var(--font-oswald-bold)] ${headingColor} tracking-wide mb-6`}>
        {title}
      </h2>

      {visits.length === 0 ? (
        <p className="text-slate-400 font-[family-name:var(--font-oswald-light)] text-lg">
          {emptyText}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {visits.map((visit) => (
            <div
              key={visit.id}
              onClick={() => onVisitClick(visit)}
              className="group flex flex-col md:flex-row md:items-center gap-3 p-5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-50/50 hover:border-slate-200 transition-all shadow-sm hover:shadow-md"
            >
              {/* Data i godzina */}
              <div className="flex-shrink-0 text-center md:text-left">
                <p className="text-2xl font-[family-name:var(--font-oswald-bold)] text-slate-700">
                  {visit.date}
                </p>
                <p className="text-base text-slate-400 font-[family-name:var(--font-oswald-light)] uppercase tracking-tighter">
                  {visit.time} — {visit.endTime}
                </p>
              </div>

              <div className="hidden md:block w-px h-10 bg-slate-200 mx-4" />

              {/* Usługa i notatki */}
              <div className="flex-1">
                <p className="text-lg font-[family-name:var(--font-oswald-bold)] text-slate-800 group-hover:text-slate-500 transition-colors">
                  {visit.service}
                </p>
                <div className="flex gap-4 items-center">
                  {visit.price && (
                    <p className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 rounded">
                      {visit.price} PLN
                    </p>
                  )}
                  {visit.afterNotes && (
                    <p className="text-sm text-slate-400 font-[family-name:var(--font-oswald-light)] italic truncate max-w-xs">
                      {visit.afterNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Badge status */}
              <span className={`self-start md:self-center px-4 py-1 rounded-full text-[10px] font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase ${badgeClass}`}>
                {visit.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EditClientModal({ client, isOpen, onClose, onSave }: any) {
  const [form, setForm] = useState({
    name: client.name || "",
    phone: client.phone || "",
    email: client.email || "",
    notes: client.notes || ""
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-2xl font-[family-name:var(--font-oswald-bold)] text-slate-500 tracking-wide">Edytuj Dane</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-500 rounded-full transition-colors flex items-center justify-center bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Imię i nazwisko</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-400 transition-colors text-slate-600 font-[family-name:var(--font-oswald-light)]" required />
          </div>
          <div>
            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Telefon</label>
            <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-400 transition-colors text-slate-600 font-[family-name:var(--font-oswald-light)]" />
          </div>
          <div>
            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">E-mail</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-slate-400 transition-colors text-slate-600 font-[family-name:var(--font-oswald-light)]" />
          </div>
          <div>
            <label className="block text-sm font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-1">Dodatkowe informacje</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full border-2 border-slate-200 rounded-lg p-2 focus:outline-none focus:border-slate-400 transition-colors text-slate-600 font-[family-name:var(--font-oswald-light)]" rows={3}></textarea>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Anuluj</button>
            <button type="submit" className="flex-1 py-3 bg-slate-400 text-white font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest rounded-lg hover:bg-slate-500 shadow-md transition-colors">Zapisz</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function DeleteClientModal({ isOpen, onClose, onConfirm, clientName }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center" onClick={e => e.stopPropagation()}>
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-[family-name:var(--font-oswald-bold)] text-slate-800 mb-2">Usuń klienta</h3>
        <p className="text-slate-500 font-[family-name:var(--font-oswald-light)] mb-6">
          Czy na pewno chcesz usunąć klienta <strong>{clientName}</strong>? Ta operacja usunie również wszystkie przypisane wizyty.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-slate-500 font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Anuluj</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 text-white font-[family-name:var(--font-oswald-bold)] uppercase tracking-widest rounded-lg hover:bg-red-600 shadow-md transition-colors">Usuń</button>
        </div>
      </div>
    </div>,
    document.body
  );
}