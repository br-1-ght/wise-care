import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { ProviderCard } from "./ProviderCard";
import { providers } from "../../data/providers";

export function ProvidersSection() {
  return (
    <section id="providers" className="container-page py-16 sm:py-20">
      <SectionTitle eyebrow="Meet our providers" title="Licensed clinicians you can trust" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {providers.map((p) => (
          <motion.div key={p.id} variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}>
            <ProviderCard provider={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
