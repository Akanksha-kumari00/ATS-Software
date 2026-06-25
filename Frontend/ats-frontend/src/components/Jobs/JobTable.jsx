export default function JobTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Sl No</th>
            <th>Position</th>
            <th>Specialization</th>
            <th>Hospital</th>
            <th>Location</th>
            <th>Beds</th>
            <th>Exp</th>
            <th>Salary</th>
            <th>Opening Date</th>
            <th>Accomandation</th>
            <th>Recruiter</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3">1</td>
            <td>BDE</td>
            <td>Cardiology</td>
            <td>City Care Hospital</td>
            <td>Lucknow</td>
            <td>250</td>
            <td>1-5 Y</td>
            <td>₹2L - ₹4L</td>
            <td>20 May 2024</td>
            <td>Rohit</td>
            <td>yes</td>
            <td>
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
                Open
              </span>
            </td>
            <td className="flex gap-2 p-2">
              <button>👁</button>
              <button>✏️</button>
              <button>🗑</button>
            </td>
          </tr>
          
  
        </tbody>
      </table>
    </div>
  );
}