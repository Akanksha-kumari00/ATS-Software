import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import CandidateHeader from "../../components/candidates/CandidateHeader";
import CandidateFilters from "../../components/candidates/CandidateFilters";
import CandidateTable from "../../components/candidates/CandidateTable";
import CandidateDetails from "../../components/candidates/CandidateDetails";
import BulkActionBar from "../../components/candidates/BulkActionBar";
import BulkEmailModal from "../../components/candidates/BulkEmailModal";
import { getCandidates, deleteCandidate, importCandidates } from "../../services/candidateService";
import { exportCandidates } from "../../utils/exportCandidates";
function Candidates() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
const [filters, setFilters] = useState({
  speciality: [],
  location: [],
  hospital: [],
  gender: "",
  salaryMin: "",
  salaryMax: "",
  interviewStatus: [],
});

const [showBulkEmail, setShowBulkEmail] = useState(false);
  const loadCandidates = async () => {
  try {
    const data = await getCandidates();
    setCandidates(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadCandidates();
}, []);

const sendBulkEmail = async (data) => {
  try {
    await axios.post(
      "http://localhost:5000/api/mail/bulk",
      data
    );

    alert("Emails sent successfully.");

    setShowBulkEmail(false);
    setSelectedCandidates([]);
  } catch (err) {
    console.error(err);
    alert("Unable to send emails.");
  }
};

 const filteredCandidates = candidates.filter((candidate) => {

  // Search
  const searchMatch =
    candidate.candidate_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    candidate.email
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    candidate.mobile
      ?.includes(search);

  // Speciality
  const specialityMatch =
  filters.speciality.length === 0 ||
  filters.speciality.includes(candidate.specialization);

  // Location
  const locationMatch =
  filters.location.length === 0 ||
  filters.location.includes(candidate.hospital_location);

  // Hospital
  const hospitalMatch =
  filters.hospital.length === 0 ||
  filters.hospital.includes(candidate.hospital_name);

  // Gender
  const genderMatch =
    !filters.gender ||
    candidate.gender === filters.gender;

  // Salary
  const salary = Number(candidate.salary_expectation || 0);

  const salaryMatch =
    (!filters.salaryMin || salary >= Number(filters.salaryMin)) &&
    (!filters.salaryMax || salary <= Number(filters.salaryMax));

  // Interview Status
 const interviewMatch =
  filters.interviewStatus.length === 0 ||
  filters.interviewStatus.includes(candidate.interview_status);

  return (
    searchMatch &&
    specialityMatch &&
    locationMatch &&
    hospitalMatch &&
    genderMatch &&
    salaryMatch &&
    interviewMatch
  );
});
const selectedEmails = filteredCandidates
  .filter((candidate) => selectedCandidates.includes(candidate.id))
  .map((candidate) => candidate.email)
  .filter(Boolean);
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
const handleImport = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await importCandidates(formData);
    alert(
      `Imported : ${res.data.imported}\nSkipped : ${res.data.skipped}`
    );
      loadCandidates();

  } catch (err) {

    console.log(err);

    alert("Import Failed");

  }

};
const handleEdit = (candidate) => {
  navigate("/application", {
    state: {
      candidate,
      isEdit: true,
    },
  });
};
const handleScheduleInterview = (candidate) => {
  navigate("/interview", {
    state: {
      candidate,
    },
  });
};
const handleSendMail = (candidate) => {
  console.log("Send Mail", candidate);
};

const handleSelectCandidate = (id) => {
  setSelectedCandidates((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};

const handleSelectAll = () => {
  if (selectedCandidates.length === filteredCandidates.length) {
    setSelectedCandidates([]);
  } else {
    setSelectedCandidates(filteredCandidates.map((c) => c.id));
  }
};
const handleBulkMail = () => {
  if (selectedCandidates.length === 0) {
    alert("Please select at least one candidate.");
    return;
  }

  setShowBulkEmail(true);
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

    <div className=" overflow-y-auto">

      <Topbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="p-2">

        <CandidateHeader
          search={search}
          setSearch={setSearch}
          onExport={handleExport}
          onImport={handleImport}
          onAdd={() => navigate("/application")}
        />

        <CandidateFilters
          filters={filters}
          setFilters={setFilters}
          candidates={candidates}
        />
          <BulkActionBar
            selectedCount={selectedCandidates.length}
            onSendMail={handleBulkMail}
            onSchedule={() => console.log("Bulk Interview")}
            onAssign={() => console.log("Assign Recruiter")}
            onExport={handleExport}
            onDelete={() => console.log("Bulk Delete")}
            onClear={() => setSelectedCandidates([])}
          />
            <CandidateTable
            candidates={filteredCandidates}
            selectedCandidates={selectedCandidates}
            onSelectCandidate={handleSelectCandidate}
            onSelectAll={handleSelectAll}
            setSelectedCandidate={setSelectedCandidate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onScheduleInterview={handleScheduleInterview}
            onSendMail={handleSendMail}
            />
            {selectedCandidate && (
              <CandidateDetails
                candidate={selectedCandidate}
                onClose={() =>
                  setSelectedCandidate(null)
                }
              />
            )}
              <BulkEmailModal
                open={showBulkEmail}
                onClose={() => setShowBulkEmail(false)}
                recipients={selectedEmails}
                onSend={sendBulkEmail}
              />

      </div>

    </div>

  </div>
);
}
export default Candidates;