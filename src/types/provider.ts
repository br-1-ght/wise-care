export type ProviderRole = "General Practitioner" | "Registered Nurse" | "Specialist" | "Pediatrician";

export interface Provider {
  id: string;
  name: string;
  role: ProviderRole;
  specialty: string;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  avatarColor: string;
  online: boolean;
  languages: string[];
  bio: string;
}

export type ServiceCategory = "home-visit" | "phone-consultation" | "video-consultation";

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  durationMinutes: number;
  price: number;
  currency: string;
  availability: "Available now" | "Available today" | "Limited availability";
  emergency?: boolean;
  tags: string[];
}
