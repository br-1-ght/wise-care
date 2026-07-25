import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Phone, CheckCircle2, Navigation, LocateFixed, ShieldAlert } from "lucide-react";
import { providers } from "../data/providers";
import { useGeolocation, type LatLng } from "../hooks/useGeolocation";
import { LocationMap } from "../components/booking/LocationMap";
import { Button } from "../components/ui/Button";

const STAGES = [
  { label: "Provider assigned", minutes: 0 },
  { label: "Provider en route", minutes: 2 },
  { label: "Arriving soon", minutes: 20 },
  { label: "Provider arrived", minutes: 28 },
];

// Demo fallback so the map always has something meaningful to show when the
// person hasn't granted (or has declined) location access — central Ikeja, Lagos.
const FALLBACK_DESTINATION: LatLng = { lat: 6.6018, lng: 3.3515 };
const PROVIDER_START: LatLng = { lat: 6.5244, lng: 3.3792 };

function interpolate(a: LatLng, b: LatLng, t: number): LatLng {
  return { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t };
}

export default function HomeVisitTrackingPage() {
  const locationState = useLocation().state as { reference?: string } | null;
  const [elapsedMin, setElapsedMin] = useState(0);
  const provider = providers[0];
  const eta = Math.max(1, 30 - elapsedMin);
  const { position, status, errorMessage, requestLocation } = useGeolocation();

  useEffect(() => {
    const interval = setInterval(() => setElapsedMin((m) => Math.min(m + 1, 30)), 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStageIndex = STAGES.reduce((acc, stage, i) => (elapsedMin >= stage.minutes ? i : acc), 0);

  const destination = position ?? FALLBACK_DESTINATION;
  const progress = elapsedMin / 30;
  const providerPosition = useMemo(
    () => interpolate(PROVIDER_START, destination, Math.min(1, progress)),
    [destination, progress],
  );

  return (
    <div className="container-narrow py-10 sm:py-14">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-brand-dark">Live tracking</h1>
        {locationState?.reference && (
          <span className="rounded-full bg-brand-green-light px-3 py-1 text-xs font-medium text-brand-green">
            {locationState.reference}
          </span>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 rounded-xl border-2 border-brand-green bg-brand-green-light p-6 text-center">
        <Navigation className="h-6 w-6 text-brand-green" />
        <div>
          <p className="font-display text-3xl font-bold text-brand-green">{eta} min</p>
          <p className="text-sm text-brand-muted">estimated arrival</p>
        </div>
      </div>

      {status === "idle" || status === "requesting" ? (
        <div className="mb-6 rounded-xl border border-brand-border bg-white p-6 text-center">
          <LocateFixed className="mx-auto mb-3 h-8 w-8 text-brand-green" />
          <h2 className="mb-1 font-medium text-brand-dark">See your provider on a live map</h2>
          <p className="mx-auto mb-4 max-w-sm text-sm text-brand-muted">
            Allow Wise Care to use your location so we can show exactly how far your provider is,
            just like tracking a ride.
          </p>
          <Button onClick={requestLocation} loading={status === "requesting"}>
            <LocateFixed className="h-4 w-4" /> Allow location access
          </Button>
        </div>
      ) : (
        <>
          {errorMessage && (
            <p className="mb-3 flex items-center gap-1.5 text-xs text-brand-amber">
              <ShieldAlert className="h-3.5 w-3.5" /> {errorMessage}
            </p>
          )}
          <div className="mb-6">
            <LocationMap
              userPosition={destination}
              providerPosition={providerPosition}
              userIsApproximate={status !== "granted"}
            />
          </div>
        </>
      )}

      <ol className="mb-6 space-y-4">
        {STAGES.map((stage, i) => {
          const done = i <= currentStageIndex;
          return (
            <li key={stage.label} className="flex items-center gap-3">
              <motion.span
                initial={false}
                animate={{ scale: done ? 1 : 0.85, opacity: done ? 1 : 0.5 }}
                className={`flex h-7 w-7 items-center justify-center rounded-full ${done ? "bg-brand-green text-white" : "bg-brand-border text-brand-muted"}`}
              >
                <CheckCircle2 className="h-4 w-4" />
              </motion.span>
              <span className={done ? "font-medium text-brand-dark" : "text-brand-muted"}>{stage.label}</span>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center gap-4 rounded-xl border border-brand-border bg-white p-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full font-display font-bold text-white"
          style={{ backgroundColor: provider.avatarColor }}
        >
          {provider.name.split(" ").slice(-1)[0][0]}
        </div>
        <div className="flex-1">
          <p className="font-medium text-brand-dark">{provider.name}</p>
          <p className="text-xs text-brand-muted">{provider.role} &middot; {provider.specialty}</p>
        </div>
        <a
          href="tel:+2348000000000"
          aria-label="Call provider"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-light text-brand-green hover:bg-brand-green hover:text-white"
        >
          <Phone className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-muted">
        <Clock className="h-3.5 w-3.5" /> Status updates automatically — no need to refresh this page.
      </p>
    </div>
  );
}
