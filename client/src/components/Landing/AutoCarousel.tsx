import { useEffect, useState } from "react";
import * as motion from "motion/react-client";

const AutoCarousel = () => {
  const [currIndex, setCurrIndex] = useState(0);

  const images = [
    { tag: "Create user form", src: "1.png" },
    { tag: "Gather testimonial", src: "2.png" },
    { tag: "Get EmbedCode </>", src: "3.png" },
  ];

  useEffect(() => {
    const changeIndex = setInterval(() => {
      if (currIndex === 2) {
        setCurrIndex(0);
      } else {
        setCurrIndex((c) => (c + 1) % images.length);
      }
      console.log(currIndex);
    }, 5000);
    return () => clearInterval(changeIndex);
  }, []);

  return (
    <motion.div
      key={currIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="  w-full  flex flex-col justify-center items-center"
    >
      <p className="text-xl p-4 bg-black  text-white backdrop-blur-md  capitalize mb-4 shadow-lg rounded-xl">
        {images[currIndex].tag}
      </p>
      <img src={images[currIndex].src} alt="" />
    </motion.div>
  );
};

export default AutoCarousel;
