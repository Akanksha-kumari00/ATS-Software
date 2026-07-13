import { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import Pagination from "../../components/common/Pagination";
import InterviewFilters from "../../components/Interviews/InterviewFilters";
import InterviewTable from "../../components/Interviews/InterviewTable";
import InterviewStats from "../../components/Interviews/InterviewStats";
import ScheduleInterviewModal from "../../components/Interviews/ScheduleInterviewModal";
import { getInterviews,  getInterviewStats, } from "../../services/interviewServices";
export default function InterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
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
const [page, setPage] = useState(1);
const [limit] = useState(10);

const [totalPages, setTotalPages] = useState(1);
const [totalRecords, setTotalRecords] = useState(0);
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
  item.interview_date === filters.date;
  return (
    matchesSearch &&
    matchesStatus &&
    matchesDate
  );
  });

const fetchData = useCallback(async () => {
  try {
    const [interviewRes, statsRes] = await Promise.all([
      getInterviews(page, limit),
      getInterviewStats(),
    ]);
    setInterviews(interviewRes.data.interviews);
    setTotalPages(interviewRes.data.totalPages);
    setTotalRecords(interviewRes.data.totalRecords);
    setStats(statsRes.data);
  } catch (error) {
    console.log(error);
  }
}, [page, limit]);
useEffect(() => {
  fetchData();
}, [fetchData]);
  return (
      <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
           <Pagination
              page={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limit={limit}
              onPageChange={setPage}
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