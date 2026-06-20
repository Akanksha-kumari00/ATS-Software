import {
  FaSearch,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";
export default function ApplicationFilters({onExport}) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="flex items-center border rounded-xl px-2 h-10 flex-1 min-w-[300px]">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search by candidate name, email or mobile..."
            className="w-full outline-none"
          />
        </div>
        {/* Date */}
        <div className="flex items-center border rounded-xl px-2 h-10 w-50">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <select className="w-full outline-none bg-transparent">
            <option>Select Date Range</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        {/* Hospital */}
        <div className="border rounded-xl h-10 px-2 w-40">
          <select className="w-full h-full outline-none bg-transparent">
            <option>All Hospitals</option>
          </select>
        </div>
        {/* Status */}
        <div className="border rounded-xl h-10 px-2 w-40">
          <select className="w-full h-full outline-none bg-transparent">
            <option>All Status</option>
            <option>CV Shared</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
        </div>
        {/* Export */}
        <button
          onClick={onExport}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          h-10
          px-7
          rounded-xl
          flex
          items-center
          gap-2
          font-medium
          "
        >
          <FaDownload />
          Export
        </button>
      </div>
    </div>
  );
}