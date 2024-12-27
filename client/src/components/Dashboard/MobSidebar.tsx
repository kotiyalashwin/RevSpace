import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";
import { LogOut, X } from "lucide-react";

type MobSideBarProps = {
  current: string;
  setCurrent: (arg: string) => void;
  setSideBar: (arg: boolean) => void;
};

const MobSideBar = ({ current, setCurrent, setSideBar }: MobSideBarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/logout",
      null,
      {
        withCredentials: true,
      }
    );

    const data = await response.data;
    // @ts-ignore
    toast.success(data.message);
    navigate("/");
  };

  return (
    <div className=" w-40 h-[50%] flex flex-col space-y-8 p-8">
      <motion.div className="flex  justify-center" whileHover={{ rotate: 90 }}>
        <button onClick={() => setSideBar(false)}>
          <X size={40} />
        </button>
      </motion.div>
      <nav className="space-y-8 flex flex-col items-center">
        <button
          onClick={() => {
            setCurrent("dashboard");
            setSideBar(false);
          }}
          className={`${
            current === "dashboard"
              ? "text-white bg-black"
              : "bg-white  hover:bg-black hover:text-white"
          } flex text-lg lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all  `}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            setCurrent("spaces");
            setSideBar(false);
          }}
          className={`${
            current === "spaces"
              ? "bg-black text-white"
              : "hover:text-white hover:bg-black"
          } flex text-lg lg:text-lg items-center space-x-3 py-3 px-6 rounded-lg transition-all   `}
        >
          Spaces
        </button>
        <button
          onClick={() => {
            setCurrent("testimonials");
            setSideBar(false);
          }}
          className={`${
            current === "testimonials"
              ? "bg-black text-white"
              : "hover:text-white hover:bg-black"
          } flex text-lg lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all `}
        >
          Testimonials
        </button>
        <button
          onClick={handleLogout}
          className={`flex text-lg lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all hover:text-white hover:bg-black`}
        >
          LogOut
          <div className="ml-2">
            <LogOut />
          </div>
        </button>
      </nav>
    </div>
  );
};

export default MobSideBar;
