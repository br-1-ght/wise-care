import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-7">
      <ol className="flex items-center" aria-label="Booking progress">
        {steps.map((step, i) => {
          const status = i < currentStep ? "done" : i === currentStep ? "active" : "pending";
          return (
            <li key={step} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  aria-current={status === "active" ? "step" : undefined}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                    status === "done" && "bg-brand-green text-white",
                    status === "active" &&
                      "border-2 border-brand-green bg-white text-brand-green ring-4 ring-brand-green-light",
                    status === "pending" && "bg-brand-border text-brand-muted",
                  )}
                >
                  {status === "done" ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "mt-1 hidden w-16 text-center text-[11px] sm:block",
                    status === "active" ? "font-medium text-brand-green" : "text-brand-muted",
                  )}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-1.5 h-0.5 flex-1 rounded-full transition-colors",
                    i < currentStep ? "bg-brand-green" : "bg-brand-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
