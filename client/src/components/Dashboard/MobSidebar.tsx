import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, FolderOpen, MessageSquareQuote, LogOut, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVER = import.meta.env.VITE_SERVER;

type MobSideBarProps = {
  current: string;
  setCurrent: (arg: string) => void;
  setSideBar: (arg: boolean) => void;
};

const MobSideBar = ({ current, setCurrent, setSideBar }: MobSideBarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post(`${SERVER}/api/v1/user/logout`, null, {
      withCredentials: true,
    });
    // @ts-ignore
    toast.success(response.data.message);
    navigate("/");
  };

  const navItem = (
    key: string,
    label: string,
    Icon: LucideIcon,
    onClick: () => void,
    isActive: boolean
  ) => (
    <button
      key={key}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 h-10 text-sm transition-colors duration-150",
        isActive ? "bg-bg-elevated text-fg" : "text-fg-muted hover:bg-bg-elevated hover:text-fg"
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="w-64 h-screen bg-bg border-r border-border flex flex-col">
      <div className="h-16 px-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-fg flex items-center justify-center">
            <span className="text-bg text-xs font-bold">R</span>
          </div>
          <span className="font-medium text-fg">RevSpace</span>
        </div>
        <button
          onClick={() => setSideBar(false)}
          className="text-fg-muted hover:text-fg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pt-5 pb-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
          Workspace
        </p>
      </div>

      <nav className="px-2 flex flex-col gap-0.5 flex-1">
        {navItem("dashboard", "Overview", LayoutGrid, () => { setCurrent("dashboard"); setSideBar(false); }, current === "dashboard")}
        {navItem("spaces", "Spaces", FolderOpen, () => { setCurrent("spaces"); setSideBar(false); }, current === "spaces")}
        {navItem("testimonials", "Testimonials", MessageSquareQuote, () => { setSideBar(false); navigate("/testimonials"); }, false)}
      </nav>

      <div className="border-t border-border p-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 h-10 text-sm text-fg-muted hover:bg-bg-elevated hover:text-fg transition-colors"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default MobSideBar;
