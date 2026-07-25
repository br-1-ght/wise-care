import { LegalPage } from "./LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      sections={[
        { heading: "Information we collect", body: "We collect the personal and health information you provide when booking a visit or consultation, including contact details, location, and symptom descriptions." },
        { heading: "How we use it", body: "Your information is used solely to match you with a licensed provider, coordinate care, and process payment. We never sell patient data." },
        { heading: "Data protection", body: "All patient data is encrypted in transit and at rest, and access is limited to your assigned care team under HIPAA-aligned practices." },
        { heading: "Your rights", body: "You can request a copy of your data or ask us to delete it at any time by contacting privacy@wisecare.health." },
      ]}
    />
  );
}
