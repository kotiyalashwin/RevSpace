import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pencil, UserCircle, Video, X, Send, Loader2 } from "lucide-react";
import VideoRecorder from "../components/Dashboard/VideoRecorder";

const SERVER = import.meta.env.VITE_SERVER;

type space = {
  header: string;
  message: string;
  wantText: boolean;
  questions: string[];
  wantVideo: boolean;
};

function Testimonial() {
  const { link } = useParams<{ link: string }>();
  const [space, setSpace] = useState<space>();
  const [videoBlob, setVideoBlob] = useState<Blob>();
  const [mode, setMode] = useState<"select" | "video" | "text">("select");
  const [textReview, setTextReview] = useState("");
  const [uploader, setUploader] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getSpaceDetails = async () => {
    try {
      const url = `${SERVER}/api/v1/space/${link}/details`;
      const response = await axios.get<{ success: boolean; spaceDetails: space }>(url, {
        withCredentials: true,
      });

      if (response.data.success) {
        setSpace(response.data.spaceDetails);
      } else {
        toast.error("Unable to fetch Space details");
      }
    } catch {
      toast.error("Unable to fetch Space details");
    }
  };

  useEffect(() => {
    getSpaceDetails();
  }, []);

  const handleSubmitVideo = async () => {
    if (!uploader || !uploader.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!videoBlob) {
      toast.error("Please record a video first");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("video", videoBlob);

    try {
      const url = `${SERVER}/api/v1/testimonial/videoupload/${link}/${uploader}`;

      const response = await axios.post<{ success: boolean }>(url, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Thank you for your feedback!");
        setSubmitted(true);
      } else {
        toast.error("Unable to upload testimonial");
      }
    } catch (error) {
      console.error("Error sending video:", error);
      toast.error("Failed to submit testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitText = async () => {
    if (!uploader || !uploader.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!textReview.trim() || textReview.length < 10) {
      toast.error("Please write at least 10 characters");
      return;
    }

    setSubmitting(true);

    try {
      const url = `${SERVER}/api/v1/testimonial/textupload/${link}`;

      const response = await axios.post<{ success: boolean }>(
        url,
        { email: uploader, text: textReview },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Thank you for your feedback!");
        setSubmitted(true);
      } else {
        toast.error("Unable to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting text:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">Your feedback has been submitted successfully.</p>
          <p className="text-sm text-gray-400">You can close this page now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        {space && (
          <div className="bg-white p-6 md:p-8 flex flex-col items-center rounded-xl shadow-lg">
            {/* Header */}
            <div className="text-cyan-800 mb-4">
              <UserCircle size={60} />
            </div>
            <header className="text-center w-full mb-6">
              <h1 className="text-3xl lg:text-5xl text-neutral-700 font-bold mb-3">
                {space.header}
              </h1>
              <p className="text-base lg:text-lg text-neutral-500">
                {space.message}
              </p>
            </header>

            {/* Questions */}
            {space.questions.length > 0 && (
              <div className="w-full mb-6">
                <header className="text-neutral-600 font-semibold mb-2">
                  Try to answer these questions:
                </header>
                <div className="bg-gray-100 rounded-lg p-4">
                  {space.questions.map((question, i) => {
                    const letter = String.fromCharCode(97 + i);
                    return (
                      <p key={i} className="text-base p-2 text-slate-700">
                        {`${letter}) `}
                        {question}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mode Selection */}
            {mode === "select" && (
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {space.wantVideo && (
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white px-4 py-4 rounded-lg transition-colors"
                    onClick={() => setMode("video")}
                  >
                    <Video className="mr-3" />
                    <span>Record Video</span>
                  </button>
                )}
                {space.wantText && (
                  <button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white px-4 py-4 rounded-lg transition-colors"
                    onClick={() => setMode("text")}
                  >
                    <Pencil className="mr-3" />
                    <span>Write Review</span>
                  </button>
                )}
              </div>
            )}

            {/* Video Recording Mode */}
            {mode === "video" && (
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Record Your Testimonial</h3>
                  <button
                    onClick={() => {
                      setMode("select");
                      setVideoBlob(undefined);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <VideoRecorder setVideoBlob={setVideoBlob} />

                <div className="mt-6 space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email (required)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={uploader}
                    onChange={(e) => setUploader(e.target.value)}
                  />
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    onClick={handleSubmitVideo}
                    disabled={submitting || !videoBlob}
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin mr-2" size={20} />
                    ) : (
                      <Send className="mr-2" size={20} />
                    )}
                    {submitting ? "Submitting..." : "Submit Video Testimonial"}
                  </button>
                </div>
              </div>
            )}

            {/* Text Review Mode */}
            {mode === "text" && (
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Write Your Review</h3>
                  <button
                    onClick={() => {
                      setMode("select");
                      setTextReview("");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <textarea
                  placeholder="Share your experience... What did you like? What could be improved?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none min-h-[150px] resize-none"
                  value={textReview}
                  onChange={(e) => setTextReview(e.target.value)}
                />
                <p className="text-sm text-gray-400 mt-1 mb-4">
                  {textReview.length} characters {textReview.length < 10 && "(minimum 10)"}
                </p>

                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email (required)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    value={uploader}
                    onChange={(e) => setUploader(e.target.value)}
                  />
                  <button
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    onClick={handleSubmitText}
                    disabled={submitting || textReview.length < 10}
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin mr-2" size={20} />
                    ) : (
                      <Send className="mr-2" size={20} />
                    )}
                    {submitting ? "Analyzing & Submitting..." : "Submit Written Review"}
                  </button>
                </div>
              </div>
            )}

            <p className="text-neutral-400 text-sm mt-6">Powered by RevSpace</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testimonial;
