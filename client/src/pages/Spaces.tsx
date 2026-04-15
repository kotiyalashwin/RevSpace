import React, { useEffect, useState } from "react";
import { ExternalLink, BarChart3, MessageSquareQuote, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSpaces from "../hooks/spaces";
import { InlineLoader } from "../components/ui/loader";
import { Badge } from "@/components/ui/badge";

export interface Space {
  id?: number;
  spacename: string;
  description: string;
  link: string;
  _count?: { testimonials: number };
  testimonials?: { id: string }[];
}

const SpaceCard = ({
  spacename,
  description,
  link,
  _count,
  testimonials,
  navigate,
}: Space & { navigate: (p: string) => void }) => {
  const count = _count?.testimonials ?? testimonials?.length ?? 0;

  const copyLink = () => {
    const url = `${window.location.origin}/testimonial/${link}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  return (
    <div className="group rounded-lg border border-border bg-bg-elevated transition-colors duration-150 hover:border-border-hover overflow-hidden flex flex-col">
      <div className="p-5 space-y-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-medium text-fg tracking-tight truncate">
            {spacename}
          </h3>
          <Badge>{count} {count === 1 ? "review" : "reviews"}</Badge>
        </div>
        {description && (
          <p className="text-sm text-fg-muted line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="border-t border-border px-5 py-3 flex items-center justify-between gap-2">
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle hover:text-fg transition-colors truncate"
        >
          <Copy size={11} />
          /{link}
        </button>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => navigate(`/insights/${link}`)}
            title="Insights"
            className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-hover rounded transition-colors"
          >
            <BarChart3 size={14} />
          </button>
          <button
            onClick={() => navigate(`/testimonials/${link}`)}
            title="Testimonials"
            className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-hover rounded transition-colors"
          >
            <MessageSquareQuote size={14} />
          </button>
          <button
            onClick={() => window.open(`/testimonial/${link}`, "_blank")}
            title="Open form"
            className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-hover rounded transition-colors"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Spaces: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const { isLoading, spacesData } = useSpaces();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) setSpaces(spacesData);
  }, [isLoading, spacesData]);

  return (
    <div className="px-6 md:px-10 py-10 max-w-[1280px] mx-auto">
      <header className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
          Workspace
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-fg mt-2">
          Spaces
        </h1>
        <p className="text-sm text-fg-muted mt-2 max-w-lg">
          All of your testimonial collection forms in one place.
        </p>
      </header>

      {isLoading ? (
        <InlineLoader text="Loading spaces" />
      ) : spaces.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-bg-elevated/40 p-16 text-center">
          <h3 className="text-base font-medium text-fg">No spaces yet</h3>
          <p className="text-sm text-fg-muted mt-1">
            Head to Overview to create your first space.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((space, index) => (
            <SpaceCard key={index} {...space} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Spaces;
