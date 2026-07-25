import { motion } from "framer-motion";
import { ClipboardList, UserCheck, MapPinned, HeartPulse } from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";

const steps = [
  { icon: ClipboardList, title: "Tell us what's wrong", text: "Choose a service and share your symptoms." },
  { icon: UserCheck, title: "We match a provider", text: "A verified doctor or nurse near you accepts your case." },
  { icon: MapPinned, title: "Track in real time", text: "Watch your provider's live ETA, or connect by phone instantly." },
  { icon: HeartPulse, title: "Get treated", text: "Receive diagnosis, treatment, and any follow-up care plan." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container-page py-16 sm:py-20">
      <SectionTitle eyebrow="How it works" title="From symptom to care in four steps" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="relative rounded-xl border border-brand-border bg-white p-6 text-center"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-dark px-2.5 py-0.5 text-xs font-bold text-brand-gold">
              {i + 1}
            </span>
            <div className="mx-auto mb-3 mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-1 font-medium text-brand-dark">{s.title}</h3>
            <p className="text-sm text-brand-muted">{s.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
