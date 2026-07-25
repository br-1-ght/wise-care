import { SectionTitle } from "../components/ui/SectionTitle";
import { ProviderCard } from "../components/home/ProviderCard";
import { providers } from "../data/providers";

export default function ProvidersPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <SectionTitle eyebrow="Our team" title="Meet our providers" description="Every provider is licence-verified, identity-checked, and reviewed by real patients." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
}
