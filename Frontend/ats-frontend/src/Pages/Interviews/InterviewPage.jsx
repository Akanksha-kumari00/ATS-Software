import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/sidebar"
import Topbar from "../../components/layout/Topbar";
import InterviewHeader from "../../components/Interviews/InterviewHeader";
import InterviewFilters from "../../components/Interviews/InterviewFilters";
import InterviewTable from "../../components/Interviews/InterviewTable";

import { getInterviews } from "../../services/interviewServices";

export default function InterviewPage() {

  const [interviews, setInterviews] = useState([]);
const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {

  const fetchData = async () => {
    const res = await getInterviews();
    setInterviews(res.data);
  };
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

          <InterviewFilters />

          <InterviewTable data={interviews} />
        </div>
      </div>
    </div>
  );
}