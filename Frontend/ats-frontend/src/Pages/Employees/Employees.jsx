
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
  const [search, setSearch] = useState("");

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
   const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase()) ||
      emp.phone_number?.toString().includes(search) ||
      emp.job_profile?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (

    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
         <div className="p-3">
          <EmployeeFilters
            search={search}
            setSearch={setSearch}
          />

          <div className="mt-5 bg-white rounded-xl shadow-sm p-3">
            <EmployeeTable
              employees={filteredEmployees}   
              setEmployees={setEmployees}
            />
          </div>
        </div>
      </div>
    </div>

  );
}