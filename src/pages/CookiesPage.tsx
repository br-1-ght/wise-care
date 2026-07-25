import { LegalPage } from "./LegalPage";

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="July 2026"
      sections={[
        { heading: "Essential cookies", body: "Used to keep you signed in and remember your booking progress as you move between steps." },
        { heading: "Analytics cookies", body: "Help us understand how the app is used so we can improve response times and service quality." },
        { heading: "Managing cookies", body: "You can control cookies through your browser settings at any time." },
      ]}
    />
  );
}
