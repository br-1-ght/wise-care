import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PhoneCall, Video, Users } from "lucide-react";
import { providers } from "../data/providers";

export default function PhoneWaitingRoomPage() {
  const locationState = useLocation().state as { reference?: string } | null;
  const [secondsLeft, setSecondsLeft] = useState(9 * 60);
  const [connected, setConnected] = useState(false);
  const onlineProviders = providers.filter((p) => p.online);

  useEffect(() => {
    if (connected) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setConnected(true);
          clearInterval(interval);
          return 0;
        }
        return s - 5;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [connected]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="container-narrow py-10 sm:py-14 text-center">
      <h1 className="mb-6 font-display text-2xl font-semibold text-brand-dark">
        {connected ? "You're connected" : "You're in the queue"}
      </h1>

      {locationState?.reference && (
        <span className="mb-6 inline-block rounded-full bg-brand-green-light px-3 py-1 text-xs font-medium text-brand-green">
          {locationState.reference}
        </span>
      )}

      {!connected ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full border-4 border-brand-green bg-brand-green-light"
          >
            <div>
              <p className="font-display text-3xl font-bold text-brand-green">
                {mins}:{secs.toString().padStart(2, "0")}
              </p>
              <p className="text-xs text-brand-muted">estimated wait</p>
            </div>
          </motion.div>
          <p className="mb-8 flex items-center justify-center gap-1.5 text-sm text-brand-muted">
            <Users className="h-4 w-4" /> {onlineProviders.length} providers online now
          </p>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-brand-green bg-brand-green text-white"
        >
          <PhoneCall className="h-14 w-14" />
        </motion.div>
      )}

      <div className="mx-auto max-w-sm rounded-xl border border-brand-border bg-white p-5 text-left">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-brand-green">Available now</p>
        <ul className="space-y-3">
          {onlineProviders.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: p.avatarColor }}
              >
                {p.name.split(" ").slice(-1)[0][0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-dark">{p.name}</p>
                <p className="text-xs text-brand-muted">{p.specialty}</p>
              </div>
              {connected && p.id === onlineProviders[0].id && (
                <span className="rounded-full bg-brand-green-light px-2 py-0.5 text-xs text-brand-green">
                  On call
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {connected && (
        <div className="mt-6 flex justify-center gap-3">
          <button className="flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-medium text-white">
            <Video className="h-4 w-4" /> Join video
          </button>
        </div>
      )}
    </div>
  );
}
