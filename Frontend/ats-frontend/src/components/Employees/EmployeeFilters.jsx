export default function EmployeeFilters({ search, setSearch }) {
  return (
    <div className="bg-white p-1 rounded shadow-sm mt-1">

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded-lg w-full
        focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

    </div>
  );
}