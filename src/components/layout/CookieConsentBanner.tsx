import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "wisecare:cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore storage errors — the banner will simply reappear next visit
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-brand-border bg-white p-4 shadow-card-hover sm:p-5"
        >
          <div className="container-page flex flex-col items-center gap-4 px-0 sm:flex-row sm:justify-between">
            <p className="flex items-start gap-2.5 text-sm text-brand-text sm:items-center">
              <Cookie className="h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
              <span>
                We use cookies to keep you signed in, remember your booking progress, and understand how
                Wise Care is used.{" "}
                <Link to="/cookies" className="font-medium text-brand-green underline underline-offset-2">
                  Cookie Policy
                </Link>
              </span>
            </p>
            <div className="flex w-full gap-2 sm:w-auto">
              <button
                onClick={() => choose("declined")}
                className="flex-1 rounded-lg border-[1.5px] border-brand-border px-4 py-2 text-sm font-medium text-brand-text hover:bg-brand-green-pale sm:flex-none"
              >
                Decline
              </button>
              <button
                onClick={() => choose("accepted")}
                className="flex-1 rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-mid sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
