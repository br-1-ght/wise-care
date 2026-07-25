import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function EmergencyBanner() {
  return (
    <section aria-labelledby="emergency-banner-title" className="container-narrow -mt-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border-2 border-brand-red bg-[#1a0a0a] p-6 text-white shadow-card-hover"
      >
        <div className="absolute inset-x-0 top-0 h-1 animate-scan-line bg-[linear-gradient(90deg,#c0392b,#ff6b35,#c0392b)] bg-[length:200%_100%]" />
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-8 w-8 shrink-0 text-red-400" aria-hidden="true" />
          <div className="flex-1">
            <h2 id="emergency-banner-title" className="font-display text-xl font-bold text-red-300">
              If this is a medical emergency, call 112 immediately.
            </h2>
            <p className="mt-1 text-sm text-red-200/70">
              Wise Care is for urgent, non-life-threatening care. For life-threatening symptoms, always
              contact emergency services first.
            </p>
            <Link
              to="/emergency"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-500/15 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-500/25"
            >
              Emergency Numbers By State <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
