
function CandidateTable({ candidates, setSelectedCandidate= [] }) {

  return (

    <div className="bg-white rounded-2xl shadow p-5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
                 <tr className="border-b text-gray-500 text-sm">
                        <th className="text-left py-2">
                          Doctor                           
                        </th>

                        <th className="text-left py-2">
                          Education
                        </th>
                        <th className="text-left py-2">
                            Contact
                        </th>
                        <th className="text-left py-2">
                           Action
                         </th>
                  </tr>
          </thead>
          <tbody>
                      {candidates.length > 0 ? (
                      candidates.map((candidate)=>(
                <tr
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className="border-b hover:bg-blue-50 transition cursor-pointer"
                >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold">
                                    {candidate.candidate_name?.charAt(0)}
                              </div>
                              <div>
                                    <p className="font-semibold">
                                        {candidate.candidate_name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ID : {candidate.id}
                                    </p>
                              </div>

                        </div>

                      </td>
                      <td>
                        {candidate.education}
                      </td>
                      <td>
                            <div>
                                <p>
                                  {candidate.mobile}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {candidate.email}
                                </p>
                             </div>
                     </td>
                    <td>
                        <button
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-sm"
                        >
                                    View
                        </button>

</td>

</tr>

))

) : (

<tr>

<td colSpan="4" className="text-center py-10" >

No candidates found

</td>

</tr>

)}

</tbody>
        </table>

      </div>

    </div>

  );

}

export default CandidateTable;