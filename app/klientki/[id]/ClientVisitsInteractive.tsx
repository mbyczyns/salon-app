"use client";

import { useState } from "react";
import VisitDetailsModal from "@/components/VisitDetailsModal";
import type { Visit } from "@/lib/mockData";

export default function ClientVisitsInteractive({ visits }: { visits: Visit[] }) {
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
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
    </>
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
