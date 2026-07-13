import {
  FaSearch,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";

export default function ApplicationFilters({
  filters,
  setFilters,
  hospitals = [],
  onExport,
}) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow-sm">
      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}
        <div className="flex items-center border rounded-xl px-2 h-10 flex-1 min-w-[220px] w-full sm:w-auto">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search by candidate name, email or mobile..."
            className="w-full outline-none"
            value={filters.search}
            onChange={(e) =>
              handleChange("search", e.target.value)
            }
          />
        </div>

        {/* Date */}
        <div className="flex items-center border rounded-xl px-2 h-10 w-52">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <select
            className="w-full outline-none bg-transparent"
            value={filters.dateRange}
            onChange={(e) =>
              handleChange("dateRange", e.target.value)
            }
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {/* Hospital */}
        <div className="border rounded-xl h-10 px-2 w-48">
          <select
            className="w-full h-full outline-none bg-transparent"
            value={filters.hospital}
            onChange={(e) =>
              handleChange("hospital", e.target.value)
            }
          >
            <option value="">All Hospitals</option>

            {hospitals.map((hospital) => (
              <option
                key={hospital}
                value={hospital}
              >
                {hospital}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="border rounded-xl h-10 px-2 w-44">
          <select
            className="w-full h-full outline-none bg-transparent"
            value={filters.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
          >
            <option value="">All Status</option>
            <option value="CV Shared">CV Shared</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
            <option value="Dropout">Dropout</option>
          </select>
        </div>

        {/* Export */}
        <button
          onClick={onExport}
          className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-7 rounded-xl flex items-center gap-2 font-medium"
        >
          <FaDownload />
          Export
        </button>

      </div>
    </div>
  );
}