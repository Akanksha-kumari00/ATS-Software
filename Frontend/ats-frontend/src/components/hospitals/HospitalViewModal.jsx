import {
  X,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  BedDouble,
  FileText,
  Calendar,
  BadgePercent,
} from "lucide-react";

export default function HospitalViewModal({
  open,
  hospital,
  onClose,
}) {
  if (!open || !hospital) return null;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Building2 className="text-indigo-600" size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {hospital.hospital_name}
              </h2>

              <div className="flex items-center gap-3 mt-1">

                <span className="text-sm text-slate-500">
                  Client : {hospital.client_code}
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    hospital.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {hospital.status}
                </span>

              </div>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X />
          </button>

        </div>

        <div className="p-6 space-y-6">

          {/* Hospital Info */}

          <div className="grid md:grid-cols-2 gap-5">
            
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building2 size={18} />
                Hospital Information
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Hospital Type</span>
                  <strong>{hospital.hospital_type || "-"}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Beds</span>
                  <strong>{hospital.beds || 0}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Hospital Owner</span>
                  <strong>{hospital.hospital_owner || "-"}</strong>
                </div>

              </div>

            </div>

            {/* BDE */}

            <div className="border rounded-xl p-5">

              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BadgePercent size={18} />
                BDE Details
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>BDE Name</span>
                  <strong>{hospital.bde_name || "-"}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Commission</span>
                  <strong>
                    {hospital.bde_percentage
                      ? `${hospital.bde_percentage}%`
                      : "-"}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Remarks</span>
                  <strong>{hospital.remarks || "-"}</strong>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <User size={18} />
                  Contact Information
                </h3>
            {hospital.contacts?.length ? (
              hospital.contacts.map((contact, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 mb-3 last:mb-0"
                >
                  <div className="flex items-center gap-2">
                    <User size={15} />
                    <strong>{contact.contact_person}</strong>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FileText size={15} />
                    {contact.contact_designation}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={15} />
                    {contact.mobile}
                  </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail size={15} />
                      {contact.email}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Contacts Available</p>
              )}
            </div>
            {/* Address */}
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin size={18} />
                Address
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>City :</strong> {hospital.city || "-"}
                </div>
                <div>
                  <strong>State :</strong> {hospital.state || "-"}
                </div>
                <div>
                  <strong>Address :</strong>
                  <br />
                  {hospital.address || "-"}
                </div>

              </div>

            </div>

            {/* Agreement */}
            <div className="border rounded-xl p-5 md:col-span-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar size={18} />
                Agreement Details
              </h3>

              <div className="grid md:grid-cols-4 gap-4 text-sm">

                <div>
                  <p className="text-slate-500">Agreement Days</p>
                  <strong>{hospital.agreement_days || 0}</strong>
                </div>

                <div>
                  <p className="text-slate-500">Start Date</p>
                  <strong>
                    {formatDate(hospital.agreement_date)}
                  </strong>
                </div>

                <div>
                  <p className="text-slate-500">Expiry Date</p>
                  <strong>
                    {formatDate(hospital.agreement_expiry)}
                  </strong>
                </div>

                <div>
                  <p className="text-slate-500">Payment Terms</p>
                  <strong>
                    {hospital.payment_terms || "-"}
                  </strong>
                </div>
              </div>
            </div>
            {/* Requirements */}
            <div className="border rounded-xl p-5 md:col-span-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BedDouble size={18} />
                Current Requirements
              </h3>

              <div className="flex flex-wrap gap-2">


                {hospital.position_summary ? (
                  hospital.position_summary
                    .split(", ")
                    .map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-xs"
                      >
                        {item}
                      </span>
                    ))
                ) : (
                  <span>No Active Requirement</span>
                )}

              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}