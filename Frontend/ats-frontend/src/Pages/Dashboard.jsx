
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import StatsCards from "../components/dashboard/StatsCards";
import RecruitmentPipeline from "../components/dashboard/RecruitmentPipeline";
import RecentApplications from "../components/dashboard/RecentApplications";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";
import HospitalWiseHiring from "../components/dashboard/HospitalWiseHiring";
import { getDashboardStats } from "../services/dashboardService";
function Dashboard() {

  const [stats, setStats] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);

  useEffect(() => {

    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      }
      catch (error) {
        console.log(error);
      }
    };
    loadDashboard();
  }, []);

  return (

    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 overflow-y-auto">

        <Topbar

          sidebarOpen={sidebarOpen}

          setSidebarOpen={setSidebarOpen}

        />
          <div className="p-2 mt=3">
                <StatsCards stats={stats} />

          </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

          <div className="lg:col-span-2">

            <RecruitmentPipeline />

          </div>

          <div

            className="lg:col-span-1 min-w-0"

          >

            <HospitalWiseHiring />

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">

          <RecentApplications />

          <UpcomingInterviews />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;