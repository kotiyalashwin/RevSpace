import React, { useState, useRef } from "react";
import { Circle, Square, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoRecorderProps {
  setVideoBlob: (blob: Blob) => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ setVideoBlob }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoStreamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(blob);
        setVideoURL(URL.createObjectURL(blob));
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    videoStreamRef.current?.getTracks().forEach((t) => t.stop());
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={cn(
          "w-full h-11 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border transition-colors",
          isRecording
            ? "bg-danger/10 border-danger/30 text-danger hover:bg-danger/20"
            : "bg-bg border-border text-fg-muted hover:text-fg hover:border-border-hover hover:bg-bg-hover"
        )}
      >
        {isRecording ? (
          <>
            <Square size={12} fill="currentColor" />
            Stop recording
          </>
        ) : (
          <>
            <Circle size={12} fill="currentColor" className="text-danger" />
            Start recording
          </>
        )}
      </button>

      {videoURL && (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
            <Video size={11} />
            Preview
          </p>
          <video
            src={videoURL}
            controls
            className="w-full rounded-md border border-border bg-bg"
          />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
