import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, FileText } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import TestimonialCard from "@/components/Testimonial/TestimonialCard";
import EmbedModal from "@/components/Testimonial/EmbedModal";
import { TestimonialData } from "@/utils/embedGenerator";

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
  space: {
    id: number;
    name: string;
    description: string;
    link: string;
  };
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
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
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
    };

    fetchTestimonials();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { space, testimonials } = data;
  const videoCount = testimonials.filter((t) => t.type === "video").length;
  const textCount = testimonials.filter((t) => t.type === "text").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/testimonials")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{space.name}</h1>
            <p className="text-gray-500 text-sm">{space.description}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline" className="text-sm py-1 px-3">
            Total: {testimonials.length}
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3 gap-1">
            <Video size={14} />
            {videoCount}
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3 gap-1">
            <FileText size={14} />
            {textCount}
          </Badge>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              No testimonials yet
            </h2>
            <p className="text-gray-500">
              Share your testimonial form link to start collecting feedback
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

      {/* Embed Modal */}
      <EmbedModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        testimonial={selectedTestimonial}
      />
    </div>
  );
}

export default TestimonialsEmbed;
