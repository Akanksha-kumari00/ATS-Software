export default function ResumeFilters({
  search,
  specialization,
  uploadDate,
  onChange,
  onSearch,
  onReset,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 mb-5">
      <div className="flex flex-wrap items-end gap-4">

        {/* Search */}
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">
            Search
          </label>
          <input
            type="text"
            name="search"
            value={search}
            onChange={onChange}
            placeholder="Search Name / Mobile"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Specialization */}
        <div className="w-64">
          <label className="block text-sm font-medium mb-1">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={specialization}
            onChange={onChange}
            placeholder="Specialization"
            className="w-full border rounded-lg p-3"
          />
        </div>
        {/* Upload Date */}
        <div className="w-52">
          <label className="block text-sm font-medium mb-1">
            Upload Date
          </label>

          <input
            type="date"
            name="uploadDate"
            value={uploadDate}
            onChange={onChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Search */}
        <button
          onClick={onSearch}
          className="h-12 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Search
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="h-12 px-6 rounded-lg border hover:bg-gray-100"
        >
          Reset
        </button>

      </div>
    </div>
  );
}