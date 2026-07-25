import { forwardRef } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FieldWrapperProps {
  label?: string;
  hint?: string;
  required?: boolean;
  error?: string;
  id: string;
}

function FieldChrome({
  label,
  hint,
  required,
  error,
  id,
  children,
}: FieldWrapperProps & { children: ReactNode }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-text">
          {label}
          {required && (
            <span className="text-brand-red" aria-hidden="true">
              {" "}
              *
            </span>
          )}
          {hint && <span className="ml-1 font-light text-xs text-brand-muted">{hint}</span>}
        </label>
      )}
      {children}
      {error && (
        <p role="alert" className="mt-1 text-xs text-brand-red">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldBase =
  "w-full rounded-md border-[1.5px] border-brand-border bg-white px-3.5 py-2.5 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-green-mid/40 focus:border-brand-green";

type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldWrapperProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, required, error, id, className, ...props }, ref) => (
    <FieldChrome label={label} hint={hint} required={required} error={error} id={id}>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, error && "border-brand-red", className)}
        {...props}
      />
    </FieldChrome>
  ),
);
Input.displayName = "Input";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrapperProps;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, hint, required, error, id, className, ...props }, ref) => (
    <FieldChrome label={label} hint={hint} required={required} error={error} id={id}>
      <textarea
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={cn(fieldBase, "min-h-[90px] resize-y leading-relaxed", error && "border-brand-red", className)}
        {...props}
      />
    </FieldChrome>
  ),
);
TextArea.displayName = "TextArea";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  FieldWrapperProps & { children: ReactNode };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, required, error, id, className, children, ...props }, ref) => (
    <FieldChrome label={label} hint={hint} required={required} error={error} id={id}>
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={cn(fieldBase, error && "border-brand-red", className)}
        {...props}
      >
        {children}
      </select>
    </FieldChrome>
  ),
);
Select.displayName = "Select";
