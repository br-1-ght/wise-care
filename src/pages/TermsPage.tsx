import { LegalPage } from "./LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 2026"
      sections={[
        { heading: "Service description", body: "Wise Care connects patients with independent licensed healthcare providers for home visits and remote consultations. We are not a replacement for emergency services." },
        { heading: "Payments", body: "Prices are shown in full before you confirm a booking. Cancellations made before a provider is dispatched are eligible for a full refund." },
        { heading: "Provider conduct", body: "All providers agree to a code of conduct and visit protocol prior to joining the active provider pool." },
        { heading: "Limitation of liability", body: "Wise Care facilitates connections between patients and independent providers and is not itself a medical practice." },
      ]}
    />
  );
}
