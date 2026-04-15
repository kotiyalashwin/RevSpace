import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-fg",
          "placeholder:text-fg-subtle",
          "transition-colors duration-150",
          "hover:border-border-hover",
          "focus-visible:outline-none focus-visible:border-fg-muted focus-visible:ring-2 focus-visible:ring-border-hover/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-fg leading-relaxed",
        "placeholder:text-fg-subtle",
        "transition-colors duration-150 resize-none",
        "hover:border-border-hover",
        "focus-visible:outline-none focus-visible:border-fg-muted focus-visible:ring-2 focus-visible:ring-border-hover/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Input, Textarea };
