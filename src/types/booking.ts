import type { ServiceCategory } from "./provider";

export type VisitTiming = "asap" | "scheduled";
export type SexPreference = "No preference" | "Male" | "Female";

export interface PatientDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  visitFor: "Myself" | "Someone else";
}

export interface HomeVisitLocation {
  address: string;
  area: string;
  state: string;
  zip: string;
}

export interface HomeVisitBookingDraft {
  serviceId: string | null;
  isEmergency: boolean;
  patient: PatientDetails;
  location: HomeVisitLocation;
  timing: VisitTiming;
  scheduledFor?: string;
  specialty: string;
  providerSexPreference: SexPreference;
  complaint: string;
}

export interface PhoneConsultationDraft {
  serviceId: string | null;
  mode: "voice" | "video";
  patient: PatientDetails;
  specialty: string;
  complaint: string;
  timing: VisitTiming;
  scheduledFor?: string;
}

export interface BookingSummary {
  id: string;
  reference: string;
  category: ServiceCategory;
  serviceName: string;
  patientName: string;
  price: number;
  status: "pending" | "confirmed" | "en-route" | "in-progress" | "completed" | "cancelled";
  createdAt: string;
}
