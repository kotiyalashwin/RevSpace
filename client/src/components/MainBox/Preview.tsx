// UseState: preview,wantImage,card,valueVideo,Valuetext

import { Pencil, UserCircle, Video } from "lucide-react";
import { useState } from "react";
import VideoRecorder from "../VideoRecorder";
import { useNavigate } from "react-router-dom";

type PreviewProps = {
  preview: string | null;
  wantImage: boolean;
  cards: string[];
  valueVideo: boolean;
  valueText: boolean;
  header: string;
  message: string;
};

function Preview({
  preview,
  wantImage,
  cards,
  valueVideo,
  valueText,
  header,
  message,
}: PreviewProps) {
  const navigate = useNavigate();

  function handleReset() {
    navigate("/testimonial");
  }

  const [wantRecord, setWantRecord] = useState(false);
  return (
    <div className="w-full md:w-[70%] h-full md:min-h-[60vh] bg-white p-2 flex flex-col  items-center justify-evenly md:justify-normal rounded-lg">
      <div className="text-cyan-800">
        <UserCircle size={60} />
      </div>
      <header className="text-center w-full">
        <h1 className="text-4xl lg:text-6xl text-neutral-600 font-bold mb-2">
          {header}
        </h1>
        <p className="text-sm lg:text-xl text-neutral-500">{message}</p>
      </header>

      {preview && wantImage && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={preview}
            alt="Uploaded Preview"
            style={{
              width: "300px",
              height: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {cards.length === 0 ? null : (
        <div className="p-4 w-full">
          <header className="text-neutral-600 font-semibold">
            Try to Answer these Question:-
          </header>
          <div className="bg-gray-200 p-4">
            {cards.map((card, i) => {
              const letter = String.fromCharCode(97 + i);
              return (
                <p key={i} className="text-lg p-2 text-slate-800">
                  {`${letter}) `}
                  {card}
                </p>
              );
            })}
          </div>
        </div>
      )}
      {valueVideo && !wantRecord && (
        <button
          className="bg-blue-600 flex text-white px-2 py-4 rounded-md m-4"
          onClick={() => setWantRecord(true)}
        >
          <Video />
          <span className="ml-4">Record Video Testiomonial</span>
        </button>
      )}
      {wantRecord && <VideoRecorder />}
      {valueText && (
        <button className="bg-slate-900 flex text-white px-2 py-4 rounded-md m-4">
          <Pencil />
          <span className="ml-4">Write Your Review</span>
        </button>
      )}

      <button
        className="bg-black px-2 py-4 w-1/2 text-[20px] text-white"
        onClick={handleReset}
      >
        Reset
      </button>

      <p className="text-neutral-400">Testimonials by RevSpace</p>
    </div>
  );
}

export default Preview;
