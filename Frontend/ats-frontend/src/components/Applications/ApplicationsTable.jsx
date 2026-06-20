export default function ApplicationsTable({ applications })  {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Candidate</th>
            <th>Hospital</th>
            <th>Applied On</th>
            <th>Status</th>
            <th>Recruiter</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item.email} • {item.phone}
                </div>
              </td>
              <td>{item.hospital}</td>
              <td>{item.date}</td>
              <td>
                <span className="px-1 py-1 text-xs rounded bg-blue-100 text-blue-600">
                  {item.status}
                </span>
              </td>
              <td>{item.recruiter}</td>
              <td className="space-x-2">
                <button className="px-1 py-1 border rounded">👁</button>
                <button className="px-1 py-1 border rounded">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}