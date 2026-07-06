import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import CandidateHeader from "../../components/candidates/CandidateHeader";
import CandidateFilters from "../../components/candidates/CandidateFilters";
import CandidateTable from "../../components/candidates/CandidateTable";
import CandidateDetails from "../../components/candidates/CandidateDetails";
import { getCandidates, deleteCandidate } from "../../services/candidateService";
import { exportCandidates } from "../../utils/exportCandidates";
function Candidates() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
 const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({
    speciality: "",
    experience: "",
    location: [],
    hiringStage: []
  })
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      }
      catch (error) {
        console.log(error);
      }
    };
    loadCandidates();
  }, []);
  const filteredCandidates = candidates.filter((candidate) => {
    const searchMatch =
      candidate.candidate_name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const specialityMatch =
      !filters.speciality ||
      candidate.specialization === filters.speciality;
    const experienceMatch =
      !filters.experience ||
      candidate.experience === filters.experience;
    const locationMatch =
      filters.location.length === 0 ||
      filters.location.includes(
        candidate.hospital_location
      );
    const stageMatch =
      filters.hiringStage.length === 0 ||
      filters.hiringStage.includes(
        candidate.status
      );
    return (
      searchMatch &&
      specialityMatch &&
      experienceMatch &&
      locationMatch &&
      stageMatch
    );
  });
  const handleExport = () => {
  exportCandidates(
    filteredCandidates.map((c) => ({
      candidate: c.candidate_name,
      email: c.email,
      mobile: c.mobile,
      education: c.education,
      specialization: c.specialization,
      hospital: c.hospital_name,
      hospitalLocation: c.hospital_location,
      interviewStatus: c.interview_status,
      interviewDate: c.interview_date
      ? new Date(c.interview_date).toLocaleDateString("en-GB")
      : "",
      interviewTime: c.interview_time || "",
      salary: c.salary_expectation,
      experience: c.experience,
      remarks: c.remarks,
    }))
  );
};
const handleScheduleInterview = (candidate) => {
  console.log("Schedule Interview", candidate);
};
const handleSendMail = (candidate) => {
  console.log("Send Mail", candidate);
};
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this candidate?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCandidate(id);
    setCandidates((prev) =>
      prev.filter((c) => c.id !== id)
    );
    alert("Candidate deleted successfully.");
  } catch (err) {
    console.log(err);
    alert("Delete failed.");
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
        <div className="p-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Filters */}
            <div className="col-span-2">
              <CandidateFilters
                filters={filters}
                setFilters={setFilters}
              />
            </div>
            {/* Table */}
            <div className="col-span-10">
              <CandidateHeader
                search={search}
                setSearch={setSearch}
                onExport={handleExport}
              />
              <CandidateTable
                candidates={filteredCandidates}
                setSelectedCandidate={setSelectedCandidate}
                onDelete={handleDelete}
                onScheduleInterview={handleScheduleInterview}
                onSendMail={handleSendMail}
              />
              {selectedCandidate && (
                <CandidateDetails
                  candidate={selectedCandidate}
                  onClose={() => setSelectedCandidate(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Candidates;