import { ShieldCheck } from "lucide-react";
import { insurancePartners } from "../../data/content";

export function InsuranceSection() {
  return (
    <section className="border-y border-brand-border bg-white py-10">
      <div className="container-page">
        <p className="mb-5 flex items-center justify-center gap-2 text-center text-sm font-medium text-brand-muted">
          <ShieldCheck className="h-4 w-4 text-brand-green" /> Trusted insurance partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {insurancePartners.map((p) => (
            <span key={p.id} className="font-display text-lg font-semibold text-brand-muted/70">
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
