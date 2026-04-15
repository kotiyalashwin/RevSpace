import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MessageSquareQuote } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { PageLoader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";

const SERVER = import.meta.env.VITE_SERVER;

interface Space {
  id: number;
  spacename: string;
  description: string;
  link: string;
  _count?: { testimonials: number };
}

function Testimonials() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<{ spaces: Space[] }>(
          `${SERVER}/api/v1/space/spaces`,
          { withCredentials: true }
        );
        setSpaces(response.data.spaces || []);
      } catch {
        toast.error("Failed to load products");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading) return <PageLoader text="Loading testimonials" />;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-elevated rounded-md transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              Embed
            </p>
            <h1 className="text-base font-medium tracking-tight">Testimonials</h1>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-10">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            Pick a space to view & embed
          </h2>
          <p className="text-sm text-fg-muted mt-3 leading-relaxed">
            Browse the testimonials collected for each space and grab embed snippets you can drop into any site.
          </p>
        </div>

        {spaces.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-bg-elevated/40 p-16 text-center">
            <MessageSquareQuote className="mx-auto text-fg-subtle mb-4" size={32} />
            <h3 className="text-base font-medium text-fg mb-1">No spaces yet</h3>
            <p className="text-sm text-fg-muted mb-6">
              Create a space in your dashboard to start collecting testimonials.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
            >
              Go to dashboard
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => navigate(`/testimonials/${space.link}`)}
                className="group text-left rounded-lg border border-border bg-bg-elevated transition-colors duration-150 hover:border-border-hover overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-medium text-fg tracking-tight">
                      {space.spacename}
                    </h3>
                    <Badge>
                      {space._count?.testimonials ?? 0}
                    </Badge>
                  </div>
                  {space.description && (
                    <p className="text-sm text-fg-muted line-clamp-2 leading-relaxed">
                      {space.description}
                    </p>
                  )}
                </div>
                <div className="border-t border-border px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-fg-subtle">
                    /{space.link}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-fg-muted group-hover:text-fg group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Testimonials;
