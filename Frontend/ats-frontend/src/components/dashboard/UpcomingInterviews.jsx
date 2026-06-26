import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UpcomingInterviews() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    const getInterviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/upcoming-interviews"
        );
        setInterviews(response.data);
      }
      catch(error){
        console.log(error);
      }
    };
    getInterviews();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          Upcoming Interviews
        </h3>
        <button
          onClick={() => navigate("/interview")}
          className="text-blue-600 text-sm font-medium"
        >
          View All
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="text-left py-2">
              Date
            </th>
            <th className="text-left py-2">
              Candidate Name
            </th>
            <th className="text-left py-2">
              Timing
            </th>
          </tr>
        </thead>
        <tbody>
          {
           interviews.map((item)=>(
              <tr
                key={item.id}
                className="border-b"
              >
                <td className="py-3">
                 {new Date(item.interview_date).toLocaleDateString("en-CA")}
                </td>
                <td>
                  {item.candidate_name}
                </td>
                <td>
                  {item.interview_time}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
export default UpcomingInterviews;