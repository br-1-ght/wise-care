import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Building2, Phone } from "lucide-react";
import { SectionTitle } from "../components/ui/SectionTitle";
import { EmergencyStateCard } from "../components/emergency/EmergencyStateCard";
import { stateEmergencyData } from "../data/stateEmergencyData";
import { hospitalDirectory } from "../data/hospitals";

export default function EmergencyDirectoryPage() {
  const [query, setQuery] = useState("");

  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stateEmergencyData;
    return stateEmergencyData.filter(
      (s) => s.state.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredHospitals = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hospitalDirectory;
    return hospitalDirectory.filter(
      (h) =>
        h.city.toLowerCase().includes(q) ||
        h.state.toLowerCase().includes(q) ||
        h.name.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mb-8 rounded-2xl border-2 border-brand-red bg-red-50 p-5 text-center">
        <p className="font-display text-lg font-bold text-brand-red">
          If this is a medical emergency, call 112 immediately.
        </p>
      </div>

      <SectionTitle
        eyebrow="Emergency directory"
        title="Emergency numbers, by state"
        description="Search by state or capital city for police, fire service, ambulance, FRSC road-accident response, mental health support, and nearby hospitals across Nigeria."
      />

      <div className="mx-auto mb-10 max-w-2xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
          <input
            type="search"
            aria-label="Search by state or city"
            placeholder="Search state or city (e.g. Lagos, Kano, Enugu)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-brand-border bg-white py-2.5 pl-10 pr-3.5 text-sm text-brand-text outline-none focus:border-brand-green"
          />
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredStates.map((info) => (
          <motion.div key={info.state} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            <EmergencyStateCard info={info} />
          </motion.div>
        ))}
      </motion.div>

      {filteredStates.length === 0 && (
        <p className="py-10 text-center text-brand-muted">No states match "{query}".</p>
      )}

      <div className="mt-16">
        <SectionTitle
          eyebrow="Hospital directory"
          title="Hospitals near you"
          align="left"
          className="mb-6"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredHospitals.map((h) => (
            <div key={h.id} className="flex items-start gap-3 rounded-xl border border-brand-border bg-white p-4">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-brand-dark">{h.name}</h3>
                  <span className="rounded-full bg-brand-green-pale px-2 py-0.5 text-xs text-brand-green">
                    {h.type}
                  </span>
                </div>
                <p className="text-sm text-brand-muted">
                  {h.city}, {h.state}
                </p>
                {h.phone ? (
                  <a
                    href={`tel:${h.phone}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" /> {h.phone}
                  </a>
                ) : (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-muted">
                    <Phone className="h-3.5 w-3.5" /> Call 112 or visit in person for emergencies
                  </p>
                )}
              </div>
            </div>
          ))}
          {filteredHospitals.length === 0 && (
            <p className="col-span-full py-6 text-center text-brand-muted">No hospitals match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
