import { BellRing, CircleUserRound } from "lucide-react";

import StatBox from "./StatBox";
import SpaceBox from "./SpaceBox";
import { FormEvent, useEffect, useState } from "react";
import Input from "./Input";
import DynamicInputCards from "./DynamicInputCards";
import YesNoSlider from "./YesNoSlider";
import Preview from "./MainBox/Preview";
import axios from "axios";
import toast from "react-hot-toast";
import useSpaces from "../../hooks/spaces";

interface Space {
  spacename: string;
  description: string;
  link: string;
  testimonials: {
    id: string;
  };
}

function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);

  const { isLoading, spacesData } = useSpaces();
  useEffect(() => {
    if (!isLoading) {
      setSpaces(spacesData);
    }
    console.log(spaces);
  }, [isLoading, spacesData]);

  return (
    <div className=" p-8">
      <header className="h-16 hidden sm:flex items-center justify-between mb-8">
        <h1 className="text-2xl  font-bold text-black">Welcome back, User!</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg  text-black hover:bg-black hover:text-white transition-all ease-in">
            <BellRing />
          </button>
          <div className="w-10 h-10 rounded-full text-black hover:bg-black transition-all ease-in flex items-center justify-center">
            <CircleUserRound />
          </div>
        </div>
      </header>

      {/* @ts-ignore */}
      <StatBox spaces={spaces} />
      <SpaceBox spaces={spaces} setIsOpen={setIsOpen} />

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

  const handleCreateSpace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      spaceName: spaceName,
      description: message,
      spaceMetadata: {
        formFields: {
          header: header,
          message: message,
          wantVideo: valueVideo,
          wantText: valueText,
          questions: cards,
        },
      },
    };

    const url =
      "http://ec2-13-48-42-141.eu-north-1.compute.amazonaws.com:8080/api/v1/space/newspace";

    const respone = await axios.post(url, body, {
      withCredentials: true,
    });

    // @ts-ignore
    const data = await respone.data;
    // @ts-ignore
    if (data.success) {
      // @ts-ignore
      toast.success(`${data.message}`);
    } else {
      // @ts-ignore
      toast.error(`${data.error}`);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setPreview(base64Image); // Set the preview in state
        localStorage.setItem("uploadedImage", base64Image);
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

              <form className="p-8" onSubmit={handleCreateSpace}>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
