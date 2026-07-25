import { Phone, Shield, Flame, Ambulance, Car, HeartHandshake } from "lucide-react";
import type { StateEmergencyInfo } from "../../types/emergency";

const rows = [
  { key: "police" as const, label: "Police", icon: Shield, dialable: true },
  { key: "fireService" as const, label: "Fire Service", icon: Flame, dialable: true },
  { key: "ambulance" as const, label: "Ambulance", icon: Ambulance, dialable: true },
  { key: "roadAccidentFRSC" as const, label: "Road Accidents (FRSC)", icon: Car, dialable: true },
  { key: "mentalHealthSupport" as const, label: "Mental Health Support", icon: HeartHandshake, dialable: false },
];

export function EmergencyStateCard({ info }: { info: StateEmergencyInfo }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-brand-dark">{info.state}</h3>
        <span className="rounded-full bg-brand-green-light px-2 py-0.5 text-xs font-medium text-brand-green">
          {info.capital}
        </span>
      </div>
      <a
        href={`tel:${info.emergency}`}
        className="mb-3 flex items-center justify-between rounded-lg bg-red-50 px-3 py-2 text-brand-red hover:bg-red-100"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <Phone className="h-4 w-4" /> National Emergency
        </span>
        <span className="font-display text-lg font-bold">{info.emergency}</span>
      </a>
      <ul className="space-y-1.5">
        {rows.map(({ key, label, icon: Icon, dialable }) => (
          <li key={key} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-brand-muted">
              <Icon className="h-3.5 w-3.5 shrink-0" /> {label}
            </span>
            {dialable ? (
              <a href={`tel:${info[key]}`} className="font-medium text-brand-dark hover:text-brand-green">
                {info[key]}
              </a>
            ) : (
              <span className="text-right text-xs text-brand-muted">{info[key]}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
