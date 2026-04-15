import { ChangeEvent } from "react";

type InputProps = {
  label: string;
  placeholder: string;
  message: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function Input({
  label,
  placeholder,
  message,
  onChange,
  value,
}: InputProps) {
  return (
    <div className="w-full mb-4 space-y-1.5">
      <label className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
        {label}
      </label>
      <input
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex h-10 w-full rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-fg placeholder:text-fg-subtle transition-colors duration-150 hover:border-border-hover focus-visible:outline-none focus-visible:border-fg-muted focus-visible:ring-2 focus-visible:ring-border-hover/50"
      />
      {message && <p className="text-xs text-fg-subtle">{message}</p>}
    </div>
  );
}
