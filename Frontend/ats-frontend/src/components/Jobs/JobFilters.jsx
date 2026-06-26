export default function JobFilters({
  filters,
  setFilters,
  onSearch,
  onReset,
  onExport
}) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-3 items-center">

      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search Position / Hospital"
        className="border rounded-lg px-3 py-2 flex-1 min-w-[250px]"
      />

      <input
        type="date"
        name="fromDate"
        value={filters.fromDate}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2"
      />

      <input
        type="date"
        name="toDate"
        value={filters.toDate}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2"
      />

      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Search
      </button>

      <button
        onClick={onReset}
        className="bg-gray-200 px-5 py-2 rounded-lg"
      >
        Reset
      </button>

      <button  
        onClick={() => {
      console.log("Export Clicked");
      onExport();
    }}
        className="bg-red-500 text-white px-5 py-2 rounded-lg"
      >
        Export
      </button>

    </div>
  );
}