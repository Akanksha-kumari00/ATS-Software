function CandidateTable({ candidates }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">

        <thead className="bg-slate-100">
           <tr>
            <th className="p-3 text-left">Recruiter</th>
            <th className="p-3 text-left">Candidate Name</th>
            <th className="p-3 text-left">Education</th>
           <th className="p-3 text-left">Mobile</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Hospital</th>
          <th className="p-3 text-left">Location</th>
          <th className="p-3 text-left">Salary</th>
          <th className="p-3 text-left">Status</th>
       </tr>
       </thead>

        <tbody>
  {candidates.map((candidate) => (
    <tr key={candidate.id} className="border-t">
      <td className="p-3">{candidate.recruiter_name}</td>
      <td className="p-3">{candidate.candidate_name}</td>
      <td className="p-3">{candidate.education}</td>
      <td className="p-3">{candidate.mobile}</td>
      <td className="p-3">{candidate.email}</td>
      <td className="p-3">{candidate.hospital_name}</td>
      <td className="p-3">{candidate.location}</td>
      <td className="p-3">{candidate.salary}</td>
      <td className="p-3">{candidate.status}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default CandidateTable;