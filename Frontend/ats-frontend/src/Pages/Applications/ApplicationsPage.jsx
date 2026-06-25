import { useState, useEffect } from "react";
import {getApplications,deleteApplication,updateApplication}from "../../services/applicationService";

import Sidebar from "../../components/layout/sidebar";
import Topbar from "../../components/layout/Topbar";
import ApplicationFilters from "../../components/Applications/ApplicationFilters";
import ApplicationStats from "../../components/Applications/ApplicationStats";
import ApplicationTable from "../../components/Applications/ApplicationsTable";
import ApplicationPagination from "../../components/Applications/ApplicationPagination";
import { exportApplications } from "../../utils/exportApplications";
import ViewApplicationModal from "../../components/Applications/ViewApplicationModal";
import EditApplicationModal from "../../components/Applications/EditApplicationModal";
function ApplicationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [applications, setApplications] = useState([]);
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
          <ApplicationFilters
           onExport={handleExport}
          />
          <ApplicationStats />
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <ApplicationTable 
              applications={applications}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
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