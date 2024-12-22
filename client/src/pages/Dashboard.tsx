import MainContent from "../components/Dashboard/MainContent";
import Sidebar from "../components/Dashboard/sidebar";

function Dashboard() {
  return (
    <div className="fixed inset-0 min-h-screen font-default">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
