import { FaEllipsisV, FaCalendarAlt } from "react-icons/fa";


export default function InterviewRow({ item }) {
const statusStyle = {
  Upcoming: "bg-yellow-100 text-yellow-700",

  Scheduled: "bg-blue-100 text-blue-700",

  Confirmed: "bg-green-100 text-green-700",

  Rejected: "bg-red-100 text-red-700",
};
  return (
<div className="grid grid-cols-7 px-8 py-6 border-b items-center">

<div className="flex items-start gap-2">

  <FaCalendarAlt className="text-gray-400 mt-1" />

  <div>

    <p className="font-semibold">

      {item.date}

    </p>

    <p className="text-sm text-gray-500">

      {item.day}

    </p>

  </div>

</div>

  

  {/* Candidate */}

<div className="flex items-start gap-3">

  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">

    {item.candidate_name
      .split(" ")
      .map(word => word[0])
      .join("")
      .slice(0, 2)}

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

  {/* Specialization */}

  <div>
    {item.specialization}
  </div>

  {/* Hospital */}

  <div>
    <p>{item.hospital}</p>

    <p className="text-gray-500">
      {item.city}
    </p>
  </div>

  {/* Time */}

  <div>
    {item.time}
  </div>

  {/* Status */}

  <div>

  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle[item.status]}`}
  >

    {item.status}

  </span>

</div>

  {/* Actions */}

  <div>⋮
    <div className="flex justify-center">

  <button className="p-2 hover:bg-gray-100 rounded-lg">

    <FaEllipsisV />

  </button>

</div>
  </div>

</div>


  );
}