
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CandidateHeader({ search, setSearch }) {

  const navigate = useNavigate();

  return (

    <div className="flex justify-between items-center mb-2">

      <div className="relative w-80">

        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search candidates"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-4"
        />
      </div>

      <div className="flex gap-3">
        <button
          className="border px-4 py-2 rounded-xl"
        >
          Export
        </button>
        <button
          onClick={() => navigate("/application")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          + Add Candidate
        </button>

      </div>

    </div>

  );

}

export default CandidateHeader;