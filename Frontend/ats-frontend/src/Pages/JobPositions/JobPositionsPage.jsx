import { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import Topbar from "../../components/layout/Topbar";
import JobStats from "../../components/Jobs/JobStats";
import JobFilters from "../../components/Jobs/JobFilters";
import JobTable from "../../components/jobs/JobTable";

export default function JobPositionsPage() {
     const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
   <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
         <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
                
                <div className="p-3">
                    <JobStats  />
                </div>
                <div className="p-2">
                    <JobFilters />
                </div>
                <div className="p-2">
                    <JobTable />
                </div>
        </div>
    </div>
  );
}