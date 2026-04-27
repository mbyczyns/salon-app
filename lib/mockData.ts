// Definicje typów
export interface Client {
  id: string;
  name: string;

  phone: string;
  email: string;
  lastVisit?: string;
  otherInfo?: string;
}

export type VisitStatus = "odbyła się" | "nadchodząca";

export interface Visit {
  id: string;
  clientId: string;
  date: string;       // ISO format "YYYY-MM-DD"
  time: string;       // np. "10:00"
  endTime: string;    // np. "11:00"
  service: string;
  notes?: string;
  price?: number;
  afterNotes?: string;
  photos?: string[];
  status: VisitStatus;
}

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface User {
  id: string;
  name: string;
  login: string;
  password: string;
}

// ─── Mock data ──────────────────────────────────────────────────────────────

export let usersStore: User[] = [
  { id: "1", name: "Ewelina Madra", login: "ewelina", password: "ewelina1" },
  { id: "2", name: "admin", login: "admin", password: "admin1" },
];

// Używamy let, aby umożliwić modyfikację w trakcie trwania sesji
export let clientsStore: Client[] = [
  { id: "1", name: "Anna Kowalska", phone: "123456789", email: "[EMAIL_ADDRESS]", lastVisit: "2025-10-15", otherInfo: "uczulenie na " },
  { id: "2", name: "Katarzyna Nowak", phone: "987654321", email: "[EMAIL_ADDRESS]", lastVisit: "2025-11-02", otherInfo: "bardzo dlugie wlosy" },
  { id: "3", name: "Magdalena Wiśniewska", phone: "555444333", email: "[EMAIL_ADDRESS]", lastVisit: "2025-09-20", otherInfo: "" },
  { id: "4", name: "Zofia Wójcik", phone: "111222333", email: "[EMAIL_ADDRESS]", lastVisit: "2025-11-10", otherInfo: "" },
  { id: "5", name: "Ewelina Madra", phone: "123456789", email: "[EMAIL_ADDRESS]", lastVisit: "2025-10-15", otherInfo: "uczulenie na " },
  { id: "6", name: "Krystyna Woźniak", phone: "123456789", email: "[EMAIL_ADDRESS]", lastVisit: "2025-10-15", otherInfo: "uczulenie na " },
  { id: "7", name: "Olga Kasprzak", phone: "123456789", email: "[EMAIL_ADDRESS]", lastVisit: "2025-10-15", otherInfo: "uczulenie na " },
  { id: "8", name: "Maria Wysocka", phone: "123456789", email: "[EMAIL_ADDRESS]", lastVisit: "2025-10-15", otherInfo: "uczulenie na " },
  { id: "9", name: "Kasia Kowalczyk", phone: "123456789", email: "[EMAIL_ADDRESS]", lastVisit: "2025-10-15", otherInfo: "uczulenie na " },
  { id: "10", name: "Asia Bąk", phone: "123456789", email: "[EMAIL_ADDRESS]", lastVisit: "2025-10-15", otherInfo: "uczulenie na " },
];

export let servicesStore: Service[] = [
  { name: "Strzyżenie damskie", description: "opis uslugi Strzyżenie damskie", price: 80, duration: 60 },
  { name: "Strzyżenie męskie", description: "opis uslugi Strzyżenie męskie", price: 50, duration: 30 },
  { name: "Koloryzacja jednolita", description: "opis uslugi Koloryzacja jednolita", price: 150, duration: 120 },
  { name: "Sombre / Ombre / Baleyage", description: "opis uslugi Sombre / Ombre / Baleyage", price: 200, duration: 180 },
  { name: "Modelowanie okazjonalne", description: "opis uslugi Modelowanie okazjonalne", price: 100, duration: 90 },
];


export let visitsStore: Visit[] = [
  // Anna Kowalska
  { id: "v1", clientId: "1", date: "2025-10-15", time: "10:00", endTime: "11:30", service: "Strzyżenie damskie", status: "odbyła się", price: 120, afterNotes: "Bardzo zadowolona, chce tak samo nastepnym razem.", photos: ["https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop"] },
  { id: "v2", clientId: "1", date: "2025-07-20", time: "11:30", endTime: "13:00", service: "Koloryzacja jednolita", status: "odbyła się" },
  { id: "v3", clientId: "1", date: "2026-04-02", time: "09:00", endTime: "10:00", service: "Strzyżenie damskie", status: "nadchodząca" },

  // Katarzyna Nowak
  { id: "v4", clientId: "2", date: "2025-11-02", time: "13:00", endTime: "15:00", service: "Strzyżenie damskie", status: "odbyła się", price: 150, afterNotes: "Wlosy grube, wymagaja dluzszego suszenia." },
  { id: "v5", clientId: "2", date: "2026-03-25", time: "14:00", endTime: "16:30", service: "Sombre / Ombre / Baleyage", status: "nadchodząca" },

  // Magdalena Wiśniewska
  { id: "v6", clientId: "3", date: "2025-09-20", time: "09:30", endTime: "11:00", service: "Modelowanie okazjonalne", status: "odbyła się" },

  // Zofia Wójcik
  { id: "v7", clientId: "4", date: "2025-11-10", time: "15:00", endTime: "17:00", service: "Koloryzacja jednolita", status: "odbyła się" },
  { id: "v8", clientId: "4", date: "2025-08-05", time: "10:00", endTime: "11:30", service: "Strzyżenie damskie", status: "odbyła się" },
  { id: "v9", clientId: "4", date: "2026-04-10", time: "11:00", endTime: "12:00", service: "Strzyżenie męskie", status: "nadchodząca" },
];

// Rejestr subskrypcji (uproszczony system reaktywności dla celów demonstracyjnych)
const listeners: (() => void)[] = [];
export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

function notify() {
  listeners.forEach(l => l());
}


export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.match(/.{1,3}/g)?.join(" ") ?? phone;
}
