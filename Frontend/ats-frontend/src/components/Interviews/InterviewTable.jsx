import InterviewRow from "./InterviewRow";
export default function InterviewTable({
  data = [],
  refreshData,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-5 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Scheduled Interviews
          </h2>
          <p className="text-sm text-gray-500">
            Manage all scheduled candidate interviews
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Total : <span className="font-semibold">{data.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead className="bg-slate-50 border-b">
            <tr className="text-left text-xs font-semibold uppercase text-gray-500">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Specialization</th>
              <th className="px-6 py-4">Hospital</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <InterviewRow
                  key={item.id}
                  item={item}
                  refreshData={refreshData}
                />
              ))
            ) : (
             <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500 font-medium"
                >
                  No Scheduled Interviews Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}