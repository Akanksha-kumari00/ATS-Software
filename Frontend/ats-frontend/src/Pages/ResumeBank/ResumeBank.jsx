import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import Pagination from "../../components/common/Pagination";
import ResumeFilters from "../../components/resume/ResumeFilters";
import ResumeBankTable from "../../components/resume/ResumeBankTable";
import { getResumes,deleteResume } from "../../services/resumeService";

export default function ResumeBank() {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
  const [resumes, setResumes] = useState([]);
const [page, setPage] = useState(1);
const [limit] = useState(10);
  const [filters, setFilters] = useState({
    search: "",
    specialization: "",
    uploadDate: "",
  });

  // Load Resume List
  const loadResumes = useCallback(async (currentFilters = filters) => {
    try {
      const data = await getResumes(currentFilters);
      setResumes(data);
    } catch (err) {
      console.log(err);
    }
  }, [filters]);

  // First Load
  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  // Handle Filter Change
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Search
  const handleSearch = async () => {
    await loadResumes();
  };

  // Reset
  const handleReset = async () => {

    const reset = {
      search: "",
      specialization: "",
      uploadDate: "",
    };

    setFilters(reset);
    await loadResumes(reset);
  };
const handleView = (resume) => {
  const file = resume.resume_file.replace(/\\/g, "/");
  window.open(`http://localhost:5000/${file}`, "_blank");
};
const handleDownload = (resume) => {
  const file = resume.resume_file.replace(/\\/g, "/");

  const link = document.createElement("a");
  link.href = `http://localhost:5000/${file}`;
  link.download = file.split("/").pop();

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const handleDelete = async (id) => {
  if (!window.confirm("Delete this resume?")) return;
  try {
    await deleteResume(id);
    loadResumes();
  } catch (err) {
    console.log(err);
  }
};
const totalRecords = resumes.length;

const totalPages = Math.ceil(totalRecords / limit);

const paginatedResumes = resumes.slice(
  (page - 1) * limit,
  page * limit
);

  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
        />
        <div className="p-6">
          <ResumeFilters
            search={filters.search}
            specialization={filters.specialization}
            uploadDate={filters.uploadDate}
            onChange={handleChange}
            onSearch={handleSearch}
            onReset={handleReset}
          />
          <div className="bg-white rounded-xl shadow p-4">
           <ResumeBankTable
            resumes={paginatedResumes}
            onView={handleView}
            onDownload={handleDownload}
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
        </div>
      </div>
    </div>
  );
}