import type { HospitalDirectoryEntry } from "../types/emergency";

// A sample of well-known Nigerian teaching/federal hospitals for demo purposes.
// Phone numbers are intentionally omitted where not reliably verifiable — in a
// real deployment, pull these from an official facility directory and keep
// them current, since a wrong emergency contact is worse than none at all.
export const hospitalDirectory: HospitalDirectoryEntry[] = [
  { id: "h1", name: "Lagos University Teaching Hospital (LUTH)", city: "Idi-Araba, Lagos", state: "Lagos", type: "Teaching Hospital" },
  { id: "h2", name: "National Hospital Abuja", city: "Abuja", state: "Federal Capital Territory", type: "Federal Medical Centre" },
  { id: "h3", name: "University College Hospital (UCH)", city: "Ibadan", state: "Oyo", type: "Teaching Hospital" },
  { id: "h4", name: "Aminu Kano Teaching Hospital", city: "Kano", state: "Kano", type: "Teaching Hospital" },
  { id: "h5", name: "University of Nigeria Teaching Hospital (UNTH)", city: "Enugu", state: "Enugu", type: "Teaching Hospital" },
  { id: "h6", name: "Ahmadu Bello University Teaching Hospital", city: "Zaria", state: "Kaduna", type: "Teaching Hospital" },
  { id: "h7", name: "Rivers State University Teaching Hospital", city: "Port Harcourt", state: "Rivers", type: "Teaching Hospital" },
  { id: "h8", name: "Federal Medical Centre Owerri", city: "Owerri", state: "Imo", type: "Federal Medical Centre" },
];
