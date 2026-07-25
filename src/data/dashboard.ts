import type { BookingSummary } from "../types/booking";

export const dashboardStats = {
  totalBookings: 1284,
  todaysVisits: 37,
  phoneConsultations: 61,
  revenue: 18420000,
  patients: 3902,
  providersOnline: 22,
};

export const recentBookings: BookingSummary[] = [
  {
    id: "b1",
    reference: "WC-D2D-482913",
    category: "home-visit",
    serviceName: "General Physician Home Visit",
    patientName: "Adaeze N.",
    price: 50000,
    status: "en-route",
    createdAt: "2026-07-24T09:12:00Z",
  },
  {
    id: "b2",
    reference: "WC-PHN-118820",
    category: "phone-consultation",
    serviceName: "Voice Consultation",
    patientName: "Emeka O.",
    price: 15000,
    status: "in-progress",
    createdAt: "2026-07-24T08:47:00Z",
  },
  {
    id: "b3",
    reference: "WC-D2D-482801",
    category: "home-visit",
    serviceName: "Registered Nurse Visit",
    patientName: "Fatima B.",
    price: 35000,
    status: "completed",
    createdAt: "2026-07-24T07:30:00Z",
  },
  {
    id: "b4",
    reference: "WC-VID-004471",
    category: "video-consultation",
    serviceName: "Video Consultation",
    patientName: "Segun A.",
    price: 25000,
    status: "confirmed",
    createdAt: "2026-07-24T06:58:00Z",
  },
  {
    id: "b5",
    reference: "WC-D2D-482655",
    category: "home-visit",
    serviceName: "Specialist Consultation",
    patientName: "Ijeoma K.",
    price: 100000,
    status: "pending",
    createdAt: "2026-07-24T06:20:00Z",
  },
];

export const upcomingVisits = recentBookings.filter((b) =>
  ["pending", "confirmed", "en-route"].includes(b.status),
);
