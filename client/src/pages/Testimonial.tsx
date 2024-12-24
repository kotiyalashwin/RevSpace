import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pencil, UserCircle, Video } from "lucide-react";
import VideoRecorder from "../components/Dashboard/VideoRecorder";

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

  const getSpaceDetials = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/space/${link}/details`,
        {
          withCredentials: true,
        }
      );

      const data = await response.data;

      // @ts-ignore
      if (data.success) {
        // console.log(data);
        // @ts-ignore
        setSpace(data.spaceDetails);
      } else {
        toast.error("Unable to fetch Spaces");
      }
    } catch {
      toast.error("Unable to fetch Spaces");
    }
  };

  useEffect(() => {
    getSpaceDetials();
  }, []);

  const [wantRecord, setWantRecord] = useState(false);
  const [uploader, setUploader] = useState("");

  const handleSubmitTestimonial = async () => {
    const formData = new FormData();
    if (videoBlob) formData.append("video", videoBlob); // Attach the Blob as "video"

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/testimonial/videoupload/${link}/${uploader}`,
        formData,
        { withCredentials: true }
      );

      const data = await response.data;
      // @ts-ignore
      if (data.success) {
        toast.success(`Uploaded SUccessfully`);
      } else {
        toast.error(`unable to uploade`);
      }
    } catch (error) {
      console.error("Error sending Blob to backend:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen  items-center p-4">
      <div className="w-full flex justify-center  h-[60%]">
        {space && (
          <div className="w-full md:w-[70%] h-full md:min-h-[60vh] bg-white p-2 flex flex-col  items-center justify-evenly md:justify-normal rounded-lg">
            <div className="text-cyan-800">
              <UserCircle size={60} />
            </div>
            <header className="text-center w-full">
              <h1 className="text-4xl lg:text-6xl text-neutral-600 font-bold mb-2">
                {space.header}
              </h1>
              <p className="text-sm lg:text-xl text-neutral-500">
                {space.message}
              </p>
            </header>

            {/* {preview && wPantImage && (
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
      )} */}

            {space.questions.length === 0 ? null : (
              <div className="p-4 w-full">
                <header className="text-neutral-600 font-semibold">
                  Try to Answer these Question:-
                </header>
                <div className="bg-gray-200 p-4">
                  {space.questions.map((card, i) => {
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
            <div className="flex">
              {space.wantVideo && !wantRecord && (
                <button
                  className="bg-blue-600 flex text-white px-2 py-4 rounded-md m-4"
                  onClick={() => setWantRecord(true)}
                >
                  <Video />
                  <span className="ml-4">Record Video Testiomonial</span>
                </button>
              )}
              {space.wantText && (
                <button className="bg-blue-600 flex text-white px-2 py-4 rounded-md m-4">
                  <Pencil />
                  <span className="ml-4">Write Your Review</span>
                </button>
              )}
            </div>
            {/* @ts-ignore  */}
            {wantRecord && <VideoRecorder setVideoBlob={setVideoBlob} />}

            <input
              placeholder="Enter your email (required)"
              className="input-base"
              value={uploader}
              onChange={(e) => setUploader(e.target.value)}
            />
            <button className="btn-base" onClick={handleSubmitTestimonial}>
              Submit Testimonial
            </button>
            <p className="text-neutral-400">Testimonials by RevSpace</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testimonial;
