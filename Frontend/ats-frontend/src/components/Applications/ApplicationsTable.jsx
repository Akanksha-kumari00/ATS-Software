import { FaEye } from "react-icons/fa";

export default function ApplicationsTable({
applications,
onView,
onEdit,
onDelete
}) {

  return (

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">
              Candidate
            </th>
            <th className="text-left">
              Hospital
            </th>
            <th className="text-left">
              CV Forward Date
            </th>
            <th className="text-left">
              Status
            </th>
            <th className="text-left">
              Recruiter
            </th>
            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((item) => (
            <tr
            key={item.id}
            className="border-t hover:bg-gray-100"
            >
              <td className="p-2">
                <div className="font-semibold">
                  {item.candidate_name}
                </div>
                <div className="text-xs text-gray-500">
                  {item.email}
                </div>
                <div className="text-xs text-gray-500">
                  {item.mobile}
                </div>
              </td>
              <td>
                {item.hospital_name}
                  <div className="text-xs text-gray-500">
                     {item.specialization || "-"}
                  </div>
              </td>
              <td>
              {item.cv_forward_date
                ? new Date(item.cv_forward_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
              </td>
              <td>
                <span
                className="
                px-3
                py-1
                rounded-full
                text-xs
                bg-blue-100
                text-blue-700
                "
                >

                  {item.status}
                </span>
              </td>
              <td>
                {item.recruiter_name}
              </td>
              <td>
          <div className="flex justify-center gap-2">
              <button
                onClick={() => onView(item)}
                className="
                w-8
                h-8
                border
                rounded-lg
                flex
                items-center
                justify-center
                hover:bg-gray-100
                "
                >
                <FaEye/>
             </button>
             <button
                onClick={() => onEdit(item)}
                className="
                w-8
                h-8
                border
                rounded-lg
                flex
                items-center
                justify-center
                hover:bg-blue-100
                "

                >
                 ✏️
              </button>
              <button
              onClick={() => onDelete(item.id)}
              className="
              w-8
              h-8
              border
              rounded-lg
              flex
              items-center
              justify-center
              hover:bg-red-100
              "
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