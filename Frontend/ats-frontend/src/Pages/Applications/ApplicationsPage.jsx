import { useState, useEffect } from "react";
import {getApplications,deleteApplication,updateApplication}from "../../services/applicationService";
import Sidebar from "../../components/layout/sidebar";
import Topbar from "../../components/layout/Topbar";
import Pagination from "../../components/common/Pagination";
import ApplicationFilters from "../../components/Applications/ApplicationFilters";
import ApplicationStats from "../../components/Applications/ApplicationStats";
import ApplicationTable from "../../components/Applications/ApplicationsTable";
import { exportApplications } from "../../utils/exportApplications";
import ViewApplicationModal from "../../components/Applications/ViewApplicationModal";
import EditApplicationModal from "../../components/Applications/EditApplicationModal";
function ApplicationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [filters, setFilters] = useState({
  search: "",
  dateRange: "",
  hospital: "",
  status: "",
});
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
const [limit] = useState(10);
  useEffect(() => {
  loadApplications();
}, []);
     const loadApplications = async () => {
        try {
          const data = await getApplications();
          setApplications(data);
        }
        catch(error){
          console.log(error);
        }
      };
        const handleDelete = async (id) => {
        const confirmDelete =
        window.confirm(
        "Delete this application?"
        );
        if(!confirmDelete) return;
        try{
        await deleteApplication(id);
        loadApplications();
        }
        catch(error){
        console.log(error);
        }
        };
        const handleView = (item) => {
          setSelectedApplication(item);
          setViewOpen(true);
        };
        const handleEdit = (item) => {
          setSelectedApplication(item);
          setEditOpen(true)
        };
        const handleSave = async (data) => {
          try {
            await updateApplication(
              data.id,
              data
            );
            await loadApplications();
            setEditOpen(false);
          }
          catch(error){
            console.log(error);
          }
        };

     const handleExport = () => {
      exportApplications(
    filteredApplications.map((app) => ({
      name: app.candidate_name,
      email: app.email,
      phone: app.mobile,
      hospital: app.hospital_name,
      date: app.cv_forward_date
        ? new Date(app.cv_forward_date).toLocaleDateString("en-GB")
        : "",
      status: app.status,
      recruiter: app.recruiter_name,
    }))
  );
};
    const filteredApplications = applications.filter((app) => {
    const search = filters.search.toLowerCase();
    const matchSearch =
        app.candidate_name?.toLowerCase().includes(search) ||
        app.email?.toLowerCase().includes(search) ||
        app.mobile?.includes(search);
    const matchHospital = !filters.hospital ||
      app.hospital_name === filters.hospital;
    const matchStatus = !filters.status ||
        app.status === filters.status;
    let matchDate = true;
    if (filters.dateRange) {
        const today = new Date();
        const appDate = new Date(app.cv_forward_date);
        if (filters.dateRange === "today") {
            matchDate =
                appDate.toDateString() === today.toDateString();
        }
        if (filters.dateRange === "week") {
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            matchDate = appDate >= weekAgo;
        }
        if (filters.dateRange === "month") {
            matchDate =
                appDate.getMonth() === today.getMonth() &&
                appDate.getFullYear() === today.getFullYear();
        }
    }

    return (
        matchSearch &&
        matchHospital &&
        matchStatus &&
        matchDate
    );
});
const totalRecords = filteredApplications.length;
const totalPages = Math.ceil(totalRecords / limit);
const paginatedApplications = filteredApplications.slice(
  (page - 1) * limit,
  page * limit
);
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-3 space-y-5">
          <ApplicationFilters
            filters={filters}
            setFilters={setFilters}
            hospitals={[...new Set(applications.map(a => a.hospital_name))]}
            onExport={handleExport}
          />
          <ApplicationStats />
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <ApplicationTable
              applications={paginatedApplications}
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
              <ViewApplicationModal
                open={viewOpen}
                onClose={() => setViewOpen(false)}
                application={selectedApplication}
              />
                <EditApplicationModal
                  open={editOpen}
                  onClose={() => setEditOpen(false)}
                  application={selectedApplication}
                  onSave={handleSave}
                />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsPage;
