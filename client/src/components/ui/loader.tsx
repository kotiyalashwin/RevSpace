import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function Loader({ size = "md", className, text }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-2",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-fg/80 border-t-transparent",
          sizeClasses[size]
        )}
      />
      {text && <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">{text}</p>}
    </div>
  );
}

export function PageLoader({ text = "Loading" }: { text?: string }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <Loader size="lg" text={text} />
    </div>
  );
}

export function InlineLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader size="md" text={text} />
    </div>
  );
}
