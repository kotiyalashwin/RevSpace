import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Link2,
  Video,
  Code2,
  Sparkles,
  BarChart3,
  Check,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* NAV */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-200",
          scrolled
            ? "bg-bg/80 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-fg flex items-center justify-center">
              <span className="text-bg text-xs font-bold">R</span>
            </div>
            <span className="font-medium tracking-tight">RevSpace</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-mono text-[11px] uppercase tracking-wider text-fg-muted hover:text-fg transition-colors">
              Features
            </a>
            <a href="#how" className="font-mono text-[11px] uppercase tracking-wider text-fg-muted hover:text-fg transition-colors">
              How it works
            </a>
            <a href="#pricing" className="font-mono text-[11px] uppercase tracking-wider text-fg-muted hover:text-fg transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex h-8 px-3 text-sm text-fg-muted hover:text-fg hover:bg-bg-elevated rounded-md transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
            >
              Start free
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Subtle radial bg */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(0_0%_18%),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 h-7 rounded-full border border-border bg-bg-elevated mb-8">
              <span className="size-1.5 rounded-full bg-success" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                Now in beta
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.98] mb-6">
              Collect testimonials.
              <br />
              <span className="text-fg-muted">Embed them anywhere.</span>
            </h1>

            <p className="text-lg text-fg-muted max-w-xl leading-relaxed mb-10">
              Share a link. Collect video and text reviews from your customers. Get a copy-paste HTML snippet for every one.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
              >
                Get started
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md border border-border bg-transparent text-fg text-sm font-medium hover:bg-bg-elevated hover:border-border-hover transition-colors"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-3">
              How it works
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
              Three steps, no engineering required.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-lg overflow-hidden border border-border bg-border">
            {[
              {
                num: "01",
                title: "Create a space",
                desc: "Spin up a branded testimonial collection form in under 30 seconds.",
                icon: Sparkles,
              },
              {
                num: "02",
                title: "Share the link",
                desc: "Send your unique URL to customers via email, social, or embed it on your site.",
                icon: Link2,
              },
              {
                num: "03",
                title: "Embed anywhere",
                desc: "Get a copy-paste HTML snippet for any testimonial. Drop it into your site.",
                icon: Code2,
              },
            ].map((s) => (
              <div key={s.num} className="bg-bg p-8 space-y-6 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-fg-subtle">{s.num}</span>
                  <s.icon size={16} className="text-fg-muted" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section id="features" className="border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-3">
              Features
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
              Every detail, considered.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-lg overflow-hidden border border-border bg-border">
            {[
              { num: "01", label: "Insights", title: "AI-powered sentiment analysis", desc: "Auto-tag, score, and surface themes from every review.", icon: BarChart3 },
              { num: "02", label: "Video", title: "Native video testimonials", desc: "Customers record from any device. We host and serve them.", icon: Video },
              { num: "03", label: "Embed", title: "Copy-paste embed snippets", desc: "Three styles. One click. Works in any site or framework.", icon: Code2 },
              { num: "04", label: "Speed", title: "Lightweight + fast", desc: "Static HTML embeds. No tracking pixels. No bloat.", icon: Zap },
              { num: "05", label: "Forms", title: "Customizable prompts", desc: "Add your own questions to guide great reviews.", icon: Sparkles },
              { num: "06", label: "Share", title: "Public link in seconds", desc: "Send a single URL. We handle the rest.", icon: Link2 },
            ].map((f) => (
              <div key={f.num} className="bg-bg p-8 space-y-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                    {f.num} · {f.label}
                  </span>
                  <f.icon size={14} className="text-fg-subtle" />
                </div>
                <h3 className="text-lg font-medium tracking-tight">{f.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-3">
              Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
              Free while we're in beta.
            </h2>
            <p className="text-sm text-fg-muted mt-4 leading-relaxed">
              Use everything, with no limits. Paid plans will arrive once we leave beta — early users get the best rate.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="rounded-lg border border-border-hover bg-bg-elevated p-6 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                  Beta access
                </p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-bg bg-fg px-1.5 py-0.5 rounded">
                  Free
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1 mt-2">
                <span className="text-4xl font-medium tracking-tight">$0</span>
                <span className="font-mono text-[11px] text-fg-muted">while in beta</span>
              </div>

              <button
                onClick={() => navigate("/signup")}
                className="h-9 mt-6 mb-6 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
              >
                Create an account
              </button>

              <ul className="space-y-2.5 text-sm border-t border-border pt-6">
                {[
                  "Unlimited spaces",
                  "Video and text testimonials",
                  "AI sentiment analysis",
                  "Copy-paste HTML embeds",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-fg-muted">
                    <Check size={14} className="text-fg-muted shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight max-w-3xl mx-auto mb-8">
            Start collecting{" "}
            <span className="text-fg-muted">in a few minutes.</span>
          </h2>
          <button
            onClick={() => navigate("/signup")}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors"
          >
            Create an account
            <ArrowRight size={14} />
          </button>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mt-6">
            Free during beta · No credit card
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-fg flex items-center justify-center">
              <span className="text-bg text-[10px] font-bold">R</span>
            </div>
            <span className="font-mono text-[11px] text-fg-muted">
              © 2026 RevSpace
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="font-mono text-[10px] uppercase tracking-wider text-fg-muted hover:text-fg transition-colors">
              Features
            </a>
            <a href="#how" className="font-mono text-[10px] uppercase tracking-wider text-fg-muted hover:text-fg transition-colors">
              How it works
            </a>
            <a href="#pricing" className="font-mono text-[10px] uppercase tracking-wider text-fg-muted hover:text-fg transition-colors">
              Pricing
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
