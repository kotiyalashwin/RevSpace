import { Video, FileText, Code, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  email: string;
  type: "video" | "text";
  content: string | null;
  v_url: string | null;
  createdAt: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onGetEmbed: (testimonial: Testimonial) => void;
}

function getVideoThumbnailUrl(videoUrl: string): string {
  return videoUrl.replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

function TestimonialCard({ testimonial, onGetEmbed }: TestimonialCardProps) {
  const formattedDate = new Date(testimonial.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <article className="group rounded-lg border border-border bg-bg-elevated transition-colors duration-150 hover:border-border-hover overflow-hidden flex flex-col">
      <div className="p-5 flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <Badge>
            {testimonial.type === "video" ? <Video size={10} /> : <FileText size={10} />}
            {testimonial.type}
          </Badge>
          <span className="font-mono text-[10px] text-fg-subtle">{formattedDate}</span>
        </div>

        {testimonial.type === "video" && testimonial.v_url ? (
          <div className="relative rounded-md overflow-hidden bg-bg border border-border aspect-video">
            <img
              src={getVideoThumbnailUrl(testimonial.v_url)}
              alt=""
              className="w-full h-full object-cover opacity-90"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 to-transparent">
              <div className="size-12 rounded-full bg-fg/95 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={16} className="text-bg ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>
        ) : (
          <blockquote className="border-l-2 border-border pl-4 py-1">
            <p className="text-sm text-fg leading-relaxed line-clamp-4 italic">
              "{testimonial.content?.slice(0, 200)}
              {(testimonial.content?.length || 0) > 200 ? "…" : ""}"
            </p>
          </blockquote>
        )}

        <p className="font-mono text-[11px] text-fg-muted truncate">
          {testimonial.email}
        </p>
      </div>

      <button
        onClick={() => onGetEmbed(testimonial)}
        className="border-t border-border px-5 py-3 flex items-center justify-between text-xs font-medium text-fg-muted hover:text-fg hover:bg-bg-hover transition-colors"
      >
        <span className="flex items-center gap-2">
          <Code size={12} />
          Get embed code
        </span>
        <span className="font-mono text-fg-subtle group-hover:text-fg">→</span>
      </button>
    </article>
  );
}

export default TestimonialCard;
