import MainContent from "../components/Dashboard/MainContent";
import MobSideBar from "../components/Dashboard/MobSidebar";
import Sidebar from "../components/Dashboard/sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import Spaces from "./Spaces";
import useSession from "../hooks/session";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PageLoader } from "@/components/ui/loader";

function Dashboard() {
  const [current, setCurrent] = useState("dashboard");
  const [sidebar, setSideBar] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <PageLoader text="Loading workspace" />;
  }

  if (!isAuthenticated) {
    toast.error("Not Authenticated");
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Mobile header */}
      <header className="md:hidden h-14 px-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSideBar(true)}
            className="text-fg-muted hover:text-fg transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-fg flex items-center justify-center">
              <span className="text-bg text-xs font-bold">R</span>
            </div>
            <span className="font-medium">RevSpace</span>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebar && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSideBar(false)}
            />
            <motion.div
              key="drawer"
              className="fixed left-0 top-0 z-50 md:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            >
              <MobSideBar current={current} setCurrent={setCurrent} setSideBar={setSideBar} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar current={current} setCurrent={setCurrent} />
      </div>

      {/* Main content */}
      <main className="md:ml-60 min-h-screen">
        {current === "dashboard" && <MainContent />}
        {current === "spaces" && <Spaces />}
      </main>
    </div>
  );
}

export default Dashboard;
