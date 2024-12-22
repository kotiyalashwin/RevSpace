import { useNavigate } from "react-router-dom";
import { AnimatedDottedLine } from "../components/Landing/AnimatedDottedLine";
import { Footer } from "../components/Landing/Footer";
import { PricingPlans } from "../components/Landing/PricingPlans";
import { useRef } from "react";

function Landing() {
  const homeRef = useRef(null);
  const productRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToSection = (sectionRef: any) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <div className="bg-[#f1f1f1] h-full font-default ">
      <header className="sticky top-0 hover:backdrop-blur-none hover:bg-white backdrop-blur-sm border-b-2  border-slate-500 flex justify-between items-center p-2 transition-all duration-75 ease-in-out z-50">
        <div className="border-r-2 border-slate-500 flex items-center justify-center w-[20%] p-2 tracking-wide text-2xl">
          <img src="logo.png" alt="" className="w-[5rem] h-[5rem]" />
          <p>RevSpace</p>
        </div>
        <div className="w-[45%]">
          <ul className="flex justify-evenly items-center">
            <li>
              <button
                onClick={() => {
                  scrollToSection(homeRef);
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(productRef)}>
                Product
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(pricingRef)}>
                Pricing
              </button>
            </li>
          </ul>
        </div>
        <div className="border-l-2 border-slate-500">
          <button className="btn-base" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-base" onClick={() => navigate("/signup")}>
            SignUp
          </button>
        </div>
      </header>

      <section
        ref={homeRef}
        className="px-4 py-2 flex flex-col justify-start items-center h-screen"
      >
        <div className="h-full flex flex-col w-full  items-center">
          <div className=" h-[70%] mt-6 p-4 w-full flex flex-col justify-center items-center">
            <div className="bg-white flex px-6 py-8 items-center justify-between shadow-2xl rounded-2xl  w-full">
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
                    className="btn-base"
                    onClick={() => navigate("/signup")}
                  >
                    Get Started
                  </button>
                  <button className="btn-base bg-white text-neutral-600 border-2">
                    Learn More
                  </button>
                </div>
              </div>
              <div>image</div>
            </div>
          </div>
          <div className="border-t-4 border-black/50 h-[20px] w-[75%] mt-6"></div>
        </div>
      </section>

      <section
        ref={productRef}
        className="px-4 py-2 flex flex-col  items-center h-[150vh]"
      >
        <div className=" h-full p-4 w-full flex flex-col gap-6  items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-8xl break-words font-semibold w-[80%] text-center">
              Writing code for testimonials? Well no more!!
            </h1>
            <p className="text-center mt-5 text-xl text-neutral-600 ">
              Simple copy paste code snippets to integrate testimonials on your
              websites
            </p>
          </div>

          <div className="w-full h-full grid  grid-rows-3">
            <div className="w-full flex justify-center  p-4 items-center  ">
              <div className="bg-white rounded-xl shadow-xl h-full w-[35%]">
                Create Review Forms
              </div>
              <div className="w-[40%]">
                <AnimatedDottedLine direction="right" />
                {/* <AnimatedDottedLine direction="down" /> */}
              </div>
            </div>
            <div className="flex p-4 items-center justify-center ">
              <div>
                <AnimatedDottedLine direction="right" />
              </div>
              <div className="bg-white rounded-xl shadow-xl h-full w-[35%]"></div>
            </div>
            <div className="flex p-4 items-center justify-center ">
              <div className="bg-white rounded-xl shadow-xl h-full w-[35%]"></div>
              <div>
                <AnimatedDottedLine />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-4 border-black/50 h-[20px] w-[75%] mt-6"></div>
      </section>

      <section ref={pricingRef} className="min-h-screen">
        <PricingPlans />
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
