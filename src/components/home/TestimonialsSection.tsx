import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";
import { testimonials } from "../../data/content";

export function TestimonialsSection() {
  return (
    <section className="bg-brand-dark py-16 text-white sm:py-20">
      <div className="container-page">
        <SectionTitle
          eyebrow="Testimonials"
          title="Trusted by patients across the country"
          className="text-white [&_h2]:text-white [&_p]:text-white/60"
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <Quote className="mb-3 h-6 w-6 text-brand-gold" aria-hidden="true" />
              <blockquote className="text-sm leading-relaxed text-white/80">"{t.quote}"</blockquote>
              <figcaption className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-white/50">{t.location}</p>
                </div>
                <div className="flex" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < t.rating ? "fill-brand-gold text-brand-gold" : "text-white/20"}`}
                    />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
