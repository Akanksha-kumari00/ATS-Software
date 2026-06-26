import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import JobStats from "../../components/jobs/JobStats";
import JobFilters from "../../components/jobs/JobFilters";
import JobTable from "../../components/jobs/JobTable";
import { exportJobs } from "../../utils/exportJobs";
import { getJobs, getJobStats } from "../../services/jobService";

export default function JobPositionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalPositions: 0,
    openPositions: 0,
    onHoldPositions: 0,
    closedPositions: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    fromDate: "",
    toDate: "",
  });
  // Export 
const handleExport = () => {
  console.log("Jobs:", jobs);
  exportJobs(jobs);
};
  // Fetch Jobs
  const fetchJobs = useCallback(async () => {
    try {
      const res = await getJobs(filters);
      setJobs(res.data);
    } catch (err) {
      console.error("Jobs Error :", err);
    }
  }, [filters]);

  // Fetch Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await getJobStats();
      setStats(res.data);
    } catch (err) {
      console.error("Stats Error :", err);
    }
  }, []);
  // Initial Load
  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [fetchJobs, fetchStats]);

  // Reset Filters


  const handleReset = () => {
    setFilters({
      search: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">

      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-4 space-y-4">
          <JobStats stats={stats} />
          <JobFilters
            filters={filters}
            setFilters={setFilters}
            onSearch={fetchJobs}
            onReset={handleReset}
            onExport={handleExport}
         />
          <JobTable jobs={jobs} />
        </div>
      </div>
    </div>
  );
}