import axios from "axios";
import { LayoutGrid, FolderOpen, MessageSquareQuote, LogOut, type LucideIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const SERVER = import.meta.env.VITE_SERVER;

type SidebarProps = {
  current: string;
  setCurrent: (arg: string) => void;
};

function Sidebar({ current, setCurrent }: SidebarProps) {
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
        "group flex w-full items-center gap-3 rounded-md px-2.5 h-9 text-sm transition-colors duration-150",
        isActive
          ? "bg-bg-elevated text-fg"
          : "text-fg-muted hover:bg-bg-elevated hover:text-fg"
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="h-screen w-60 fixed left-0 top-0 border-r border-border bg-bg flex flex-col">
      {/* Brand */}
      <div className="px-4 h-16 flex items-center border-b border-border">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-fg flex items-center justify-center">
            <span className="text-bg text-xs font-bold">R</span>
          </div>
          <span className="text-fg font-medium tracking-tight">RevSpace</span>
        </div>
      </div>

      {/* Workspace label */}
      <div className="px-4 pt-5 pb-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
          Workspace
        </p>
      </div>

      {/* Nav */}
      <nav className="px-2 flex flex-col gap-0.5 flex-1">
        {navItem("dashboard", "Overview", LayoutGrid, () => setCurrent("dashboard"), current === "dashboard")}
        {navItem("spaces", "Spaces", FolderOpen, () => setCurrent("spaces"), current === "spaces")}
        {navItem("testimonials", "Testimonials", MessageSquareQuote, () => navigate("/testimonials"), false)}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-2.5 h-9 text-sm text-fg-muted hover:bg-bg-elevated hover:text-fg transition-colors duration-150"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
