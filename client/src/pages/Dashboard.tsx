import MainContent from "../components/Dashboard/MainContent";
import MobSideBar from "../components/Dashboard/MobSidebar";
import Sidebar from "../components/Dashboard/sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import Spaces from "./Spaces";
import TestimonialVideos from "./TestimonialVideos";

function Dashboard() {
  const [current, setCurrent] = useState("dashboard");
  const [sidebar, setSideBar] = useState(false);

  return (
    <div className=" min-h-screen md:grid md:grid-cols-[250px_1fr] font-default p-4">
      {/* MOBILE-START */}
      <header className="flex md:hidden items-center space-x-4 h-16">
        <div>
          <button onClick={() => setSideBar(true)} className="align-middle">
            <Menu size={40} />
          </button>
        </div>
        <div className="text-3xl tracking-wider">RevSpace</div>
      </header>

      {sidebar && (
        <div className="absolute top-0 md:hidden z-10 w-screen h-screen bg-black/50 transition-all ease-in-out"></div>
      )}
      {sidebar && (
        <AnimatePresence>
          <motion.div
            key={1}
            className=" absolute md:hidden  top-0 bg-white shadow-xl backdrop-blur-sm h-screen z-10"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            transition={{ duration: 0.25 }}
          >
            <MobSideBar
              current={current}
              setCurrent={setCurrent}
              setSideBar={setSideBar}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* MOBILE-END */}

      <div className="hidden md:inline">
        <Sidebar current={current} setCurrent={setCurrent} />
      </div>

      {current === "dashboard" && (
        <div className="w-full ">
          <MainContent />
        </div>
      )}
      {current === "spaces" && <Spaces />}
      {current === "testimonials" && <TestimonialVideos />}
    </div>
  );
}

export default Dashboard;
