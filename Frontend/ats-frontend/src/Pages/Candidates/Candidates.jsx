import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import StatsCards from "../../components/dashboard/StatsCards";
import { getDashboardStats } from "../../services/dashboardService";

function Candidates() {

  const [stats, setStats] = useState(null);

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

      <Sidebar />

      {/* Main Content */}

      <div className="flex-1 overflow-hidden">

        

        <Topbar />

      

        <StatsCards stats={stats} />

        <div className="p-4">

          <div className="grid grid-cols-12 gap-4">


            <div className="col-span-2">

              <div className="bg-white rounded-xl p-4 shadow">

                Filters

              </div>

            </div>

          
            <div className="col-span-7">

              <div className="bg-white rounded-xl p-4 shadow">

                Candidate Table

              </div>

            </div>

         

            <div className="col-span-3">

              <div className="bg-white rounded-xl p-4 shadow">

                Candidate Details

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Candidates;