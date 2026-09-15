import { useEffect, useRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

const CONTROL =
  "w-full rounded-field border bg-bg px-4 text-body text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] duration-fast focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 motion-reduce:transition-none";

function controlClasses(error: boolean, extra: string) {
  return `${CONTROL} ${error ? "border-error" : "border-border"} ${extra}`;
}

/** Nudges the control (two 2px shakes) every time `error` is set or `attempt` changes — not only the first time. */
function useShake<T extends HTMLElement>(error: string | undefined, attempt: number) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !error) return;
    el.classList.remove("field-shake");
    void el.offsetWidth; // restart the animation
    el.classList.add("field-shake");
  }, [error, attempt]);
  return ref;
}

interface FieldBase {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  /** Bump on each submit so a field that is still wrong shakes again. */
  attempt?: number;
}

/** Label above, control, error or hint below. Errors are text, not colour alone. */
export function Field({ id, label, error, hint, className = "", attempt = 0, ...input }: FieldBase & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const ref = useShake<HTMLInputElement>(error, attempt);
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-small font-medium text-fg">
        {label}
      </label>
      <input ref={ref} id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={controlClasses(!!error, "h-11 md:h-12")} {...input} />
      <FieldNote id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextareaField({ id, label, error, hint, className = "", attempt = 0, ...input }: FieldBase & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const ref = useShake<HTMLTextAreaElement>(error, attempt);
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-small font-medium text-fg">
        {label}
      </label>
      <textarea ref={ref} id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={controlClasses(!!error, "resize-none py-3")} {...input} />
      <FieldNote id={id} error={error} hint={hint} />
    </div>
  );
}

function FieldNote({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} role="alert" className="fade-in mt-1.5 text-[13px] font-medium text-error">
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
