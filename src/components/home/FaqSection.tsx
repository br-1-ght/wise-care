import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";
import { faqs } from "../../data/content";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = question.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="rounded-xl border border-brand-border bg-white">
      <button
        id={`faq-btn-${id}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-brand-dark">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-green transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-btn-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-brand-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="container-narrow py-16 sm:py-20">
      <SectionTitle eyebrow="FAQ" title="Frequently asked questions" />
      <div className="space-y-3">
        {faqs.map((f) => (
          <FaqItem key={f.id} question={f.question} answer={f.answer} />
        ))}
      </div>
    </section>
  );
}
