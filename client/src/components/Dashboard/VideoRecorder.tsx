import React, { useState, useRef } from "react";

const VideoRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false); // State to track recording status
  const [videoURL, setVideoURL] = useState<string | null>(null); // State to store the recorded video URL
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Ref to hold the MediaRecorder instance
  const videoStreamRef = useRef<MediaStream | null>(null); // Ref to hold the MediaStream

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoStreamRef.current = stream;

      // Create a MediaRecorder instance
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];

      // Collect the recorded data
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      // Create a video URL after recording stops
      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        const videoURL = URL.createObjectURL(videoBlob);
        setVideoURL(videoURL);
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check your permissions.");
    }
  };

  const handleStopRecording = () => {
    // Stop the recording
    mediaRecorderRef.current?.stop();
    setIsRecording(false);

    // Stop the video stream
    videoStreamRef.current?.getTracks().forEach((track) => track.stop());
  };

  return (
    <div className="video-recorder">
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          style={{
            padding: "10px 20px",
            backgroundColor: isRecording ? "#FF4B4B" : "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      {videoURL && (
        <div>
          <p>Recorded Video:</p>
          <video
            src={videoURL}
            controls
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
