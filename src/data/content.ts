export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Chioma A.",
    location: "Lekki, Lagos",
    quote:
      "A nurse arrived within 25 minutes for my father's post-surgery dressing change. Calm, professional, and on time.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Ibrahim S.",
    location: "Abuja",
    quote:
      "The phone consultation connected me with a doctor in under 15 minutes at 11pm. Got a prescription sent straight to my pharmacy.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Funmi O.",
    location: "Ikeja, Lagos",
    quote: "Transparent pricing before I paid anything, and the doctor who came was exactly the specialist I needed.",
    rating: 4,
  },
];

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "f1",
    question: "How fast can a provider reach me?",
    answer:
      "Home visits are dispatched with a target arrival of 30 minutes in covered areas, depending on traffic and provider availability. Phone consultations typically connect within 15 minutes.",
  },
  {
    id: "f2",
    question: "Is this a replacement for emergency services?",
    answer:
      "No. If you are experiencing a medical emergency, call 112 immediately. Wise Care is for urgent but non-life-threatening care.",
  },
  {
    id: "f3",
    question: "Are your providers licensed and verified?",
    answer:
      "Every provider on Wise Care is verified against their professional licensing body, with employment and identity checks completed before they join our active pool.",
  },
  {
    id: "f4",
    question: "Do you accept insurance?",
    answer:
      "We work with a growing list of insurance partners for direct billing, and also offer transparent out-of-pocket pricing shown before you confirm a booking.",
  },
  {
    id: "f5",
    question: "Is my information kept private?",
    answer:
      "Yes. All patient data is handled under strict, HIPAA-aligned data protection practices, encrypted in transit, and only shared with your assigned provider.",
  },
  {
    id: "f6",
    question: "Can I book for someone other than myself?",
    answer:
      "Yes — during booking you can specify you're arranging care for a family member or dependent and provide their details.",
  },
];

export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  { id: "verified", title: "Verified Providers", description: "Every provider passes licence and identity verification." },
  { id: "licensed", title: "Licensed Professionals", description: "Doctors and nurses credentialed with recognised licensing bodies." },
  { id: "hipaa", title: "HIPAA Compliant", description: "Patient data handled under strict privacy and security standards." },
  { id: "fast", title: "Fast Response", description: "Home visits in 30 minutes, phone consults in 15." },
  { id: "pricing", title: "Transparent Pricing", description: "See the full price before you confirm any booking." },
  { id: "insurance", title: "Insurance Support", description: "Direct billing with a growing network of insurance partners." },
  { id: "always-on", title: "Available 24/7", description: "Round-the-clock care, every day of the year." },
  { id: "home", title: "Home Visits", description: "A provider comes to you — no waiting rooms." },
  { id: "phone", title: "Phone Consultations", description: "Speak to a doctor by voice, wherever you are." },
  { id: "video", title: "Video Consultations", description: "Face-to-face care over secure video." },
];

export interface InsurancePartner {
  id: string;
  name: string;
}

export const insurancePartners: InsurancePartner[] = [
  { id: "ip1", name: "AXA Mansard" },
  { id: "ip2", name: "Hygeia HMO" },
  { id: "ip3", name: "Reliance HMO" },
  { id: "ip4", name: "AIICO Insurance" },
  { id: "ip5", name: "Avon HMO" },
  { id: "ip6", name: "Leadway Health" },
];
