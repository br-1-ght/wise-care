import { Star } from "lucide-react";
import type { Provider } from "../../types/provider";

export function ProviderCard({ provider }: { provider: Provider }) {
  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .slice(-2)
    .join("");

  return (
    <div className="rounded-xl border border-brand-border bg-white p-5 text-center transition-shadow hover:shadow-card">
      <div className="relative mx-auto mb-3 h-16 w-16">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full font-display text-lg font-bold text-white"
          style={{ backgroundColor: provider.avatarColor }}
          aria-hidden="true"
        >
          {initials}
        </div>
        {provider.online && (
          <span
            className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
            aria-label="Online now"
          />
        )}
      </div>
      <h3 className="font-medium text-brand-dark">{provider.name}</h3>
      <p className="text-xs text-brand-muted">
        {provider.role} &middot; {provider.specialty}
      </p>
      <div className="mt-2 flex items-center justify-center gap-1 text-sm">
        <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
        <span className="font-medium text-brand-dark">{provider.rating.toFixed(1)}</span>
        <span className="text-brand-muted">({provider.reviewCount})</span>
      </div>
      <p className="mt-1 text-xs text-brand-muted">{provider.yearsExperience} yrs experience</p>
    </div>
  );
}
