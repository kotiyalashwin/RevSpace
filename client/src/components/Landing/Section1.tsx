import { useScroll, useTransform } from "framer-motion";
import * as motion from "motion/react-client";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export type SectionProps = React.HTMLAttributes<HTMLElement>;

// @ts-ignore
const Section1 = forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [450, 700], [1, 1.5]);

  return (
    <section
      ref={ref}
      className="px-4  flex flex-col h-screen justify-center overflow-hidden"
    >
      <div className=" flex flex-col w-full h-full  justify-center items-center">
        <div className="bg-white flex-col sm:flex sm:flex-row px-6 mt-4 py-8 items-center justify-center sm:justify-between shadow-2xl rounded-2xl overflow-hidden   w-full">
          <div className="flex flex-col gap-8 sm:w-[75%]  justify-center items-center ">
            <h1 className="sm:text-left text-center sm:break-words font-semibold font-default text-5xl  w-full  ">
              Effortless Testimonial Collections
            </h1>
            <div>
              <p className="text-black/50  text-xl w-full sm:break-words sm:w-[50%] sm:text-left">
                Gather heartfelt testimonials, showcase your impact, and build
                trust—all in one seamless platform
              </p>
            </div>
            <div className="w-full space-x-4  flex justify-center sm:justify-start">
              <button
                className="btn-base rounded-lg"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
              <button className="btn-base bg-white text-neutral-600 border-2">
                Learn More
              </button>
            </div>
          </div>

          <motion.div
            className="border-2   sm:hidden drop-shadow-lg shadow-2xl p-4 rounded-xl mt-2 "
            // initial={{ x: 200, opacity: 0 }}

            initial={{
              rotate: -30,
              y: 250,
              opacity: 0,
            }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            // animate={{ x: [150, 0, 0], opacity: [0, 0.5, 1] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <img className="rounded-xl" src="sample.jpg" alt="" />
          </motion.div>

          <motion.div
            className="border-2 hidden sm:block drop-shadow-lg shadow-2xl p-4 rounded-xl mt-2 "
            // initial={{ x: 200, opacity: 0 }}

            initial={{
              rotate: -30,
              y: 250,
              x: 300,
              scale: 1.5,
              opacity: 0,
            }}
            animate={{ y: 100, opacity: 1 }}
            // animate={{ x: [150, 0, 0], opacity: [0, 0.5, 1] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            whileHover={{ rotate: 0, y: 0, x: 0, scale: 1 }}
          >
            <img className="rounded-xl" src="sample.jpg" alt="" />
          </motion.div>
        </div>

        <motion.div
          // @ts-ignore
          style={{ scale: scale }}
          className="border-t-4 border-black/50 h-[20px] w-[75%] mt-6"
        ></motion.div>
      </div>
    </section>
  );
});

export default Section1;
