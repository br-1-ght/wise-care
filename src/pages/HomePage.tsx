import { Hero } from "../components/home/Hero";
import { EmergencyBanner } from "../components/emergency/EmergencyBanner";
import { ServicesSection } from "../components/home/ServicesSection";
import { HowItWorks } from "../components/home/HowItWorks";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { ProvidersSection } from "../components/home/ProvidersSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { InsuranceSection } from "../components/home/InsuranceSection";
import { FaqSection } from "../components/home/FaqSection";
import { NewsletterSection } from "../components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EmergencyBanner />
      <ServicesSection />
      <HowItWorks />
      <FeaturesSection />
      <ProvidersSection />
      <TestimonialsSection />
      <InsuranceSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
