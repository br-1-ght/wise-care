import { motion } from "framer-motion";
import { Check, Clock, Stethoscope, Siren } from "lucide-react";
import type { Service } from "../../types/provider";
import { formatCurrency, formatDuration } from "../../utils/format";
import { cn } from "../../utils/cn";

interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  onSelect?: (service: Service) => void;
}

const availabilityStyles: Record<Service["availability"], string> = {
  "Available now": "bg-brand-green-light text-brand-green",
  "Available today": "bg-amber-50 text-brand-amber",
  "Limited availability": "bg-red-50 text-brand-red",
};

export function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  const isInteractive = !!onSelect;

  return (
    <motion.div
      layout
      whileHover={isInteractive ? { y: -3 } : undefined}
      onClick={() => onSelect?.(service)}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect?.(service);
        }
      }}
      aria-pressed={isInteractive ? selected : undefined}
      className={cn(
        "relative rounded-xl border-2 bg-white p-5 transition-all duration-200",
        isInteractive && "cursor-pointer hover:border-brand-green hover:bg-brand-green-pale hover:shadow-card",
        selected ? "border-brand-green bg-brand-green-light shadow-card" : "border-brand-border",
      )}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.span>
      )}

      <div className="mb-2 flex items-start justify-between gap-3 pr-8">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
          <h3 className="font-medium text-brand-dark">{service.title}</h3>
        </div>
        <p className="whitespace-nowrap font-display text-xl font-bold text-brand-green">
          {formatCurrency(service.price, service.currency)}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-brand-muted">{service.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-border bg-brand-green-pale px-2.5 py-1 text-xs text-brand-green">
          <Clock className="h-3 w-3" /> {formatDuration(service.durationMinutes)}
        </span>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", availabilityStyles[service.availability])}>
          {service.availability}
        </span>
        {service.emergency && (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs text-brand-red">
            <Siren className="h-3 w-3" /> Priority
          </span>
        )}
        {service.tags.map((t) => (
          <span key={t} className="rounded-full border border-brand-border px-2.5 py-1 text-xs text-brand-muted">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
