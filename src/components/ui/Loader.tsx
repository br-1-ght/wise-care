import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2 py-10 text-brand-muted">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      <span>{label}…</span>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-md", className)} aria-hidden="true" />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-5">
      <Skeleton className="mb-3 h-5 w-1/2" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="mb-4 h-3 w-4/5" />
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}
