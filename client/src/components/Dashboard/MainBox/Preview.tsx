import { Pencil, Video } from "lucide-react";

type PreviewProps = {
  preview: string | null;
  wantImage: boolean;
  cards: string[];
  valueVideo: boolean;
  valueText: boolean;
  header: string;
  message: string;
};

function Preview({ cards, valueVideo, valueText, header, message }: PreviewProps) {
  return (
    <div className="w-full rounded-lg border border-border bg-bg p-8 flex flex-col">
      <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mb-6">
        Live preview
      </p>

      <div className="flex-1 flex flex-col items-center text-center py-6">
        <div className="size-12 rounded-full bg-bg-elevated border border-border flex items-center justify-center mb-6">
          <span className="text-fg-muted text-lg font-medium">R</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-fg mb-2 leading-tight">
          {header}
        </h1>
        <p className="text-sm text-fg-muted max-w-sm leading-relaxed mb-8">
          {message}
        </p>

        {cards.length > 0 && (
          <div className="w-full mb-6 text-left space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
              Questions
            </p>
            <div className="space-y-1.5">
              {cards.map((card, i) => (
                <p key={i} className="text-sm text-fg-muted">
                  <span className="font-mono text-fg-subtle mr-2">
                    {String.fromCharCode(97 + i)}.
                  </span>
                  {card}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          {valueVideo && (
            <div className="flex items-center justify-center gap-2 h-10 px-4 rounded-md border border-border bg-bg-elevated text-sm text-fg-muted">
              <Video size={14} />
              Record video testimonial
            </div>
          )}
          {valueText && (
            <div className="flex items-center justify-center gap-2 h-10 px-4 rounded-md border border-border bg-bg-elevated text-sm text-fg-muted">
              <Pencil size={14} />
              Write a review
            </div>
          )}
        </div>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle text-center pt-4 border-t border-border">
        Powered by RevSpace
      </p>
    </div>
  );
}

export default Preview;
