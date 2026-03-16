"use client";

import { useState, useEffect } from "react";
import { type Visit, getClientById, updateVisit, formatPhone } from "@/lib/mockData";

interface VisitDetailsModalProps {
  visit: Visit;
  isOpen: boolean;
  onClose: () => void;
}

export default function VisitDetailsModal({ visit, isOpen, onClose }: VisitDetailsModalProps) {
  const client = getClientById(visit.clientId);
  
  const [form, setForm] = useState({
    price: visit.price?.toString() || "",
    afterNotes: visit.afterNotes || "",
    photos: visit.photos || [],
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setForm({
      price: visit.price?.toString() || "",
      afterNotes: visit.afterNotes || "",
      photos: visit.photos || [],
    });
  }, [visit]);

  if (!isOpen) return null;

  const handleSave = () => {
    updateVisit(visit.id, {
      price: form.price ? parseFloat(form.price) : undefined,
      afterNotes: form.afterNotes,
      photos: form.photos,
      status: "odbyła się" // Jeśli zapisujemy detale z wizyty nadchodzącej, oznaczamy jako zakończoną
    });
    setIsEditing(false);
  };

  const handleFinishVisit = () => {
    setIsEditing(true);
  };

  const addMockPhoto = () => {
    const mockPhotos = [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop"
    ];
    const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    setForm(prev => ({ ...prev, photos: [...prev.photos, randomPhoto] }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
        
        {/* NAGŁÓWEK */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-pink-50/50">
          <div>
            <h3 className="text-2xl font-[family-name:var(--font-oswald-bold)] text-slate-800 tracking-wide">Szczegóły wizyty</h3>
            <p className="text-pink-400 font-[family-name:var(--font-oswald-light)] font-bold">{visit.date} • {visit.time} — {visit.endTime}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-pink-500 rounded-full transition-colors flex items-center justify-center bg-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 flex flex-col gap-8 overflow-y-auto max-h-[85vh]">
          
          {/* INFORMACJE O KLIENTCE I WIZYCIE */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 flex gap-4 items-center">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl font-[family-name:var(--font-oswald-bold)] text-pink-400">
                {client?.firstName[0]}{client?.lastName[0]}
              </div>
              <div>
                <h4 className="text-xl font-[family-name:var(--font-oswald-bold)] text-slate-800">{client?.firstName} {client?.lastName}</h4>
                <p className="text-slate-500 font-[family-name:var(--font-oswald-light)]">{client ? formatPhone(client.phone) : "Brak telefonu"}</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-[10px] font-[family-name:var(--font-oswald-bold)] text-slate-400 uppercase tracking-widest mb-1">Usługa</span>
                <p className="text-lg font-[family-name:var(--font-oswald-light)] text-slate-700 font-bold">{visit.service}</p>
                {visit.notes && (
                  <p className="mt-2 text-sm text-slate-400 italic">"{visit.notes}"</p>
                )}
            </div>
          </div>

          {/* STATUS I DZIAŁANIA */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-[family-name:var(--font-oswald-bold)] text-slate-700 uppercase tracking-wider underline decoration-pink-200 underline-offset-8">Informacje po wizycie</h5>
              <span className={`px-4 py-1 rounded-full text-[10px] uppercase font-[family-name:var(--font-oswald-bold)] tracking-widest ${visit.status === "odbyła się" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                {visit.status}
              </span>
            </div>

            {visit.status === "nadchodząca" && !isEditing ? (
              <div className="bg-blue-50/50 p-8 rounded-3xl border-2 border-dashed border-blue-100 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-400 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <p className="text-slate-600 font-[family-name:var(--font-oswald-light)] text-lg">Wizyta jeszcze się nie odbyła. <br/>Możesz ją zakończyć, aby dodać cenę i notatki.</p>
                <button 
                  onClick={handleFinishVisit}
                  className="px-8 py-3 bg-pink-400 text-white font-[family-name:var(--font-oswald-bold)] rounded-full uppercase tracking-widest hover:bg-pink-500 transition-all shadow-md hover:shadow-lg"
                >
                  Zakończ wizytę
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-2">Cena (PLN)</label>
                    <input 
                      type="number"
                      placeholder="Wpisz kwotę..."
                      value={form.price}
                      onChange={e => setForm({...form, price: e.target.value})}
                      className="w-full border-b-2 border-slate-100 py-2 focus:outline-none focus:border-pink-400 transition-colors text-xl font-[family-name:var(--font-oswald-light)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest mb-2">Notatki techniczne wykończeniowe</label>
                  <textarea 
                    rows={3}
                    placeholder="Np. jaka farba była użyta, proporcje, uwagi klientki..."
                    value={form.afterNotes}
                    onChange={e => setForm({...form, afterNotes: e.target.value})}
                    className="w-full border-2 border-slate-50 p-4 rounded-2xl focus:outline-none focus:border-pink-200 focus:bg-pink-50/20 transition-all text-lg font-[family-name:var(--font-oswald-light)] resize-none"
                  />
                </div>

                {/* GALERIA ZDJĘĆ */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-[family-name:var(--font-oswald-bold)] text-slate-500 uppercase tracking-widest">Zdjęcia z wizyty</label>
                    <button 
                      type="button"
                      onClick={addMockPhoto}
                      className="text-xs text-pink-400 font-bold uppercase hover:underline flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Dodaj zdjęcie
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {form.photos.map((url, idx) => (
                      <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm relative group">
                        <img src={url} alt="Visit photo" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <button 
                          onClick={() => setForm(prev => ({...prev, photos: prev.photos.filter((_, i) => i !== idx)}))}
                          className="absolute top-1 right-1 bg-black/40 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={addMockPhoto}
                      className="aspect-square rounded-xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 hover:border-pink-200 hover:text-pink-300 hover:bg-pink-50/30 transition-all gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                      </svg>
                      <span className="text-[10px] items-center uppercase font-bold tracking-tighter">Wstaw foto</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={handleSave}
                    className="flex-1 py-4 bg-slate-800 text-white font-[family-name:var(--font-oswald-bold)] rounded-2xl uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg"
                  >
                    Zapisz zmiany
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
