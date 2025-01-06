import axios from "axios";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

type SidebarProps = {
  current: string;
  setCurrent: (arg: string) => void;
};

function Sidebar({ current, setCurrent }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url =
      "https://ec2-13-48-42-141.eu-north-1.compute.amazonaws.com:8080/api/v1/user/logout";
    const response = await axios.post(url, null, {
      withCredentials: true,
    });

    const data = await response.data;
    // @ts-ignore
    toast.success(data.message);
    navigate("/");
  };
  return (
    <motion.div
      className="h-screen w-32 md:w-60 fixed left-0 border-r-2 border-black  top-0  transition-all ease-in rounded-sm  "
      //   style={{
      //     backdropFilter: "blur(12px)",
      //   }}
    >
      <div className="p-4">
        <div className="text-black font-bold tracking-wider text-xl md:text-4xl mb-10">
          RevSpace
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => setCurrent("dashboard")}
            className={`${
              current === "dashboard"
                ? "text-white bg-black"
                : "bg-white  hover:bg-black hover:text-white"
            } flex text-lg lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all  `}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrent("spaces")}
            className={`${
              current === "spaces"
                ? "bg-black text-white"
                : "hover:text-white hover:bg-black"
            } flex text-lg lg:text-lg items-center space-x-3 py-3 px-6 rounded-lg transition-all   `}
          >
            Spaces
          </button>
          <button
            onClick={() => setCurrent("testimonials")}
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
    </motion.div>
  );
}

export default Sidebar;
