import { useNavigate } from "react-router-dom";

import { Footer } from "../components/Landing/Footer";
import { PricingPlans } from "../components/Landing/PricingPlans";
import { useRef } from "react";
import * as motion from "motion/react-client";
import Section1 from "../components/Landing/Section1";
import Section2 from "../components/Landing/Section2";

function Landing() {
  const homeRef = useRef<HTMLDivElement>(null);
  const productRef = useRef(null);
  const pricingRef = useRef(null);
  const scrollToSection = (sectionRef: any) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <motion.div className=" bg-[#f1f1f1] font-default flex flex-col justify-evenly ">
      <motion.header className=" sticky top-0   backdrop-blur-sm border-b-2  border-slate-500 flex justify-between items-center p-2 transition-all duration-75 ease-in-out z-50">
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
      </motion.header>
      <Section1 ref={homeRef} />

      <Section2 ref={productRef} />

      <section ref={pricingRef} className="min-h-screen  pt-24">
        <PricingPlans />
      </section>

      <Footer />
    </motion.div>
  );
}

export default Landing;
