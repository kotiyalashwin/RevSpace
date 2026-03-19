import { Video, FileText, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="gap-1">
            {testimonial.type === "video" ? (
              <Video size={14} />
            ) : (
              <FileText size={14} />
            )}
            {testimonial.type}
          </Badge>
        </div>

        {/* Preview Content */}
        <div className="mb-3 min-h-[80px]">
          {testimonial.type === "video" && testimonial.v_url ? (
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={getVideoThumbnailUrl(testimonial.v_url)}
                alt="Video thumbnail"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='80' viewBox='0 0 100 80'%3E%3Crect fill='%23f3f4f6' width='100' height='80'/%3E%3Ctext x='50' y='45' text-anchor='middle' fill='%239ca3af' font-size='12'%3EVideo%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 rounded-full p-3">
                  <Video className="text-white" size={20} />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm line-clamp-3 italic">
              "{testimonial.content?.slice(0, 100)}
              {(testimonial.content?.length || 0) > 100 ? "..." : ""}"
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="truncate max-w-[150px]">{testimonial.email}</span>
          <span>{formattedDate}</span>
        </div>

        {/* Get Embed Button */}
        <button
          onClick={() => onGetEmbed(testimonial)}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Code size={16} />
          Get Embed Code
        </button>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
