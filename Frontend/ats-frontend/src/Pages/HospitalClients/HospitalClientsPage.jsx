import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import Pagination from "../../components/common/Pagination";
import HospitalHeader from "../../components/hospitals/HospitalHeader";
import AddHospitalModal from "../../components/hospitals/AddHospitalModal";
import HospitalViewModal from "../../components/hospitals/HospitalViewModal";
import HospitalTable from "../../components/hospitals/HospitalTable";
import hospitalService from "../../services/hospitalService";
export default function HospitalClients() {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
  const [stats, setStats] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    state: "",
    city: "",
    status: "",
  });
const [page, setPage] = useState(1);
const [limit] = useState(10);

const [totalPages, setTotalPages] = useState(1);
const [totalRecords, setTotalRecords] = useState(0);
 const loadHospitals = useCallback(async () => {
  try {
    setLoading(true);

    const [hospitalRes, statsRes] = await Promise.all([
      hospitalService.getHospitals(page, limit),
      hospitalService.getStats(),
    ]);

    setHospitals(hospitalRes.data.hospitals);
    setTotalPages(hospitalRes.data.totalPages);
    setTotalRecords(hospitalRes.data.totalRecords);

    setStats(statsRes.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, [page, limit]);

useEffect(() => {
  loadHospitals();
}, [loadHospitals]);
  // Add / Update Hospital
 const handleSaveHospital = async (formData) => {
  try {
    if (editData) {
      await hospitalService.updateHospital(editData.id, formData);
    } else {
      await hospitalService.createHospital(formData);
    }

    await loadHospitals();

    setOpenModal(false);
    setEditData(null);
  } catch (err) {
  const message =
    err.response?.data?.message || "Something went wrong";

  alert(message);
}
};

  // Delete Hospital
 const handleDeleteHospital = async (id) => {
  if (!window.confirm("Delete this hospital?")) return;

  try {
    await hospitalService.deleteHospital(id);
    loadHospitals();
  } catch (err) {
    console.log(err);
  }
};

  // Edit Hospital
  const handleEditHospital = (hospital) => {
    setEditData(hospital);
    setOpenModal(true);
  };

  // Search + Filter
 const filteredHospitals = (Array.isArray(hospitals) ? hospitals : []).filter(
  (hospital) => {
    const matchSearch =
      hospital.hospital_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      hospital.account_owner
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      hospital.mobile?.includes(search);

    const matchState =
      !filters.state || hospital.state === filters.state;

    const matchCity =
      !filters.city || hospital.city === filters.city;

    const matchStatus =
      !filters.status || hospital.status === filters.status;

    return (
      matchSearch &&
      matchState &&
      matchCity &&
      matchStatus
    );
  }
);
const [viewHospital, setViewHospital] = useState(null);
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex-1 overflow-y-auto">
            <Topbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
      <div className="flex-1 overflow-auto p-1">
        <HospitalHeader
          stats={stats}
          search={search}
           hospitals={hospitals}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          onAddHospital={() => {
            setEditData(null);
            setOpenModal(true);
          }}
        />
        <div className="p-2">
          <HospitalTable
                hospitals={filteredHospitals}
                loading={loading}
                 onView={setViewHospital}
                onEdit={handleEditHospital}
                onDelete={handleDeleteHospital}
            />
            <Pagination
              page={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limit={limit}
              onPageChange={setPage}
            />
        </div>
        <AddHospitalModal
          open={openModal}
          editData={editData}
          onClose={() => {
            setOpenModal(false);
            setEditData(null);
          }}
          onSave={handleSaveHospital}
        />
       <HospitalViewModal
          open={!!viewHospital}
          hospital={viewHospital}
          onClose={() => setViewHospital(null)}
        />
      </div>
    </div>
    </div>
    
  );
}