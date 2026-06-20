import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import InterviewHeader from "../../components/Interviews/InterviewHeader";
import InterviewFilters from "../../components/Interviews/InterviewFilters";
import InterviewTable from "../../components/Interviews/InterviewTable";
import ScheduleInterviewModal from "../../components/Interviews/ScheduleInterviewModal";
import { getInterviews } from "../../services/interviewServices";
export default function InterviewPage() {
  const [interviews, setInterviews] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const fetchData = async () => {
    try {
      const res = await getInterviews();
      setInterviews(res.data);
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-6">
          <InterviewHeader />
          <InterviewFilters
            openModal={() => setOpenModal(true)}
          />
          <InterviewTable
            data={interviews}
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