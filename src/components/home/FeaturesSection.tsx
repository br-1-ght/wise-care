import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  GraduationCap,
  Lock,
  Zap,
  ReceiptText,
  ShieldPlus,
  Clock4,
  Home,
  Phone,
  Video,
} from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";
import { features, type Feature } from "../../data/content";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  verified: BadgeCheck,
  licensed: GraduationCap,
  hipaa: Lock,
  fast: Zap,
  pricing: ReceiptText,
  insurance: ShieldPlus,
  "always-on": Clock4,
  home: Home,
  phone: Phone,
  video: Video,
};

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = iconMap[feature.id] ?? BadgeCheck;
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      className="rounded-xl border border-brand-border bg-white p-5 transition-shadow hover:shadow-card"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-light text-brand-green">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1 font-medium text-brand-dark">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-brand-muted">{feature.description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="bg-brand-green-pale py-16 sm:py-20">
      <div className="container-page">
        <SectionTitle eyebrow="Why Wise Care" title="Premium care, built on trust" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {features.map((f) => (
            <FeatureCard key={f.id} feature={f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
