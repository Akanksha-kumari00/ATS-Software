import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import InterviewFilters from "../../components/Interviews/InterviewFilters";
import InterviewTable from "../../components/Interviews/InterviewTable";
import InterviewStats from "../../components/Interviews/InterviewStats";
import ScheduleInterviewModal from "../../components/Interviews/ScheduleInterviewModal";
import { getInterviews,  getInterviewStats, } from "../../services/interviewServices";
export default function InterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [stats, setStats] = useState({
  today: 0,
  upcoming: 0,
  completed: 0,
  cancelled: 0,
});
const [filters, setFilters] = useState({
  search: "",
  date: "",
  status: "",
});
const filteredInterviews = interviews.filter((item) => {
  const search = filters.search.toLowerCase();

  const matchesSearch =
    item.candidate_name?.toLowerCase().includes(search) ||
    item.email?.toLowerCase().includes(search) ||
    item.mobile?.includes(search);

  const matchesStatus =
    !filters.status ||
    item.interview_status === filters.status;

  const matchesDate =
    !filters.date ||
    item.interview_date?.slice(0, 10) === filters.date;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesDate
  );
});
const fetchData = async () => {
  try {
    const [interviewRes, statsRes] = await Promise.all([
      getInterviews(),
      getInterviewStats(),
    ]);

    setInterviews(interviewRes.data);
    setStats(statsRes.data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchData();
  }, []);
  return (
      <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 bg-gray-50 min-h-screen overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-6">
          <InterviewStats stats={stats} />
            <InterviewFilters
              openModal={() => setOpenModal(true)}
              filters={filters}
              setFilters={setFilters}
            />
          <InterviewTable
      data={filteredInterviews}
    refreshData={fetchData}
/>
          {openModal && (
            <ScheduleInterviewModal
              closeModal={() => setOpenModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}