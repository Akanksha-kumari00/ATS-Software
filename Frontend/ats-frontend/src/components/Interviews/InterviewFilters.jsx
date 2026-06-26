import { FaSearch, FaCalendarAlt, FaPlus } from "react-icons/fa";
export default function InterviewFilters({ openModal }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 mb-6">
      <div className="flex items-center border rounded-lg px-4 py-3 flex-1">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search candidate by name, email or mobile..."
          className="outline-none w-full"
        />
      </div>
      <div className="flex items-center border rounded-lg px-4 py-3 w-52">
        <FaCalendarAlt className="text-gray-400 mr-3" />
        <select className="outline-none w-full bg-transparent">
          <option>Select Date</option>
        </select>
      </div>
      <select className="border rounded-lg px-4 py-3 w-48 outline-none">
        <option>All Status</option>
        <option>Upcoming</option>
        <option>Scheduled</option>
        <option>Confirmed</option>
      </select>
      <button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
        <FaPlus />
        Schedule Interview
      </button>
    </div>
  );
}
