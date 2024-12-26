import axios from "axios";
import { Cross, Crosshair, LogOut, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

type MobSideBarProps = {
  setSideBar: (arg0: boolean) => void;
};

const MobSideBar = ({ setSideBar }: MobSideBarProps) => {
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
          className={`flex text-lg lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all bg-black text-white`}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/testimonials")}
          className={`flex text-lg lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all hover:text-white hover:bg-black`}
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
