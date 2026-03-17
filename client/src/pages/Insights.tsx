import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, FileText, TrendingUp, TrendingDown, Sparkles, RefreshCw } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
  space: {
    id: number;
    name: string;
    description: string;
    link: string;
  };
  stats: {
    totalReviews: number;
    analyzedCount: number;
    avgScore: number;
    sentimentCounts: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
  insights: {
    summary: string;
    topAppreciations: string[];
    topConcerns: string[];
  };
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
      const response = await axios.get<InsightsData>(`${SERVER}/api/v1/testimonial/insights/${link}`, {
        withCredentials: true,
      });
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

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200";
      case "negative":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
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

  const { space, stats, insights, testimonials } = data;
  const totalSentiments = stats.sentimentCounts.positive + stats.sentimentCounts.neutral + stats.sentimentCounts.negative;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{space.name}</h1>
              <p className="text-gray-500 text-sm">{space.description}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.totalReviews}</div>
              <p className="text-sm text-gray-500">{stats.analyzedCount} analyzed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${getScoreColor(stats.avgScore)}`}>
                {stats.avgScore}%
              </div>
              <Progress value={stats.avgScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  +{stats.sentimentCounts.positive}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  ~{stats.sentimentCounts.neutral}
                </Badge>
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  -{stats.sentimentCounts.negative}
                </Badge>
              </div>
              {totalSentiments > 0 && (
                <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className="bg-green-500"
                    style={{ width: `${(stats.sentimentCounts.positive / totalSentiments) * 100}%` }}
                  />
                  <div
                    className="bg-gray-400"
                    style={{ width: `${(stats.sentimentCounts.neutral / totalSentiments) * 100}%` }}
                  />
                  <div
                    className="bg-red-500"
                    style={{ width: `${(stats.sentimentCounts.negative / totalSentiments) * 100}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-yellow-500" size={20} />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{insights.summary}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
                  <TrendingUp size={18} />
                  Top Appreciations
                </h3>
                {insights.topAppreciations.length > 0 ? (
                  <ul className="space-y-2">
                    {insights.topAppreciations.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-green-700">
                        <span className="text-green-500">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-600 text-sm">No data yet</p>
                )}
              </div>

              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
                  <TrendingDown size={18} />
                  Top Concerns
                </h3>
                {insights.topConcerns.length > 0 ? (
                  <ul className="space-y-2">
                    {insights.topConcerns.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-red-700">
                        <span className="text-red-500">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-red-600 text-sm">No concerns reported</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Testimonials */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Feedback ({testimonials.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="neutral">Neutral</TabsTrigger>
                <TabsTrigger value="negative">Negative</TabsTrigger>
              </TabsList>

              {["all", "positive", "neutral", "negative"].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4">
                  {testimonials
                    .filter((t) => tab === "all" || t.sentiment === tab)
                    .map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="gap-1">
                              {testimonial.type === "video" ? (
                                <Video size={14} />
                              ) : (
                                <FileText size={14} />
                              )}
                              {testimonial.type}
                            </Badge>
                            <span className="text-sm text-gray-500">{testimonial.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {testimonial.score !== null && (
                              <Badge variant="outline" className={getScoreColor(testimonial.score)}>
                                {testimonial.score}%
                              </Badge>
                            )}
                            {testimonial.sentiment && (
                              <Badge
                                variant="outline"
                                className={getSentimentColor(testimonial.sentiment)}
                              >
                                {testimonial.sentiment}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {testimonial.content ? (
                          <p className="text-gray-700 mb-3">{testimonial.content}</p>
                        ) : testimonial.type === "video" && testimonial.v_url ? (
                          <div className="mb-3">
                            <video
                              src={testimonial.v_url}
                              controls
                              className="w-full max-w-md rounded-lg"
                            />
                            {!testimonial.analyzed && (
                              <p className="text-sm text-yellow-600 mt-2">
                                Analysis in progress...
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-400 italic mb-3">No content available</p>
                        )}

                        {testimonial.keywords && testimonial.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {testimonial.keywords.map((keyword, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <Separator className="my-3" />
                        <p className="text-xs text-gray-400">
                          {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))}

                  {testimonials.filter((t) => tab === "all" || t.sentiment === tab).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No {tab === "all" ? "" : tab} feedback yet
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Insights;
