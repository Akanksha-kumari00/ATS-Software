import { FaSearch, FaCalendarAlt, FaPlus } from "react-icons/fa";

export default function InterviewFilters({
  openModal,
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap items-center gap-4 mb-6">

      {/* Search */}
      <div className="flex items-center border rounded-lg px-4 py-3 flex-1 min-w-[260px]">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search candidate..."
          className="outline-none w-full"
        />
      </div>

      {/* Date */}
      <div className="flex items-center border rounded-lg px-4 py-3">
        <FaCalendarAlt className="text-gray-400 mr-3" />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="outline-none bg-transparent"
        />
      </div>

      {/* Interview Status */}
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border rounded-lg px-4 py-3 outline-none min-w-[180px]"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Button */}
      <button
        onClick={openModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
      >
        <FaPlus />
        Schedule Interview
      </button>
    </div>
  );
}