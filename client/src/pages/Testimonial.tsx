import { useEffect, useState } from "react";
import Preview from "../components/MainBox/Preview";

function Testimonial() {
  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [spaceName, setSpaceName] = useState<string>("");
  const [valueVideo, setValueVideo] = useState<boolean>(false);
  const [valueText, setValueText] = useState<boolean>(false);
  const [cards, setCards] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [wantImage, setWantImage] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve values from localStorage and set them to state
    const storedHeader = localStorage.getItem("header");
    const storedMessage = localStorage.getItem("message");
    const storedSpaceName = localStorage.getItem("spaceName");
    const storedValueVideo = localStorage.getItem("valueVideo");
    const storedValueText = localStorage.getItem("valueText");
    const storedCards = localStorage.getItem("cards");
    const storedPreview = localStorage.getItem("uploadedImage");
    const storedWant = localStorage.getItem("wantImage");

    if (storedHeader) setHeader(storedHeader); // String doesn't need parsing
    if (storedMessage) setMessage(storedMessage);
    if (storedSpaceName) setSpaceName(storedSpaceName);
    if (storedValueVideo) setValueVideo(JSON.parse(storedValueVideo)); // Parse boolean
    if (storedValueText) setValueText(JSON.parse(storedValueText)); // Parse boolean
    if (storedCards) setCards(JSON.parse(storedCards)); // Parse array
    if (storedPreview) setPreview(storedPreview);
    if (storedWant) setWantImage(JSON.parse(storedWant));
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="flex flex-col h-screen  items-center p-4">
      <h1 className="text-7xl">{spaceName}</h1>
      <div className="w-full flex justify-center  h-[60%]">
        <Preview
          preview={preview}
          wantImage={wantImage}
          cards={cards}
          valueVideo={valueVideo}
          valueText={valueText}
          header={header}
          message={message}
        />
      </div>
    </div>
  );
}

export default Testimonial;
