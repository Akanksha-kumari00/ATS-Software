import { RotateCcw } from "lucide-react";
import DropdownFilter from "../common/DropdownFilter";

function CandidateFilters({
  filters,
  setFilters,
  candidates = [],
}) {
  // Auto Options from Candidates

  const specialities = [
    ...new Set(
      candidates
        .map((c) => c.specialization)
        .filter(Boolean)
    ),
  ].sort();

  const locations = [
    ...new Set(
      candidates
        .map((c) => c.hospital_location)
        .filter(Boolean)
    ),
  ].sort();

  const hospitals = [
    ...new Set(
      candidates
        .map((c) => c.hospital_name)
        .filter(Boolean)
    ),
  ].sort();

  const interviewStatus = [
    ...new Set(
      candidates
        .map((c) => c.interview_status)
        .filter(Boolean)
    ),
  ].sort();

  const resetFilters = () => {
    setFilters({
      speciality: [],
      location: [],
      hospital: [],
      gender: "",
      interviewStatus: [],
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">

      {/* FILTER BAR */}

      <div className="flex flex-wrap items-center gap-3">

        <DropdownFilter
          label="🩺 Speciality"
          options={specialities}
          selected={filters.speciality}
          onChange={(value) =>
            setFilters({
              ...filters,
              speciality: value,
            })
          }
        />

        <DropdownFilter
          label="📍 Location"
          options={locations}
          selected={filters.location}
          onChange={(value) =>
            setFilters({
              ...filters,
              location: value,
            })
          }
        />

        <DropdownFilter
          label="🏥 Hospital"
          options={hospitals}
          selected={filters.hospital}
          onChange={(value) =>
            setFilters({
              ...filters,
              hospital: value,
            })
          }
        />

        <DropdownFilter
          label="👤 Gender"
          multiple={false}
          options={[
            "Male",
            "Female",
            "Other",
          ]}
          selected={filters.gender}
          onChange={(value) =>
            setFilters({
              ...filters,
              gender: value,
            })
          }
        />

        <DropdownFilter
          label="📅 Interview"
          options={interviewStatus}
          selected={filters.interviewStatus}
          onChange={(value) =>
            setFilters({
              ...filters,
              interviewStatus: value,
            })
          }
        />

        <button
          onClick={resetFilters}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-100"
        >
          <RotateCcw size={16} />
          Reset
        </button>

      </div>

      {/* ACTIVE FILTER CHIPS */}

      <div className="flex flex-wrap gap-2 mt-4">

        {filters.speciality.map((item) => (
          <span
            key={item}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {item}
          </span>
        ))}

        {filters.location.map((item) => (
          <span
            key={item}
            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
          >
            {item}
          </span>
        ))}

        {filters.hospital.map((item) => (
          <span
            key={item}
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
          >
            {item}
          </span>
        ))}

        {filters.gender && (
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
            {filters.gender}
          </span>
        )}

        {filters.interviewStatus.map((item) => (
          <span
            key={item}
            className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
          >
            {item}
          </span>
        ))}

      </div>

    </div>
  );
}

export default CandidateFilters;