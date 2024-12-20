import MainContent from "../components/Dashboard/MainContent";
import Sidebar from "../components/Dashboard/sidebar";

function Dashboard() {
  return (
    <div
      className="fixed inset-0 min-h-screen"
      //   style={{
      //     background: `linear-gradient(135deg,
      //         #5F48A2 0%,
      //         #19214B 35%,
      //         #013D69 70%,
      //         #01A8A4 100%)`,
      //   }}
      style={{
        background: `linear-gradient(135deg,
            #483580 0%,
            #101734 35%,
            #002A48 70%,
            #00837F 100%)`,
      }}
    >
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
