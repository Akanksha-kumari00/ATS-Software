import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import JobStats from "../../components/jobs/JobStats";
import JobFilters from "../../components/jobs/JobFilters";
import JobTable from "../../components/jobs/JobTable";
import { exportJobs } from "../../utils/exportJobs";
import ViewJobModal from "../../components/Jobs/ViewJobModal";
import { getJobs, getJobStats , deleteJob, updateJob,createJob, } from "../../services/jobService";
import JobFormModal from "../../components/Jobs/JobFormModal";
export default function JobPositionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
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

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [fetchJobs, fetchStats]);
        const handleReset = () => {
          setFilters({
            search: "",
            fromDate: "",
            toDate: "",
          });
        };
          const handleView = (job) => {
          setSelectedJob(job);
          setViewOpen(true);
          };
         const handleEdit = (job) => {
         setSelectedJob(job);
         setEditOpen(true);
          };
        const handleDelete = async (id) => {
        const ok = window.confirm(
        "Are you sure you want to delete this Job?"
              );
        if (!ok) return;
        try {
          await deleteJob(id);
          fetchJobs();
        } catch (err) {
          console.log(err);
        }
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
                onAdd={() => setAddOpen(true)}
                open={addOpen}
                mode="add"
                onClose={() => setAddOpen(false)}
                onSave={(data) => console.log(data)}
                />
                <JobTable
                    jobs={jobs}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                <ViewJobModal
                open={viewOpen}
                onClose={() => setViewOpen(false)}
                  job={selectedJob}
                />
              <JobFormModal
                open={addOpen}
                mode="add"
                onClose={() => setAddOpen(false)}
                onSave={async (form) => {
                try {
                  await createJob(form);
                  setAddOpen(false);
                  fetchJobs();
                  fetchStats();
                  alert("Job Added Successfully");

                } catch (err) {
                  console.log(err);
                }
              }}
                />
                <JobFormModal
                      open={editOpen}
                      mode="edit"
                      job={selectedJob}
                      onClose={() => setEditOpen(false)}
                      onSave={async (form) => {
                        await updateJob(form.id, form);
                        setEditOpen(false);
                        fetchJobs();
                        fetchStats();
                      }}
                />
        </div>
      </div>
    </div>
  );
}