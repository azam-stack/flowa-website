import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const CONTROL =
  "w-full rounded-field border bg-bg px-4 text-body text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] duration-fast focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 motion-reduce:transition-none";

function controlClasses(error: boolean, extra: string) {
  return `${CONTROL} ${error ? "border-error field-shake" : "border-border"} ${extra}`;
}

interface FieldBase {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
}

/** Label above, control, error or hint below. Errors are text, not colour alone. */
export function Field({ id, label, error, hint, className = "", ...input }: FieldBase & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-small font-medium text-fg">
        {label}
      </label>
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={controlClasses(!!error, "h-12")} {...input} />
      <FieldNote id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextareaField({ id, label, error, hint, className = "", ...input }: FieldBase & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-small font-medium text-fg">
        {label}
      </label>
      <textarea id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={controlClasses(!!error, "resize-none py-3")} {...input} />
      <FieldNote id={id} error={error} hint={hint} />
    </div>
  );
}

function FieldNote({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13px] font-medium text-error">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted">
        {hint}
      </p>
    );
  }
  return null;
}
