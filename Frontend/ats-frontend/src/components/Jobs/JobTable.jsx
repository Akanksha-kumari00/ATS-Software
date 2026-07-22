import { Phone, Mail } from "lucide-react";
export default function JobTable({ 
  jobs = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1080px] w-full table-fixed text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-700">
              <th className="w-[25px] px-2 py-3 text-left text-xs font-semibold uppercase">
                S.N
              </th>
              <th className="w-[120px] px-2 py-3 text-left text-xs font-semibold uppercase">
                Position
              </th>
              <th className="w-[120px] px-2 py-3 text-left text-xs font-semibold uppercase">
                Hospital
              </th>
              <th className="w-[50px] px-2 py-3 text-center text-xs font-semibold uppercase">
                Beds
              </th>
              <th className="w-[90px] px-2 py-3 text-center text-xs font-semibold uppercase">
                Exp
              </th>
              <th className="w-[90px] px-2 py-3 text-left text-xs font-semibold uppercase">
                Salary
              </th>
              <th className="w-[80px] px-2 py-3 text-center text-xs font-semibold uppercase">
                Opening
              </th>
              <th className="w-[140px] px-2 py-3 text-left text-xs font-semibold uppercase">
                Hospital Contact
              </th>
              <th className="w-[120px] px-2 py-3 text-center text-xs font-semibold uppercase">
                 Accommodation
              </th>
              <th className="w-[90px] px-2 py-3 text-center text-xs font-semibold uppercase">
                Recruiter
              </th>
              <th className="w-[85px] px-2 py-3 text-center text-xs font-semibold uppercase">
                Status
              </th>
              <th className="w-[80px] px-2 py-3 text-center text-xs font-semibold uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150"
              >
                <td className="px-2 py-2">{index + 1}</td>
                {/* Position */}
                  <td className="w-[160px] px-2 py-2">
                    <div className="font-semibold text-gray-900 leading-4">
                      {job.position_title}
                    </div>
                    <div className="text-[11px] text-gray-500 leading-4">
                      {job.specialization}
                    </div>
                </td>
                {/* Hospital */}
                <td className="w-[170px] px-2 py-2">
                  <div className="font-semibold text-gray-900 leading-4">
                    {job.hospital_name}
                  </div>
                  <div className="text-[11px] text-gray-500 leading-4">
                    {job.city}, {job.state}
                  </div>
                </td>
                <td className="px-2 py-2 text-center">
                  {job.beds}
                </td>
                <td className="px-2 py-2 text-center whitespace-nowrap">
                  {job.min_experience} - {job.max_experience} Y
                </td>
                 <td className="w-[130px] px-2 py-2">
                    <div className="font-medium leading-4">
                      ₹{Number(job.min_salary).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-500 leading-4">
                      to ₹{Number(job.max_salary).toLocaleString()}
                    </div>
                </td>
                <td className="w-[90px] px-2 py-2 text-center text-[12px] whitespace-nowrap">
                  {new Date(job.opening_date).toLocaleDateString("en-IN")}
                </td>
               <td className="px-3 py-2">
                {job.contacts?.length > 0 ? (
                  job.contacts.map((c, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-sm font-semibold text-black">
                        {c.contact_person}
                      </p>

                      <p className="text-xs text-violet-600">
                        {c.contact_designation}
                      </p>

                <div className="flex items-center gap-1 text-xs">
                  <Phone
                    size={12}
                    className="text-red-500"
                    fill="currentColor"
                  />
                  <span className="text-blue-600">
                    {c.mobile}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Mail
                    size={12}
                    className="text-slate-500"
                  />
                  <span className="text-slate-600">
                    {c.email}
                  </span>
                </div>
              </div>
                  ))
              ) : (
                 <div className="space-y-0.5">
                      <p className="text-sm font-semibold">
                        {job.contact_person || "-"}
                      </p>
                      <p className="text-xs text-slate-500">[]
                        {job.contact_designation || "-"}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Phone size={12} />
                        {job.mobile || "-"}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Mail size={12} />
                        {job.email || "-"}
                      </div>
                    </div>
                    )}
              </td>
               <td className="px-2 py-2 text-center">
                  {job.accommodation}
                </td>
                <td className="px-2 py-2 text-center whitespace-nowrap">
                  {job.recruiter_name}
                </td>
                <td className="px-2 py-2 text-center">
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : job.status === "On Hold"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center justify-center gap-1">
                  <button
                      onClick={() => onView(job)}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-blue-100"
                  >
                    👁
                  </button>
                  <button
                      onClick={() => onEdit(job)}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-yellow-100"
                  >
                    ✏️
                  </button>
                  <button
                   onClick={() => onDelete(job.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-red-100"
                      >
                        🗑
                      </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="py-10 text-center text-gray-500"
                >
                  No Positions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}