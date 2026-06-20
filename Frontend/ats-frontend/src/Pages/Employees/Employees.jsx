import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import Topbar from "../../components/layout/Topbar";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import EmployeeFilters from "../../components/Employees/EmployeeFilters";
import axios from "axios";
const API = "http://localhost:5000/api/employees";
export default function EmployeePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // EDIT BUTTON FUNCTION
  const handleEdit = (employee) => {
    console.log("Edit Employee:", employee);
    // Baad me yahan modal open kar sakti ho
  };
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-6">
          <EmployeeFilters />
          <div className="mt-5 bg-white rounded-xl shadow-sm p-4">
            <EmployeeTable
              employees={employees}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}