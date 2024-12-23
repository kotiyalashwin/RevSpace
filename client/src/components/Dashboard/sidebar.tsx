import axios from "axios";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Sidebar() {
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
    <div
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
            className={`flex text-xs lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all bg-black text-white`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/testimonials")}
            className={`flex text-xs lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all hover:text-white hover:bg-black`}
          >
            Testimonials
          </button>
          <button
            onClick={handleLogout}
            className={`flex text-xs lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all hover:text-white hover:bg-black`}
          >
            LogOut
            <div className="ml-2">
              <LogOut />
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
