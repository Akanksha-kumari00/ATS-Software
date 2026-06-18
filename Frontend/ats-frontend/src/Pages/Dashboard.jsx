/*import { useEffect, useState } from "react";
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
  useEffect(() => {

  const loadDashboard = async () => {

    try {

      const data = await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }

  };

  loadDashboard();

}, []);

  return (

<div className="flex h-screen overflow-hidden bg-[#f5f7fb]">

  <Sidebar />

    <div className="flex-1 overflow-hidden">
        <Topbar />

        <StatsCards stats={stats} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">

  <div className="lg:col-span-2">

    <RecruitmentPipeline />

  </div>

  <div  className="lg:col-span-1"
  style={{ minWidth: "380px" }}>

    <HospitalWiseHiring />

  </div>

</div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">

      <RecentApplications />

      <UpcomingInterviews />

    </div>

  

  </div>

</div>

);
}

export default Dashboard;*/
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

  const [sidebarOpen, setSidebarOpen] = useState(true);

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

      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="flex-1 overflow-y-auto">

        <Topbar

          sidebarOpen={sidebarOpen}

          setSidebarOpen={setSidebarOpen}

        />

        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">

          <div className="lg:col-span-2">

            <RecruitmentPipeline />

          </div>

          <div

            className="lg:col-span-1"

            style={{ minWidth: "380px" }}

          >

            <HospitalWiseHiring />

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">

          <RecentApplications />

          <UpcomingInterviews />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;