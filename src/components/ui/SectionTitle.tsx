import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({ eyebrow, title, description, align = "center", className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("mb-10", align === "center" && "text-center", className)}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-brand-green">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold text-brand-dark sm:text-4xl">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-brand-muted sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
