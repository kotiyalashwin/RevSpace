import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";

const SERVER = import.meta.env.VITE_SERVER;

type Page = { verify: "signup" | "login" };
type FormState = { name?: string; email?: string; password?: string };

const TESTIMONIAL_QUOTE = {
  text: "RevSpace turned scattered customer praise into a steady stream of conversion-ready proof. We embed reviews everywhere now.",
  author: "Maya Chen",
  role: "Head of Marketing, Linear Studio",
};

function Verify({ verify }: Page) {
  const [formData, setFormData] = useState<FormState>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLogin = verify === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      isLogin
        ? !formData.email || !formData.password
        : !formData.email || !formData.name || !formData.password
    ) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${SERVER}/api/v1/user/${verify}`, formData, {
        withCredentials: true,
      });
      const data = response.data as { success: boolean; message?: string; error?: string };
      if (data.success) {
        toast.success(data.message || "Welcome");
        navigate("/dashboard");
      } else {
        toast.error(data.error || "Failed");
      }
    } catch {
      toast.error(isLogin ? "Login failed" : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "h-11 w-full rounded-md border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors hover:border-border-hover focus-visible:outline-none focus-visible:border-fg-muted focus-visible:ring-2 focus-visible:ring-border-hover/50";

  return (
    <div className="min-h-screen bg-bg text-fg grid md:grid-cols-2">
      {/* Left: form */}
      <section className="flex flex-col px-6 md:px-16 py-10">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-fg hover:text-fg/80 transition-colors w-fit"
        >
          <div className="size-7 rounded-md bg-fg flex items-center justify-center">
            <span className="text-bg text-xs font-bold">R</span>
          </div>
          <span className="font-medium tracking-tight">RevSpace</span>
        </button>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-sm">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-3">
              {isLogin ? "Welcome back" : "Get started"}
            </p>
            <h1 className="text-3xl font-medium tracking-tight mb-2 leading-tight">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="text-sm text-fg-muted mb-8 leading-relaxed">
              {isLogin
                ? "Enter your credentials to access your workspace."
                : "Start collecting testimonials in under a minute."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                    Name
                  </label>
                  <input
                    className={inputCls}
                    placeholder="Your name"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                  Email
                </label>
                <input
                  className={inputCls}
                  type="email"
                  placeholder="you@company.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                  Password
                </label>
                <input
                  className={inputCls}
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full inline-flex items-center justify-center gap-2 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    {isLogin ? "Signing in" : "Creating account"}
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign in" : "Create account"}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <p className="text-sm text-fg-muted mt-8">
              {isLogin ? "New to RevSpace? " : "Already have an account? "}
              <button
                onClick={() => navigate(isLogin ? "/signup" : "/login")}
                className="text-fg hover:underline underline-offset-4"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
          © RevSpace · 2026
        </p>
      </section>

      {/* Right: pull quote */}
      <section className="hidden md:flex border-l border-border bg-[hsl(0_0%_10%)] px-16 py-10 flex-col">
        <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-auto">
          Customer voice
        </p>

        <div className="space-y-8">
          <p className="text-2xl leading-relaxed text-fg italic font-light tracking-tight">
            "{TESTIMONIAL_QUOTE.text}"
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <div className="size-8 rounded-full bg-bg-elevated border border-border flex items-center justify-center">
              <span className="text-fg-muted text-xs font-medium">
                {TESTIMONIAL_QUOTE.author[0]}
              </span>
            </div>
            <div>
              <p className="text-sm text-fg">{TESTIMONIAL_QUOTE.author}</p>
              <p className="font-mono text-[11px] text-fg-muted">{TESTIMONIAL_QUOTE.role}</p>
            </div>
          </div>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mt-auto pt-12">
          Testimonial via RevSpace
        </p>
      </section>
    </div>
  );
}

export default Verify;
