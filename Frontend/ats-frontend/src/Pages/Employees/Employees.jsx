
import { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/layout/sidebar";
import Topbar from "../../components/layout/Topbar";
import Pagination from "../../components/common/Pagination";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import EmployeeFilters from "../../components/Employees/EmployeeFilters";
import axios from "axios";

const API = "http://localhost:5000/api/employees";
export default function EmployeePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const [limit] = useState(10);

const [totalPages, setTotalPages] = useState(1);
const [totalRecords, setTotalRecords] = useState(0);


const fetchEmployees = useCallback(async () => {
  try {
    const res = await axios.get(
      `${API}?page=${page}&limit=${limit}`
    );

    setEmployees(res.data.employees);
    setTotalPages(res.data.totalPages);
    setTotalRecords(res.data.totalRecords);
  } catch (err) {
    console.log(err);
  }
}, [page, limit]);
useEffect(() => {
  fetchEmployees();
}, [fetchEmployees]);
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
            <Pagination
              page={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limit={limit}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>

  );
}