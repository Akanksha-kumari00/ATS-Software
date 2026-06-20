import { useState, useEffect } from "react";
import { getCandidates } from "../../services/candidateService";

import Sidebar from "../../components/layout/sidebar";
import Topbar from "../../components/layout/Topbar";

import ApplicationFilters from "../../components/Applications/ApplicationFilters";
import ApplicationStats from "../../components/Applications/ApplicationStats";
import ApplicationTable from "../../components/Applications/ApplicationsTable";
import ApplicationPagination from "../../components/Applications/ApplicationPagination";
import { exportApplications } from "../../utils/exportApplications";

function ApplicationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [applications, setApplications] = useState([]);
  useEffect(() => {
  loadApplications();
}, []);

const loadApplications = async () => {
  try {
    const data = await getCandidates();
    setApplications(data);
  } catch (error) {
    console.log(error);
  }
};


const handleExport = () => {

  exportApplications([
    {
      name: "Dr Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "9876543210",
      hospital: "Apollo Hospitals, Delhi",
      date: "17 Jun 2026",
      status: "New",
      recruiter: "Amit Verma",
    },
  ]);

};
  

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-3 space-y-5">

          {/* Filters */}
          <ApplicationFilters
  onExport={handleExport}
/>

          {/* Stats */}
          <ApplicationStats />

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <ApplicationTable applications={applications} />

            <div className="p-3 border-t">
              <ApplicationPagination />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ApplicationsPage;