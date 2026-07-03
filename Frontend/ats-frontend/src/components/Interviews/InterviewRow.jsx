
import {
  FaCalendarAlt,
 
  FaHospital,
  FaClock,
} from "react-icons/fa";


export default function InterviewRow({
  item,
}) {



  const formattedDate = new Date(
    item.interview_date
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(
    `1970-01-01T${item.interview_time}`
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusStyle = {
    Pending:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",

    Upcoming:
      "bg-blue-100 text-blue-700 border border-blue-200",

    Confirmed:
      "bg-green-100 text-green-700 border border-green-200",

    Completed:
      "bg-purple-100 text-purple-700 border border-purple-200",

    Cancelled:
      "bg-red-100 text-red-700 border border-red-200",
  };


  return (

    <tr className="border-b hover:bg-slate-50 transition">

      {/* Date */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

            <FaCalendarAlt className="text-blue-600"/>

          </div>

          <div>

            <p className="font-semibold">

              {formattedDate}

            </p>

            <p className="text-xs text-gray-400">

              Interview Date

            </p>

          </div>

        </div>

      </td>

      {/* Candidate */}

      <td className="px-6 py-5">

        <div className="flex gap-3">

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">

            {item.candidate_name
              ?.split(" ")
              .map((x) => x[0])
              .join("")
              .slice(0,2)}

          </div>

          <div>

            <p className="font-semibold">

              {item.candidate_name}

            </p>

            <p className="text-sm text-gray-500">

              {item.email}

            </p>

            <p className="text-sm text-gray-500">

              {item.mobile}

            </p>

          </div>

        </div>

      </td>

      {/* Specialization */}

      <td className="px-6 py-5">

        {item.specialization || "-"}

      </td>

      {/* Hospital */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2 font-medium">

          <FaHospital className="text-blue-500"/>

          {item.hospital_name}

        </div>

        <p className="text-sm text-gray-500 mt-1">

          {item.hospital_location}

        </p>

      </td>

      {/* Time */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <FaClock className="text-gray-400"/>

          {formattedTime}

        </div>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
            statusStyle[item.interview_status] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {item.interview_status || "Pending"}
        </span>

      </td>

      {/* Action */}


    </tr>

  );
}