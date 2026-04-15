import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pencil, Video, X, Send, Loader2, Check, ArrowLeft } from "lucide-react";
import VideoRecorder from "../components/Dashboard/VideoRecorder";
import { PageLoader } from "../components/ui/loader";

const SERVER = import.meta.env.VITE_SERVER;

type Space = {
  header: string;
  message: string;
  wantText: boolean;
  questions: string[];
  wantVideo: boolean;
};

function Testimonial() {
  const { link } = useParams<{ link: string }>();
  const [space, setSpace] = useState<Space>();
  const [loading, setLoading] = useState(true);
  const [videoBlob, setVideoBlob] = useState<Blob>();
  const [mode, setMode] = useState<"select" | "video" | "text">("select");
  const [textReview, setTextReview] = useState("");
  const [uploader, setUploader] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<{ success: boolean; spaceDetails: Space }>(
          `${SERVER}/api/v1/space/${link}/details`,
          { withCredentials: true }
        );
        if (response.data.success) setSpace(response.data.spaceDetails);
        else toast.error("Unable to fetch space");
      } catch {
        toast.error("Unable to fetch space");
      } finally {
        setLoading(false);
      }
    })();
  }, [link]);

  const handleSubmitVideo = async () => {
    if (!uploader || !uploader.includes("@")) return toast.error("Enter a valid email");
    if (!videoBlob) return toast.error("Record a video first");

    setSubmitting(true);
    const formData = new FormData();
    formData.append("video", videoBlob);
    try {
      const response = await axios.post<{ success: boolean }>(
        `${SERVER}/api/v1/testimonial/videoupload/${link}/${uploader}`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) setSubmitted(true);
      else toast.error("Upload failed");
    } catch {
      toast.error("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitText = async () => {
    if (!uploader || !uploader.includes("@")) return toast.error("Enter a valid email");
    if (!textReview.trim() || textReview.length < 10)
      return toast.error("Write at least 10 characters");

    setSubmitting(true);
    try {
      const response = await axios.post<{ success: boolean }>(
        `${SERVER}/api/v1/testimonial/textupload/${link}`,
        { email: uploader, text: textReview },
        { withCredentials: true }
      );
      if (response.data.success) setSubmitted(true);
      else toast.error("Submit failed");
    } catch {
      toast.error("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader text="Loading form" />;

  const inputCls =
    "h-11 w-full rounded-md border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors hover:border-border-hover focus-visible:outline-none focus-visible:border-fg-muted focus-visible:ring-2 focus-visible:ring-border-hover/50";

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg text-fg flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="size-14 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-6">
            <Check className="text-success" size={24} />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-success mb-3">
            Submitted
          </p>
          <h1 className="text-3xl font-medium tracking-tight mb-3">Thank you</h1>
          <p className="text-sm text-fg-muted leading-relaxed mb-8">
            Your feedback was submitted successfully. You can close this page now.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
            Powered by RevSpace
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        {space && (
          <div className="rounded-lg border border-border bg-bg-elevated overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-10 pb-6 text-center border-b border-border">
              <div className="size-10 rounded-full bg-bg border border-border flex items-center justify-center mx-auto mb-6">
                <span className="text-fg text-sm font-medium">R</span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-3">
                Share your experience
              </p>
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-3">
                {space.header}
              </h1>
              <p className="text-sm text-fg-muted leading-relaxed max-w-md mx-auto">
                {space.message}
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-8 space-y-8">
              {/* Questions */}
              {space.questions.length > 0 && mode === "select" && (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-3">
                    A few prompts
                  </p>
                  <ul className="space-y-2">
                    {space.questions.map((q, i) => (
                      <li key={i} className="text-sm text-fg-muted leading-relaxed flex gap-3">
                        <span className="font-mono text-fg-subtle">
                          {String.fromCharCode(97 + i)}.
                        </span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mode Selection */}
              {mode === "select" && (
                <div className="space-y-2">
                  {space.wantVideo && (
                    <button
                      onClick={() => setMode("video")}
                      className="w-full flex items-center gap-3 px-4 h-12 rounded-md border border-border bg-bg hover:border-border-hover hover:bg-bg-hover transition-colors text-left group"
                    >
                      <div className="size-8 rounded-md bg-bg-elevated border border-border flex items-center justify-center">
                        <Video size={14} className="text-fg-muted group-hover:text-fg" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-fg font-medium">Record a video</p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                          Camera + microphone
                        </p>
                      </div>
                      <span className="font-mono text-fg-subtle group-hover:text-fg">→</span>
                    </button>
                  )}
                  {space.wantText && (
                    <button
                      onClick={() => setMode("text")}
                      className="w-full flex items-center gap-3 px-4 h-12 rounded-md border border-border bg-bg hover:border-border-hover hover:bg-bg-hover transition-colors text-left group"
                    >
                      <div className="size-8 rounded-md bg-bg-elevated border border-border flex items-center justify-center">
                        <Pencil size={14} className="text-fg-muted group-hover:text-fg" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-fg font-medium">Write a review</p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                          Quick and easy
                        </p>
                      </div>
                      <span className="font-mono text-fg-subtle group-hover:text-fg">→</span>
                    </button>
                  )}
                </div>
              )}

              {/* Video mode */}
              {mode === "video" && (
                <div className="space-y-5">
                  <ModeHeader title="Video testimonial" onBack={() => { setMode("select"); setVideoBlob(undefined); }} />
                  <VideoRecorder setVideoBlob={setVideoBlob} />

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        className={inputCls}
                        value={uploader}
                        onChange={(e) => setUploader(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleSubmitVideo}
                      disabled={submitting || !videoBlob}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                      {submitting ? "Submitting" : "Submit testimonial"}
                    </button>
                  </div>
                </div>
              )}

              {/* Text mode */}
              {mode === "text" && (
                <div className="space-y-5">
                  <ModeHeader title="Written review" onBack={() => { setMode("select"); setTextReview(""); }} />

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                      Your review
                    </label>
                    <textarea
                      placeholder="What did you like? What could we improve?"
                      className="w-full min-h-[160px] rounded-md border border-border bg-bg-elevated px-3 py-3 text-sm text-fg placeholder:text-fg-subtle resize-none transition-colors hover:border-border-hover focus-visible:outline-none focus-visible:border-fg-muted focus-visible:ring-2 focus-visible:ring-border-hover/50 leading-relaxed"
                      value={textReview}
                      onChange={(e) => setTextReview(e.target.value)}
                    />
                    <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                      {textReview.length} chars{" "}
                      {textReview.length < 10 && "· min 10"}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className={inputCls}
                      value={uploader}
                      onChange={(e) => setUploader(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleSubmitText}
                    disabled={submitting || textReview.length < 10}
                    className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-md bg-fg text-bg text-sm font-medium hover:bg-fg/90 transition-colors disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                    {submitting ? "Submitting" : "Submit review"}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-8 py-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                Powered by RevSpace
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ModeHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <div className="flex items-center gap-3 pb-4 border-b border-border">
    <button
      onClick={onBack}
      className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg rounded-md transition-colors"
    >
      <ArrowLeft size={14} />
    </button>
    <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted flex-1">
      {title}
    </p>
    <button
      onClick={onBack}
      className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg rounded-md transition-colors"
    >
      <X size={14} />
    </button>
  </div>
);

export default Testimonial;
