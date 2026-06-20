import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function RecentApplications() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const getApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/recent-applications"
        );
        setApplications(response.data);
      }
      catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
    getApplications();
     }, []);
    const getStatusClass = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-purple-100 text-purple-700";
      case "Interview":
        return "bg-orange-100 text-orange-700";
      case "Selected":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          Recent Applications
        </h3>
        <button
            onClick={() => navigate("/applications")}
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
        >
              View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="text-left py-2">
                  Candidate Name
                </th>
                <th className="text-left py-2">
                  Specialization
                </th>
                <th className="text-left py-2">
                  Hospital
                </th>
                <th className="text-left py-2">
                  Status
                </th>
                <th className="text-left py-2">
                  Applied On
                </th>
              </tr>
            </thead>
              <tbody>
                {
                  applications.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b"
                    >
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold"
                          >
                            {
                              item.candidate_name
                              .split(" ")
                              .slice(0,2)
                              .map(word => word[0])
                              .join("")
                            }
                          </div>
                          <span>
                            {item.candidate_name}
                          </span>
                        </div>
                      </td>
                      <td>
                        {item.education}
                      </td>
                      <td>
                        {item.hospital_name}
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.applied_date}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
        </table>
      </div>
    </div>

  );
}

export default RecentApplications;