import {
  Eye,
  Pencil,
  Trash2,
  Building2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function HospitalTable({
  hospitals = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center">
        Loading hospitals...
      </div>
    );
  }

  if (!hospitals.length) {
    return (
      <div className="bg-white rounded-xl border p-12 text-center">
        <Building2 className="mx-auto text-slate-300" size={50} />
        <h3 className="text-lg font-semibold mt-3">
          No Hospital Found
        </h3>
        <p className="text-slate-500 text-sm">
          Add your first hospital.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <span className="text-sm text-slate-500">
          Total : <strong>{hospitals.length}</strong>
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1400px] w-full table-auto">

           <thead className="sticky top-0 bg-slate-50 z-10 border-b">
                      <tr className="text-left text-[13px] font-semibold text-slate-700">
                        <th className="px-3 py-3">Hospital</th>
                        <th className="px-3 py-3">Owner</th>
                        <th className="px-3 py-3">BDE Name</th>
                        <th className="px-3 py-3 text-center">BDE %</th>
                        <th className="px-3 py-3">HR Contact</th>
                        <th className="px-3 py-3">Location</th>
                        <th className="px-3 py-3 text-center">Beds</th>
                        <th className="px-3 py-3">Agreement</th>
                        <th className="px-3 py-3">Requirements</th>
                        <th className="px-3 py-3 text-center">Status</th>
                        <th className="px-3 py-3 text-center">Actions</th>
                      </tr>
           </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr
                key={hospital.id}
                className="border-b hover:bg-slate-50 transition h-[110px]"
              >
                {/* Hospital */}
                <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                  <Building2 size={18} className="text-indigo-600" />
                                </div>

                                <div>
                                  <p className="font-semibold text-sm">{hospital.hospital_name}</p>

                                  <span className="inline-flex mt-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]">
                                    {hospital.hospital_type}
                                  </span>
                                </div>
                           </div>
                   </td>

                {/* Owner */}
              <td className="px-1 py-1">
                  <div>
                    <p className="font-medium text-sm">
                      {hospital.hospital_owner || "-"}
                    </p>
                  </div>
              </td>

              <td className="px-2 py-2">
                <span className="font-medium text-indigo-600">
                  {hospital.bde_name || "-"}
                </span>
              </td>
              <td className="px-2 py-2 text-center">
                <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">
                  {hospital.bde_percentage
                    ? `${hospital.bde_percentage}%`
                    : "-"}
                </span>
              </td>
                {/* Contact */}
                <td className="px-3 py-2">
                 <div className="space-y-0.5">
                    <p className="text-sm font-semibold">
                         {hospital.contact_person || "-"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {hospital.contact_designation || "HR"}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Phone size={12} />
                      {hospital.mobile}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Mail size={12} />
                      {hospital.email}
                    </div>
                  </div>
                </td>
                {/* Location */}
                <td className="px-4 py-3">
                  <div className="flex gap-2 items-start">
                    <MapPin
                      size={14}
                      className="text-slate-500 mt-0.5"
                    />
                    <div>
                      <p className="text-sm">
                        {hospital.city}
                      </p>
                      <p className="text-xs text-slate-500">
                        {hospital.state}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center">
                       <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold">
                                {hospital.beds}
                        </span>
                </td>
                <td className="px-3 py-4">
                    <div className="flex flex-col gap-2 text-xs min-w-[140px]">

                      <span className="inline-flex px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        {hospital.agreement_days} Days
                      </span>

                      <div className="text-slate-600 space-y-1">
                        <div>
                          📅 {hospital.agreement_date
                            ? new Date(hospital.agreement_date).toLocaleDateString("en-IN")
                            : "-"}
                        </div>

                        <div>
                          📅 {hospital.agreement_expiry
                            ? new Date(hospital.agreement_expiry).toLocaleDateString("en-IN")
                            : "-"}
                        </div>
                      </div>

                      <span className="inline-flex px-2 py-1 rounded-md bg-violet-100 text-violet-700 text-[11px]">
                        {hospital.payment_terms}
                      </span>

                    </div>
                  </td>
              
              
                <td className="p-3 max-w-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.position_summary
                        ? hospital.position_summary
                            .split(", ")
                            .map((item, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-[11px]"
                              >
                                {item}
                              </span>
                            ))
                        : "-"}
                    </div>
                  </td>
                {/* Status */}
                <td className="px-4 py-3 text-center">
                            
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      hospital.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hospital.status}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => onView?.(hospital)}
                      className="w-8 h-8 rounded-md hover:bg-blue-100 text-blue-600 flex items-center justify-center"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit?.(hospital)}
                      className="w-8 h-8 rounded-md hover:bg-yellow-100 text-yellow-600 flex items-center justify-center"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete?.(hospital.id)}
                      className="w-8 h-8 rounded-md hover:bg-red-100 text-red-600 flex items-center justify-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="px-4 py-3 border-t flex justify-between items-center">
        <p className="text-sm text-slate-500">
          Showing <strong>{hospitals.length}</strong> hospitals
        </p>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-slate-50">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm">
            1
          </button>
          <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}