import {
  BellRing,
  CircleUserRound,
  GripHorizontal,
  Pencil,
  UserCircle,
  Video,
} from "lucide-react";

import StatBox from "./StatBox";
import SpaceBox from "./SpaceBox";
import { useState } from "react";
import Input from "./Input";
import DynamicInputCards from "./DynamicInputCards";
import YesNoSlider from "./YesNoSlider";
import Preview from "./MainBox/Preview";

function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="ml-44 md:ml-72">
      <header className="h-16 flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome back, User!</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg  text-white hover:bg-black/30 transition-all ease-in">
            <BellRing />
          </button>
          <div className="w-10 h-10 rounded-full hover:bg-black/30 transition-all ease-in flex items-center justify-center text-white">
            <CircleUserRound />
          </div>
        </div>
      </header>

      <StatBox />
      <SpaceBox setIsOpen={setIsOpen} />
      {isOpen && <SpaceForm setIsOpen={setIsOpen} />}
    </div>
  );
}

type SpaceFormProps = {
  setIsOpen: (v: boolean) => void;
};

const SpaceForm = ({ setIsOpen }: SpaceFormProps) => {
  const [header, setHeader] = useState<string>("Title for Space");
  const [message, setMessage] = useState<string>("A message for your users");
  const [spaceName, setSpaceName] = useState<string>("");
  const [valueVideo, setValueVideo] = useState(false);
  const [valueText, setValueText] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null); // State to store the preview URL
  const [wantImage, setWantImage] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string); // Set the preview in state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto h-screen">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
        {/* Modal */}
        <div
          className="relativerounded-lg shadow-xl w-full p-6"
          style={{
            backgroundColor: "rgba(95, 72, 162, 0.15)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(1, 168, 164, 0.1)",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col  h-full items-center space-y-4 md:space-x-4 md:flex-row w-full justify-around ">
            {/* preview */}
            {/* <div className="w-full md:w-[70%] h-full md:min-h-[60vh] bg-white p-2 flex flex-col  items-center justify-evenly md:justify-normal rounded-lg">
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
              {valueVideo && (
                <button className="bg-blue-600 flex text-white px-2 py-4 rounded-md m-4">
                  <Video />
                  <span className="ml-4">Record Video Testiomonial</span>
                </button>
              )}
              {valueText && (
                <button className="bg-slate-900 flex text-white px-2 py-4 rounded-md m-4">
                  <Pencil />
                  <span className="ml-4">Write Your Review</span>
                </button>
              )}

              <p className="text-neutral-400">Testimonials by RevSpace</p>
            </div> */}
            <Preview
              preview={preview}
              wantImage={wantImage}
              cards={cards}
              valueVideo={valueVideo}
              valueText={valueText}
              header={header}
              message={message}
            />

            {/* form */}
            <div className="bg-white w-full rounded-lg  flex flex-col justify-center p-4">
              <header className="text-center">
                <h2 className="text-lg md:text-3xl  font-semibold text-black">
                  Create New Space
                </h2>
                <p className="text-neutral-600">
                  All you want.Anything you want.
                </p>
              </header>

              <form className="p-8">
                <Input
                  label="Space Name"
                  placeholder=""
                  message="Your URL: revspace.io/space-name"
                  onChange={(e) => setSpaceName(e.target.value)}
                />

                <Input
                  label="Title"
                  placeholder="Title to your space"
                  message=""
                  onChange={(e) => setHeader(e.target.value)}
                />

                <Input
                  label="Message:"
                  placeholder="message for visitors"
                  message=""
                  onChange={(e) => setMessage(e.target.value)}
                />

                <div className="flex items-center">
                  <p> Show Thumbnail For Testimonial</p>
                  <YesNoSlider setValue={setWantImage} value={wantImage} />
                </div>

                {wantImage && (
                  <div>
                    <input type="file" onChange={handleImageUpload} />
                  </div>
                )}

                <div className="font-semibold">
                  <label htmlFor="">Questions For User:</label>
                  <DynamicInputCards cards={cards} setCards={setCards} />
                </div>

                <div className="mt-4 mb-4 text-sm md:text-lg flex flex-col justify-evenly">
                  <div className="flex   items-center">
                    <p>a) Want to Allow Video Testimonial?</p>
                    <YesNoSlider setValue={setValueVideo} value={valueVideo} />
                  </div>
                  <div className="flex items-center">
                    <p> b) Want to Allow Textual Testimonial?</p>
                    <YesNoSlider setValue={setValueText} value={valueText} />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm  font-medium text-white  bg-black/30 hover:bg-black rounded-md focus:outline-none "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#01A8A4] border border-transparent rounded-md hover:bg-[#00837F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
