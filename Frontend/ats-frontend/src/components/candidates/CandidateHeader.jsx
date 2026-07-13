import { FaSearch, FaFileExport, FaPlus, FaFileImport } from "react-icons/fa";
function CandidateHeader({
  search,
  setSearch,
  onExport,
  onAdd,
  onImport,
}) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mb-4">

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

        {/* Search */}

        <div className="relative w-full md:flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search candidate by Name, Email or Mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onExport}
            className="px-5 py-3 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 transition"
          >
            <div className="flex items-center gap-2">
              <FaFileExport />
              Export
            </div>
          </button>
          <>
            <input
              type="file"
              id="candidateImport"
              accept=".xlsx,.xls,.csv"
              style={{ display: "none" }}
              onChange={onImport}
            />
            <button
              onClick={() => document.getElementById("candidateImport").click()}
              className="px-5 py-3 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition"
            >
              <div className="flex items-center gap-2">
                <FaFileImport />
                Import
              </div>
            </button>
        </>
          <button
            onClick={onAdd}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <div className="flex items-center gap-2">
              <FaPlus />
              Add Candidate
            </div>
          </button>

        </div>

      </div>

    </div>
  );
}

export default CandidateHeader;