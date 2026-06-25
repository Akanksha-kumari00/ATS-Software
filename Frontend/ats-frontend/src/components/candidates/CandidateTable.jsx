function CandidateTable({ candidates = [], setSelectedCandidate }) {
  return (
    <div className="bg-white rounded-xl shadow p-3">
      
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-2 text-left">Candidate</th>
              <th className="p-2 text-left">Profile</th>
              <th className="p-2 text-left">Hospital</th>
              <th className="p-2 text-left">Interview</th>
              <th className="p-2 text-left">Salary</th>
              <th className="p-2 text-left">Exp</th>
              <th className="p-2 text-left">Remarks</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y">

            {candidates.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelectedCandidate(c)}
                className="hover:bg-blue-50 cursor-pointer"
              >

                {/* CANDIDATE (name + email + mobile) */}
                <td className="p-2">
                  <div>
                    <p className="font-semibold">{c.candidate_name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                    <p className="text-xs text-gray-500">{c.mobile}</p>
                  </div>
                </td>

                {/* PROFILE (education + specialization) */}
                <td className="p-2">
                  <p>{c.education}</p>
                  <p className="text-xs text-gray-500">
                    {c.specialization}
                  </p>
                </td>

                {/* HOSPITAL (name + location) */}
                <td className="p-2">
                  <p>{c.hospital_name}</p>
                  <p className="text-xs text-gray-500">
                    {c.hospital_location}
                  </p>
                </td>

                {/* INTERVIEW (status + date + time) */}
                <td className="p-2 text-xs">
                  <p className="font-medium">{c.interview_status}</p>
                  <p className="text-gray-500">
                    {c.interview_date
                      ? new Date(c.interview_date).toLocaleDateString()
                      : "-"}
                  </p>
                  <p className="text-gray-400">
                    {c.interview_time || ""}
                  </p>
                </td>

                {/* SALARY */}
                <td className="p-2 font-medium">
                  ₹{c.salary_expectation}
                </td>

                {/* EXPERIENCE */}
                <td className="p-2">
                  {c.experience}
                </td>

                {/* REMARKS */}
                <td className="p-2 text-xs text-gray-600 max-w-[150px] truncate">
                  {c.remarks}
                </td>

                {/* ACTION */}
                <td className="p-2">
                  <button className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200">
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CandidateTable;