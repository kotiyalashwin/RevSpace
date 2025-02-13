import { forwardRef } from "react";
import * as motion from "motion/react-client";
import { AnimatedDottedLine } from "./AnimatedDottedLine";
import { SectionProps } from "./Section1";
import { useScroll, useTransform } from "framer-motion";
import AutoCarousel from "./AutoCarousel";

// @ts-ignore
const Section2 = forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  const { scrollY } = useScroll();

  const x1 = useTransform(scrollY, [0, 1300], [0, 250]);
  const x2 = useTransform(scrollY, [0, 1500], [0, -250]);
  const x3 = useTransform(scrollY, [0, 1700], [0, 250]);
  // console.log(scrollY);

  return (
    <section
      ref={ref}
      className="px-4   pt-24 flex flex-col  items-center min-h-screen"
    >
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className=" h-full p-4 w-full flex flex-col gap-6  items-center"
      >
        <div className="flex flex-col justify-center items-center ">
          <h1 className="md:text-8xl text-6xl break-words font-semibold sm:w-[80%] text-center">
            Writing code for testimonials? Well no more!!
          </h1>
          <p className="text-center mt-5 text-xl text-neutral-600 ">
            Simple copy paste code snippets to integrate testimonials on your
            websites
          </p>
        </div>

        <motion.div
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          className="border-2 border-black/50 rounded-xl overflow-hidden shadow-lg py-8 px-4 h-[40vh] sm:hidden "
        >
          <AutoCarousel />
        </motion.div>

        <div className="w-full h-full sm:grid  grid-rows-3 items-center hidden">
          <div className="w-full  flex   sm:justify-center  p-4 items-center  ">
            {/* @ts-ignore */}
            <motion.div
              className="bg-white rounded-xl shadow-xl h-full gap-4 w-[35%] flex flex-col justify-center z-40"
              //   whileHover={{ x: 100 }}
              transition={{ duration: 5 }}
              // @ts-ignore
              style={{ x: x1 }}
            >
              <p className="text-center text-xl font-semibold">
                Create Review Forms
              </p>
              <div className="p-4">
                <img src="1.png" alt="" />
              </div>
            </motion.div>
            <div className="w-[40%] ">
              <AnimatedDottedLine direction="right" />
              {/* <AnimatedDottedLine direction="down" /> */}
            </div>
          </div>
          <div className="w-full flex p-4 items-center sm:justify-center ">
            <div>
              <AnimatedDottedLine direction="right" />
            </div>

            <motion.div
              //   whileHover={{ x: -100 }}
              transition={{ duration: 3 }}
              // @ts-ignore
              style={{ x: x2 }}
              className="bg-white rounded-xl shadow-xl h-full gap-4 w-[35%] flex flex-col justify-center"
            >
              <p className="text-center text-xl font-semibold">
                Gather Testimonials
              </p>
              <div>
                <img src="2.png" alt="" />
              </div>
            </motion.div>
          </div>
          <div className="w-full flex p-4 items-center sm:justify-center ">
            <motion.div
              //   whileHover={{ x: 100 }}
              transition={{ duration: 3 }}
              // @ts-ignore
              style={{ x: x3 }}
              className="bg-white rounded-xl shadow-xl h-full gap-4 w-[35%] flex flex-col justify-center z-40"
            >
              <p className="text-center text-xl font-semibold">
                {"Get EmbedCode </>"}
              </p>
              <img src="3.png" alt="" />
            </motion.div>
            <div>
              <AnimatedDottedLine />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="border-t-4 border-black/50 h-[20px] w-[75%] mt-6"></div>
    </section>
  );
});

export default Section2;
