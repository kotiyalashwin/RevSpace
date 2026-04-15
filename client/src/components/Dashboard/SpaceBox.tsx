import { Plus, BarChart3, MessageSquareQuote, ArrowUpRight, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";
import { Badge } from "@/components/ui/badge";

type Space = {
  spacename: string;
  description: string;
  link: string;
  _count?: { testimonials: number };
};

type SpaceBoxProps = {
  setIsOpen: (v: boolean) => void;
  spaces: Space[];
};

const variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

function SpaceBox({ setIsOpen, spaces }: SpaceBoxProps) {
  const navigate = useNavigate();

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="mt-10"
    >
      <header className="flex items-end justify-between mb-5">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
            Spaces
          </p>
          <h2 className="text-2xl font-medium tracking-tight text-fg">
            Your collection forms
          </h2>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
        >
          <Plus size={16} />
          New space
        </button>
      </header>

      {spaces && spaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((space) => (
            <SpaceCard
              key={space.link}
              navigate={navigate}
              spacename={space.spacename}
              description={space.description}
              link={space.link}
              count={space._count?.testimonials || 0}
            />
          ))}
        </div>
      ) : (
        <EmptyState onCreate={() => setIsOpen(true)} />
      )}
    </motion.section>
  );
}

const SpaceCard = ({
  spacename,
  description,
  link,
  count,
  navigate,
}: Space & { count: number; navigate: (p: string) => void }) => (
  <div className="group rounded-lg border border-border bg-bg-elevated transition-colors duration-150 hover:border-border-hover overflow-hidden">
    <div className="p-5 space-y-3">
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
    <div className="border-t border-border px-5 py-3 flex items-center justify-between">
      <p className="font-mono text-[11px] text-fg-subtle truncate">/{link}</p>
      <div className="flex items-center gap-1">
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
          onClick={() => navigate(`/testimonial/${link}`)}
          title="Open form"
          className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-hover rounded transition-colors"
        >
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  </div>
);

const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div className="rounded-lg border border-dashed border-border bg-bg-elevated/40 p-16 flex flex-col items-center justify-center text-center">
    <div className="size-12 rounded-full bg-bg-elevated border border-border flex items-center justify-center mb-4">
      <FolderOpen size={20} className="text-fg-muted" />
    </div>
    <h3 className="text-base font-medium text-fg mb-1">No spaces yet</h3>
    <p className="text-sm text-fg-muted mb-6 max-w-sm">
      Create your first space to start collecting testimonials from your customers.
    </p>
    <button
      onClick={onCreate}
      className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
    >
      <Plus size={16} />
      Create your first space
    </button>
  </div>
);

export default SpaceBox;
