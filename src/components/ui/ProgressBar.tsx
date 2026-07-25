import { motion } from "framer-motion";

interface ProgressBarProps {
  percent: number;
  label?: string;
}

export function ProgressBar({ percent, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex justify-between text-xs text-brand-muted">
          <span>{label}</span>
          <span>{Math.round(clamped)}% complete</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-brand-green-light"
      >
        <motion.div
          className="h-full rounded-full bg-brand-green"
          initial={false}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
