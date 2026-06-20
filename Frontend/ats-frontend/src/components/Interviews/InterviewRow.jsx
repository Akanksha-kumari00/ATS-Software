import { useState } from "react";

import { FaCalendarAlt, FaEllipsisV } from "react-icons/fa";

import { updateInterviewStatus } from "../../services/interviewServices";

export default function InterviewRow({

  item,

  refreshData,

}) {
  const formattedDate = new Date(
  item.interview_date
).toLocaleDateString(
  "en-GB",
  {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
);

const formattedTime = new Date(
  `1970-01-01T${item.interview_time}`
).toLocaleTimeString(
  "en-US",
  {
    hour: "2-digit",
    minute: "2-digit",
  }
);

  const [showMenu, setShowMenu] = useState(false);


  const statusStyle = {

    Pending: "bg-yellow-100 text-yellow-700",

    Upcoming: "bg-blue-100 text-blue-700",

    Confirmed: "bg-green-100 text-green-700",

    Completed: "bg-purple-100 text-purple-700",

    Cancelled: "bg-red-100 text-red-700",

  };


  const handleStatus = async (status) => {

    try {

      await updateInterviewStatus(

        item.id,

        status

      );

      setShowMenu(false);

      refreshData();

    }

    catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="grid grid-cols-7 px-8 py-6 border-b items-center">

      {/* Date */}

      <div className="flex gap-2">

        <FaCalendarAlt className="text-gray-400 mt-1" />

        <div>

          <p className="font-semibold">
            

           {formattedDate}

          </p>

        </div>

      </div>


      {/* Candidate */}

      <div className="flex gap-3">

        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">

          {item.candidate_name

            ?.split(" ")

            .map((word) => word[0])

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

        {item.specialization || "-"}

      </div>


      {/* Hospital */}

      <div>

        <p>{item.hospital_name}</p>


        <p className="text-sm text-gray-500">

          {item.hospital_location}

        </p>

      </div>


      {/* Time */}

      <div>
          {formattedTime}
      </div>


      {/* Status */}

      <div>

        <span

          className={`px-3 py-1 rounded-full text-sm ${

            statusStyle[item.interview_status] ||

            "bg-gray-100 text-gray-700"

          }`}

        >

          {item.interview_status || "Pending"}

        </span>

      </div>


      {/* Actions */}

      <div className="relative">

        <button

          onClick={() => setShowMenu(!showMenu)}

          className="p-2 hover:bg-gray-100 rounded-lg"

        >

          <FaEllipsisV />

        </button>


        {showMenu && (

          <div className="absolute right-0 top-10 bg-white border shadow-lg rounded-xl w-40 z-50 overflow-hidden">

            <button

              onClick={() => handleStatus("Pending")}

              className="w-full text-left px-4 py-3 hover:bg-gray-100"

            >

              Pending

            </button>


            <button

              onClick={() => handleStatus("Confirmed")}

              className="w-full text-left px-4 py-3 hover:bg-gray-100"

            >

              Confirmed

            </button>


            <button

              onClick={() => handleStatus("Completed")}

              className="w-full text-left px-4 py-3 hover:bg-gray-100"

            >

              Completed

            </button>


            <button

              onClick={() => handleStatus("Cancelled")}

              className="w-full text-left px-4 py-3 hover:bg-gray-100"

            >

              Cancelled

            </button>

          </div>

        )}

      </div>

    </div>

  );

}