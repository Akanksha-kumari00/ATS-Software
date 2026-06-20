import {
  FaCheck,
  FaTimes,
  FaEdit,
  FaEye,
} from "react-icons/fa";

export default function EmployeeTable({
  employees,
  onEdit,
}) {
  const getBadge = (status) => {
    switch (status) {
      case "Joined":
        return "bg-green-100 text-green-700";

      case "Interview Done":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">

      <table className="w-full">

        {/* HEADER */}

        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Job Profile
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Position
            </th>

            <th className="p-4 text-center">
              CV
            </th>

            <th className="p-4 text-center">
              Interview
            </th>

            <th className="p-4 text-center">
              Status
            </th>

            <th className="p-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        {/* BODY */}

        <tbody>

          {employees.length === 0 ? (

            <tr>

              <td
                colSpan={9}
                className="
                text-center
                py-10
                text-gray-500"
              >

                No employees found

              </td>

            </tr>

          ) : (

            employees.map((emp) => (

              <tr
                key={emp.id}
                className="
                border-b
                hover:bg-blue-50
                transition"
              >

                {/* NAME */}

                <td className="p-4 font-medium">

                  {emp.name}

                </td>

                {/* JOB PROFILE */}

                <td className="p-4">

                  {emp.job_profile}

                </td>

                {/* EMAIL */}

                <td className="p-4">

                  {emp.email}

                </td>

                {/* PHONE */}

                <td className="p-4">

                  {emp.phone_number}

                </td>

                {/* POSITION */}

                <td className="p-4">

                  {emp.working_position}

                </td>

                {/* CV */}

                <td className="text-center">

                  {emp.cv_forwarded ? (

                    <FaCheck className="text-green-600 mx-auto text-lg" />

                  ) : (

                    <FaTimes className="text-red-500 mx-auto text-lg" />

                  )}

                </td>

                {/* INTERVIEW */}

                <td className="text-center">

                  {emp.interview_done ? (

                    <FaCheck className="text-blue-600 mx-auto text-lg" />

                  ) : (

                    <FaTimes className="text-red-500 mx-auto text-lg" />

                  )}

                </td>

                {/* STATUS */}

                <td className="text-center">

                  <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${getBadge(emp.joining_status)}
                    `}
                  >

                    {emp.joining_status}

                  </span>

                </td>

                {/* ACTION */}

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    {/* EDIT */}

                    <button

                      onClick={() => onEdit(emp)}

                      className="
                      flex
                      items-center
                      gap-2
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      transition"

                    >

                      <FaEdit />

                      <span>Edit</span>

                    </button>

                    {/* VIEW */}

                    <button

                      className="
                      flex
                      items-center
                      gap-2
                      bg-gray-600
                      hover:bg-gray-700
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      transition"

                    >

                      <FaEye />

                      <span>View</span>

                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}