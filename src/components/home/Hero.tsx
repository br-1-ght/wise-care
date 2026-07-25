import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, Phone, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

const stats = [
  { label: "Average arrival", value: "30 min" },
  { label: "Phone connect", value: "15 min" },
  { label: "Verified providers", value: "500+" },
];

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-brand-dark to-brand-green px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="container-narrow px-0 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-green-400" />
          </span>
          Providers online now in your area
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
        >
          Healthcare Provider At Your Door In <em className="italic text-brand-gold">30 Minutes</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg"
        >
          Or speak to a licensed provider on the phone in 15 minutes. Verified doctors and nurses,
          transparent pricing, available around the clock.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" onClick={() => navigate("/book/home-visit")} className="shadow-card-hover">
            <Home className="h-5 w-5" /> Book Home Visit
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/book/phone-consultation")}
            className="!border-white !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white/20"
          >
            <Phone className="h-5 w-5" /> Book Phone Consultation
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-12 flex max-w-lg justify-center gap-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-brand-gold">{s.value}</p>
              <p className="mt-0.5 text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-1.5 text-xs text-white/50"
        >
          <ShieldCheck className="h-3.5 w-3.5" /> Verified providers &middot; HIPAA-aligned &middot; No hidden fees
        </motion.p>
      </div>
    </section>
  );
}