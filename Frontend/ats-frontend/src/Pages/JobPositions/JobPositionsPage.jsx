import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import Pagination from "../../components/common/Pagination";
import JobStats from "../../components/jobs/JobStats";
import JobFilters from "../../components/jobs/JobFilters";
import JobTable from "../../components/jobs/JobTable";
import { exportJobs } from "../../utils/exportJobs";
import ViewJobModal from "../../components/Jobs/ViewJobModal";
import { getJobs, getJobStats , deleteJob, updateJob,createJob,getHospitals,} from "../../services/jobService";
import JobFormModal from "../../components/Jobs/JobFormModal";
export default function JobPositionsPage() {
const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
const [selectedJob, setSelectedJob] = useState(null);
const [viewOpen, setViewOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);
const [hospitals, setHospitals] = useState([]);
const [addOpen, setAddOpen] = useState(false);
const [jobs, setJobs] = useState([]);
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [totalPages, setTotalPages] = useState(1);
const [totalRecords, setTotalRecords] = useState(0);

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
  exportJobs(jobs);
};

// ================= Fetch Jobs =================
const fetchJobs = useCallback(async () => {
  try {
    const res = await getJobs({
      ...filters,
      page,
      limit,
    });

    setJobs(res.data.data);
    setTotalPages(res.data.totalPages);
    setTotalRecords(res.data.totalRecords);
  } catch (err) {
    console.error("Jobs Error:", err);
  }
}, [filters, page, limit]);

// ================= Fetch Stats =================
const fetchStats = useCallback(async () => {
  try {
    const res = await getJobStats();
    setStats(res.data);
  } catch (err) {
    console.error("Stats Error:", err);
  }
}, []);
// ================= Fetch Hospitals =================
const fetchHospitals = async () => {
  try {
    const res = await getHospitals();
    
    setHospitals(res.data.hospitals); 
  } catch (err) {
    console.log(err);
  }
};

// ================= Load Data =================
useEffect(() => {
  fetchJobs();
  fetchStats();
  fetchHospitals();
}, [fetchJobs, fetchStats]);

// ================= Reset Filters =================
const handleReset = () => {
  setFilters({
    search: "",
    fromDate: "",
    toDate: "",
  });

  setPage(1);
};

// ================= View =================
const handleView = (job) => {
  setSelectedJob(job);
  setViewOpen(true);
};

// ================= Edit =================
const handleEdit = (job) => {
  setSelectedJob(job);
  setEditOpen(true);
};

// ================= Delete =================
const handleDelete = async (id) => {
  const ok = window.confirm(
    "Are you sure you want to delete this Job?"
  );

  if (!ok) return;
  try {
    await deleteJob(id);
    fetchJobs();
    fetchStats();
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                <div className="bg-white rounded-xl shadow">

                  <JobTable
                      jobs={jobs}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                  />

                  <Pagination
                      page={page}
                      totalPages={totalPages}
                      totalRecords={totalRecords}
                      limit={limit}
                      onPageChange={setPage}
                  />

              </div>
                <ViewJobModal
                open={viewOpen}
                onClose={() => setViewOpen(false)}
                  job={selectedJob}
                />
              <JobFormModal
                open={addOpen}
                mode="add"
                 hospitals={hospitals}
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
                       hospitals={hospitals}
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