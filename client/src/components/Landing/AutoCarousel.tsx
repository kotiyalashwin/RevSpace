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
      transition={{ duration: 3 }}
      className="   w-full h-full overflow-hidden  flex flex-col  items-center"
    >
      <p className="text-sm text-center p-2 bg-black  text-white backdrop-blur-md  capitalize mb-4 shadow-lg rounded-xl transition-all ease-out">
        {images[currIndex].tag}
      </p>
      <div>
        <img src={images[currIndex].src} height={75} alt="" />
      </div>
    </motion.div>
  );
};

export default AutoCarousel;
