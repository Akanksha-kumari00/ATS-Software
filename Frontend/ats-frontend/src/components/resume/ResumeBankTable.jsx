/*import { FaEye, FaDownload } from "react-icons/fa";

export default function ResumeBankTable({
  resumes,
  onView,
  onDownload,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Candidate</th>
            <th className="text-left">Mobile</th>
            <th className="text-left">Specialization</th>
            <th className="text-left">Resume</th>
            <th className="text-left">Uploaded Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {resumes.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-100"
            >
              <td className="p-2 font-semibold">
                {item.candidate_name}
              </td>
              <td>{item.mobile}</td>
              <td>{item.specialization || "-"}</td>
              <td>
                📄 {item.resume_file.split("\\").pop().split("-").slice(1).join("-")}
              </td>
              <td>
                {new Date(item.uploaded_date).toLocaleDateString("en-GB")}
              </td>
              <td>
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => onView(item)}
                   className="w-8 h-8 border rounded-lg flex items-center border-blue-500 text-blue-600 justify-center hover:bg-blue-100"
                    
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onDownload(item)}
                    className="w-8 h-8 border rounded-lg flex items-center border-green-500 text-green-600 justify-center hover:bg-green-100 transition"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="w-8 h-8 border flex items-center justify-center border-red-500 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    🗑
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";

export default function ResumeBankTable({
  resumes,
  onView,
  onDownload,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <tr className="text-gray-700">
              <th className="px-5 py-3 text-left font-semibold">
                Candidate
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Mobile
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Specialization
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Resume
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Uploaded Date
              </th>
              <th className="px-3 py-2 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {resumes.map((item, index) => (
              <tr
                key={item.id}
                className={`
                  border-b transition duration-200
                  hover:bg-blue-50
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                `}
              >
                <td className="px-3 py-2">
                  <div className="font-semibold text-gray-800">
                    {item.candidate_name}
                  </div>
                </td>

                <td className="px-3 py-2 text-gray-600">
                  {item.mobile}
                </td>

                <td className="px-3 py-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {item.specialization || "N/A"}
                  </span>
                </td>

                <td className="px-3 py-2 text-gray-700">
                  📄{" "}
                  {item.resume_file
                    .split("\\")
                    .pop()
                    .split("-")
                    .slice(1)
                    .join("-")}
                </td>

                <td className="px-3 py-2 text-gray-600">
                  {new Date(item.uploaded_date).toLocaleDateString(
                    "en-GB"
                  )}
                </td>

                <td className="px-3 py-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(item)}
                      className="w-9 h-9 rounded-xl border border-blue-500 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onDownload(item)}
                      className="w-9 h-9 rounded-xl border border-green-500 text-green-600 flex items-center justify-center hover:bg-green-100 transition"
                    >
                      <FaDownload />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="w-9 h-9 rounded-xl border border-red-500 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {resumes.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No resumes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}