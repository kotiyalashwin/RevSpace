import React from "react";
import { ArrowRight } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center px-4">
      <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-4">
        404 — Page not found
      </p>
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-4 text-center">
        Off the map.
      </h1>
      <p className="text-base text-fg-muted text-center max-w-md mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
      >
        Back to home
        <ArrowRight size={14} />
      </a>
    </div>
  );
};

export default NotFound;
