export interface StateEmergencyInfo {
  state: string;
  capital: string;
  emergency: string;
  police: string;
  fireService: string;
  ambulance: string;
  roadAccidentFRSC: string;
  mentalHealthSupport: string;
}

export interface HospitalDirectoryEntry {
  id: string;
  name: string;
  city: string;
  state: string;
  postalCode?: string;
  phone?: string;
  type: "General" | "Teaching Hospital" | "Children's" | "Federal Medical Centre";
}
