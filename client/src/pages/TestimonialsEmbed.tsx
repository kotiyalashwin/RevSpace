import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, FileText, MessageSquareQuote } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import TestimonialCard from "@/components/Testimonial/TestimonialCard";
import EmbedModal from "@/components/Testimonial/EmbedModal";
import { TestimonialData } from "@/utils/embedGenerator";
import { PageLoader } from "@/components/ui/loader";

const SERVER = import.meta.env.VITE_SERVER;

interface Testimonial {
  id: string;
  email: string;
  type: "video" | "text";
  content: string | null;
  v_url: string | null;
  createdAt: string;
}

interface SpaceData {
  space: { id: number; name: string; description: string; link: string };
  testimonials: Testimonial[];
}

function TestimonialsEmbed() {
  const { link } = useParams<{ link: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<SpaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<SpaceData>(
          `${SERVER}/api/v1/testimonial/insights/${link}`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch {
        toast.error("Failed to load testimonials");
        navigate("/testimonials");
      } finally {
        setLoading(false);
      }
    })();
  }, [link, navigate]);

  const handleGetEmbed = (testimonial: Testimonial) => {
    setSelectedTestimonial({
      type: testimonial.type,
      content: testimonial.content,
      v_url: testimonial.v_url,
      email: testimonial.email,
      createdAt: testimonial.createdAt,
    });
    setModalOpen(true);
  };

  if (loading) return <PageLoader text="Loading testimonials" />;
  if (!data) return null;

  const { space, testimonials } = data;
  const videoCount = testimonials.filter((t) => t.type === "video").length;
  const textCount = testimonials.filter((t) => t.type === "text").length;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate("/testimonials")}
            className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-elevated rounded-md transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              {space.link}
            </p>
            <h1 className="text-base font-medium tracking-tight truncate">
              {space.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-10">
        {/* Stats strip */}
        <div className="flex items-center gap-px rounded-lg overflow-hidden border border-border bg-border mb-8 max-w-md">
          <Stat label="Total" value={testimonials.length} />
          <Stat label="Video" value={videoCount} icon={<Video size={11} />} />
          <Stat label="Text" value={textCount} icon={<FileText size={11} />} />
        </div>

        {testimonials.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-bg-elevated/40 p-16 text-center">
            <MessageSquareQuote className="mx-auto text-fg-subtle mb-4" size={32} />
            <h3 className="text-base font-medium text-fg mb-1">No testimonials yet</h3>
            <p className="text-sm text-fg-muted">
              Share your form link to start collecting feedback.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onGetEmbed={handleGetEmbed}
              />
            ))}
          </div>
        )}
      </main>

      <EmbedModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        testimonial={selectedTestimonial}
      />
    </div>
  );
}

const Stat = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) => (
  <div className="flex-1 bg-bg p-4 flex flex-col gap-1">
    <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
      {icon}
      {label}
    </span>
    <span className="text-xl font-medium tabular-nums">{value}</span>
  </div>
);

export default TestimonialsEmbed;
