"use client";

import { formatPhone, type Visit } from "@/lib/mockData";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import VisitDetailsModal from "@/components/VisitDetailsModal";

export default function KlientkaDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    .filter((v) => v.status === "nadchodząca")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = visits
    .filter((v) => v.status === "odbyła się")
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[oklch(96.7%_0.001_286.375)] text-slate-900 py-12 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-slate-400 text-sm font-[family-name:var(--font-oswald-light)]">
          <Link href="/klientki" className="hover:text-pink-400 transition-colors">
            Baza Klientek
          </Link>
          <span>/</span>
          <span className="text-slate-600">{client.firstName} {client.lastName}</span>
        </div>

        {/* NAGŁÓWEK – PROFIL */}
        <div className="bg-white rounded-2xl shadow-xl outline outline-black/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-[family-name:var(--font-oswald-bold)] text-pink-400">
              {client.firstName[0]}{client.lastName[0]}
            </span>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-[family-name:var(--font-oswald-bold)] text-slate-800 tracking-wide">
              {client.firstName} {client.lastName}
            </h1>
            <p className="text-xl text-slate-500 font-[family-name:var(--font-oswald-light)] mt-1">
              {formatPhone(client.phone)}
            </p>
          </div>

          <Link
            href={`/klientki/${id}/rezerwacja`}
            className="rounded-full bg-pink-400 px-6 py-3 text-white font-[family-name:var(--font-oswald-bold)] tracking-widest uppercase hover:bg-pink-500 transition-colors shadow-md flex items-center gap-2 self-start md:self-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Dodaj wizytę
          </Link>
        </div>

        {/* DANE KLIENTKI */}
        <div className="bg-white rounded-2xl shadow-xl outline outline-black/5 p-8 md:p-10">
          <h2 className="text-2xl font-[family-name:var(--font-oswald-bold)] text-pink-400 tracking-wide mb-6">
            Dane klientki
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoRow label="Imię" value={client.firstName} />
            <InfoRow label="Nazwisko" value={client.lastName} />
            <InfoRow label="Telefon" value={formatPhone(client.phone)} />
            <InfoRow label="Ostatnia wizyta" value={client.lastVisit ?? "Brak danych"} />
          </dl>
        </div>

        {/* NADCHODZĄCE WIZYTY */}
        <VisitsSection
          title="Nadchodzące wizyty"
          visits={upcoming}
          emptyText="Brak zaplanowanych wizyt."
          accent="pink"
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
  accent: "pink" | "slate";
  onVisitClick: (v: Visit) => void;
}) {
  const headingColor = accent === "pink" ? "text-pink-400" : "text-slate-500";
  const badgeClass =
    accent === "pink"
      ? "bg-pink-50 text-pink-500 border border-pink-200"
      : "bg-slate-100 text-slate-500 border border-slate-200";

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
              className="group flex flex-col md:flex-row md:items-center gap-3 p-5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-pink-50/50 hover:border-pink-200 transition-all shadow-sm hover:shadow-md"
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
                <p className="text-lg font-[family-name:var(--font-oswald-bold)] text-slate-800 group-hover:text-pink-500 transition-colors">
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
