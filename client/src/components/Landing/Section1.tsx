import * as motion from "motion/react-client";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export type SectionProps = React.HTMLAttributes<HTMLElement>;

const Section1 = forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className="px-4 pt-24 flex flex-col justify-center items-center min-h-screen overflow-hidden"
    >
      <div className=" flex flex-col w-full  justify-center items-center">
        <div className=" h-[70%]  p-4 w-full flex flex-col justify-center items-center">
          <div className="bg-white flex px-6 mt-4 py-8 items-center justify-between shadow-2xl rounded-2xl overflow-hidden   w-full">
            <div className="flex flex-col gap-8 w-[75%] ">
              <h1 className="text-left break-words font-semibold font-default text-6xl w-[75%]  ">
                Effortless Testimonial Collections
              </h1>
              <p className="text-black/50 w-xl text-xl w-[50%] break-words">
                Gather heartfelt testimonials, showcase your impact, and build
                trust—all in one seamless platform
              </p>
              <div>
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
              className="border-2 drop-shadow-lg shadow-2xl p-4 rounded-xl "
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
        </div>
        <div className="border-t-4 border-black/50 h-[20px] w-[75%] mt-6"></div>
      </div>
    </section>
  );
});

export default Section1;
