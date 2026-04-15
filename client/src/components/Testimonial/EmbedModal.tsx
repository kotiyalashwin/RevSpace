import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import {
  generateEmbedCode,
  EmbedStyle,
  TestimonialData,
} from "@/utils/embedGenerator";
import { cn } from "@/lib/utils";

interface EmbedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial: TestimonialData | null;
}

const STYLES: { value: EmbedStyle; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "standard", label: "Standard" },
  { value: "featured", label: "Featured" },
];

function EmbedModal({ open, onOpenChange, testimonial }: EmbedModalProps) {
  const [style, setStyle] = useState<EmbedStyle>("standard");
  const [copied, setCopied] = useState(false);

  if (!open || !testimonial) return null;

  const embedCode = generateEmbedCode(testimonial, style);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl rounded-lg border border-border bg-bg-elevated shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                Embed
              </p>
              <h2 className="text-lg font-medium tracking-tight text-fg">
                Get embed code
              </h2>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-hover rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Segmented style selector */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-2">
                Style
              </p>
              <div className="inline-flex p-0.5 rounded-md border border-border bg-bg">
                {STYLES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStyle(s.value)}
                    className={cn(
                      "h-7 px-3 text-xs font-medium rounded-sm transition-colors",
                      style === s.value
                        ? "bg-bg-elevated text-fg"
                        : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live preview */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-2">
                Preview
              </p>
              <div className="rounded-md border border-border bg-bg p-6 flex justify-center overflow-x-auto">
                <div dangerouslySetInnerHTML={{ __html: embedCode }} />
              </div>
            </div>

            {/* Code box */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                  HTML
                </p>
                <button
                  onClick={handleCopy}
                  className={cn(
                    "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-medium transition-colors",
                    copied
                      ? "bg-success/10 text-success border border-success/30"
                      : "bg-bg-hover text-fg-muted hover:text-fg border border-border"
                  )}
                >
                  {copied ? (
                    <>
                      <Check size={12} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="rounded-md border border-border bg-bg p-4 text-xs leading-relaxed font-mono text-fg-muted max-h-[240px] overflow-auto whitespace-pre-wrap break-all">
                <code>{embedCode}</code>
              </pre>
            </div>

            {/* How to use */}
            <div className="rounded-md border border-border bg-bg p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted mb-2">
                How to use
              </p>
              <ol className="text-sm text-fg-muted space-y-1 leading-relaxed">
                <li>1. Copy the HTML above.</li>
                <li>2. Paste it into your site's markup.</li>
                <li>3. The testimonial renders with all styles inlined.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmbedModal;
