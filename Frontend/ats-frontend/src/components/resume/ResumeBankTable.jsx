import { FaEye, FaDownload } from "react-icons/fa";

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
                   className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-blue-100"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onDownload(item)}
                    className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-green-100"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="w-8 h-8 border flex items-center justify-center rounded-lg hover:bg-red-100"
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
}