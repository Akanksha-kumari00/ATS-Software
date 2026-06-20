export default function EmployeeFilters() {
  return (
    <div className="bg-white p-1 rounded shadow-sm mt-2 span-2">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search employee..."
        className="border px-3 py-2 rounded-lg w-1/3
        focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* FILTER */}
      <select className="item-center border px-3 py-2 rounded-lg ">
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Interview Done">Interview Done</option>
        <option value="Joined">Joined</option>
        <option value="Rejected">Rejected</option>
      </select>

    </div>
  );
}