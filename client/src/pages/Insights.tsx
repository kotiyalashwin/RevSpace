import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Video,
  FileText,
  TrendingUp,
  TrendingDown,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLoader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

const SERVER = import.meta.env.VITE_SERVER;

interface Testimonial {
  id: string;
  email: string;
  type: "video" | "text";
  content: string | null;
  v_url: string | null;
  sentiment: "positive" | "neutral" | "negative" | null;
  score: number | null;
  keywords: string[] | null;
  analyzed: boolean;
  createdAt: string;
}

interface InsightsData {
  success: boolean;
  space: { id: number; name: string; description: string; link: string };
  stats: {
    totalReviews: number;
    analyzedCount: number;
    avgScore: number;
    sentimentCounts: { positive: number; neutral: number; negative: number };
  };
  insights: { summary: string; topAppreciations: string[]; topConcerns: string[] };
  testimonials: Testimonial[];
}

function Insights() {
  const { link } = useParams<{ link: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInsights = async () => {
    try {
      const response = await axios.get<InsightsData>(
        `${SERVER}/api/v1/testimonial/insights/${link}`,
        { withCredentials: true }
      );
      setData(response.data);
    } catch {
      toast.error("Failed to load insights");
      navigate("/dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [link]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInsights();
  };

  const sentimentVariant = (
    s: string | null
  ): "success" | "destructive" | "default" => {
    if (s === "positive") return "success";
    if (s === "negative") return "destructive";
    return "default";
  };

  const scoreColor = (score: number) =>
    score >= 70 ? "text-success" : score >= 40 ? "text-fg" : "text-danger";

  if (loading) return <PageLoader text="Loading insights" />;
  if (!data) return null;

  const { space, stats, insights, testimonials } = data;
  const totalSent =
    stats.sentimentCounts.positive + stats.sentimentCounts.neutral + stats.sentimentCounts.negative;

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-elevated rounded-md transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                Insights
              </p>
              <h1 className="text-base font-medium tracking-tight truncate">
                {space.name}
              </h1>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-bg-elevated text-xs text-fg-muted hover:text-fg hover:border-border-hover transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* KPI grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-lg overflow-hidden border border-border bg-border">
          <KPI label="Total Reviews" value={stats.totalReviews} sub={`${stats.analyzedCount} analyzed`} />
          <KPI
            label="Avg Sentiment"
            value={`${stats.avgScore}%`}
            valueClassName={scoreColor(stats.avgScore)}
          />
          <KPI label="Positive" value={stats.sentimentCounts.positive} accent="text-success" />
          <KPI label="Negative" value={stats.sentimentCounts.negative} accent="text-danger" />
        </div>

        {/* Sentiment bar */}
        {totalSent > 0 && (
          <section className="rounded-lg border border-border bg-bg-elevated p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted mb-3">
              Distribution
            </p>
            <div className="flex h-1.5 rounded-full overflow-hidden bg-border">
              <div
                className="bg-success"
                style={{ width: `${(stats.sentimentCounts.positive / totalSent) * 100}%` }}
              />
              <div
                className="bg-fg-muted"
                style={{ width: `${(stats.sentimentCounts.neutral / totalSent) * 100}%` }}
              />
              <div
                className="bg-danger"
                style={{ width: `${(stats.sentimentCounts.negative / totalSent) * 100}%` }}
              />
            </div>
            <div className="flex gap-6 mt-4 font-mono text-[11px] text-fg-muted">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-success" />
                {stats.sentimentCounts.positive} positive
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-fg-muted" />
                {stats.sentimentCounts.neutral} neutral
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-danger" />
                {stats.sentimentCounts.negative} negative
              </span>
            </div>
          </section>
        )}

        {/* AI Insights */}
        <section className="rounded-lg border border-border bg-bg-elevated overflow-hidden">
          <header className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Sparkles size={14} className="text-fg-muted" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              AI Insights
            </p>
          </header>
          <div className="p-6 space-y-6">
            <p className="text-base text-fg leading-relaxed">{insights.summary}</p>

            <div className="grid md:grid-cols-2 gap-px rounded-md overflow-hidden border border-border bg-border">
              <div className="bg-bg-elevated p-5">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-success mb-3 flex items-center gap-2">
                  <TrendingUp size={12} />
                  Top Appreciations
                </h3>
                {insights.topAppreciations.length > 0 ? (
                  <ul className="space-y-2">
                    {insights.topAppreciations.map((item, i) => (
                      <li key={i} className="text-sm text-fg flex gap-2">
                        <span className="text-fg-subtle font-mono">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-fg-subtle">No data yet</p>
                )}
              </div>
              <div className="bg-bg-elevated p-5">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-danger mb-3 flex items-center gap-2">
                  <TrendingDown size={12} />
                  Top Concerns
                </h3>
                {insights.topConcerns.length > 0 ? (
                  <ul className="space-y-2">
                    {insights.topConcerns.map((item, i) => (
                      <li key={i} className="text-sm text-fg flex gap-2">
                        <span className="text-fg-subtle font-mono">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-fg-subtle">No concerns reported</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Individual feedback */}
        <section>
          <header className="mb-5 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                Feedback
              </p>
              <h2 className="text-2xl font-medium tracking-tight text-fg mt-1">
                Individual reviews
              </h2>
            </div>
            <span className="font-mono text-[11px] text-fg-muted">
              {testimonials.length} total
            </span>
          </header>

          <Tabs defaultValue="all">
            <TabsList variant="line">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="neutral">Neutral</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
            </TabsList>

            {["all", "positive", "neutral", "negative"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-3 mt-6">
                {testimonials
                  .filter((t) => tab === "all" || t.sentiment === tab)
                  .map((t) => (
                    <article
                      key={t.id}
                      className="rounded-lg border border-border bg-bg-elevated p-5 transition-colors duration-150 hover:border-border-hover"
                    >
                      <header className="flex items-center justify-between mb-3 gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <Badge>
                            {t.type === "video" ? <Video size={10} /> : <FileText size={10} />}
                            {t.type}
                          </Badge>
                          <span className="font-mono text-[11px] text-fg-muted truncate">
                            {t.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {t.score !== null && (
                            <span className={cn("font-mono text-[11px] tabular-nums", scoreColor(t.score))}>
                              {t.score}%
                            </span>
                          )}
                          {t.sentiment && (
                            <Badge variant={sentimentVariant(t.sentiment)}>{t.sentiment}</Badge>
                          )}
                        </div>
                      </header>

                      {t.content ? (
                        <p className="text-sm text-fg leading-relaxed">{t.content}</p>
                      ) : t.type === "video" && t.v_url ? (
                        <div>
                          <video
                            src={t.v_url}
                            controls
                            className="w-full max-w-md rounded-md border border-border bg-bg"
                          />
                          {!t.analyzed && (
                            <p className="text-xs text-fg-muted mt-2 font-mono">
                              Analysis in progress…
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-fg-subtle italic">No content available</p>
                      )}

                      {t.keywords && t.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {t.keywords.map((k, i) => (
                            <Badge key={i} variant="outline">
                              {k}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <p className="font-mono text-[10px] text-fg-subtle mt-4 pt-3 border-t border-border">
                        {new Date(t.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </article>
                  ))}

                {testimonials.filter((t) => tab === "all" || t.sentiment === tab).length === 0 && (
                  <div className="rounded-lg border border-dashed border-border bg-bg-elevated/40 p-12 text-center">
                    <p className="text-sm text-fg-muted">
                      No {tab === "all" ? "" : tab} feedback yet
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
    </div>
  );
}

const KPI = ({
  label,
  value,
  sub,
  accent,
  valueClassName,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  valueClassName?: string;
}) => (
  <div className="bg-bg p-6 flex flex-col gap-2">
    <span className={cn("font-mono text-[10px] uppercase tracking-wider", accent || "text-fg-muted")}>
      {label}
    </span>
    <span className={cn("text-3xl font-medium tracking-tight tabular-nums", valueClassName || "text-fg")}>
      {value}
    </span>
    {sub && <span className="font-mono text-[11px] text-fg-subtle">{sub}</span>}
  </div>
);

export default Insights;
