
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  client_code: "",
  hospital_name: "",
  hospital_type: "",

  hospital_owner: "",
  bde_name: "",
  bde_percentage: "",

  agreement_days: "",
  agreement_date: "",
  agreement_expiry: "",
  payment_terms: "",

  contact_person: "",
  contact_designation: "",
  email: "",
  mobile: "",

  city: "",
  state: "",
  address: "",

  beds: "",
  position_summary: "",

  remarks: "",
  status: "Active",
};

export default function AddHospitalModal({
  open,
  onClose,
  onSave,
  editData = null,
}) {
  const [form, setForm] = useState(initialForm);
  const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
 useEffect(() => {
  if (editData) {
    setForm({
      ...editData,
      agreement_date: formatDate(editData.agreement_date),
      agreement_expiry: formatDate(editData.agreement_expiry),
    });
  } else {
    setForm(initialForm);
  }
}, [editData, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-bold">
            {editData ? "Edit Hospital" : "Add Hospital"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-4">

            <input name="client_code" placeholder="Client Code" value={form.client_code} onChange={handleChange} className="border p-3 rounded-xl" required />

            <input name="hospital_name" placeholder="Hospital Name" value={form.hospital_name} onChange={handleChange} className="border p-3 rounded-xl" required />

            <select name="hospital_type" value={form.hospital_type} onChange={handleChange} className="border p-3 rounded-xl">
              <option value="">Select Type</option>
              <option>Multi Specialty</option>
              <option>Super Specialty</option>
              <option>Medical College</option>
              <option>Clinic</option>
            </select>

            <input name="beds" type="number" placeholder="Beds" value={form.beds} onChange={handleChange} className="border p-3 rounded-xl" />

            <input name="hospital_owner" placeholder="Hospital Owner" value={form.hospital_owner} onChange={handleChange} className="border p-3 rounded-xl" />
          </div>

          {/* BDE + AGREEMENT */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">BDE & Agreement</h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input name="bde_name" placeholder="BDE Name" value={form.bde_name} onChange={handleChange} className="border p-3 rounded-xl" />

              <input name="bde_percentage" type="number" placeholder="BDE %" value={form.bde_percentage} onChange={handleChange} className="border p-3 rounded-xl" />

              <input name="agreement_days" type="number" placeholder="Agreement Days" value={form.agreement_days} onChange={handleChange} className="border p-3 rounded-xl" />

              <input name="payment_terms" placeholder="Payment Terms" value={form.payment_terms} onChange={handleChange} className="border p-3 rounded-xl" />

              <input type="date" name="agreement_date" value={form.agreement_date} onChange={handleChange} className="border p-3 rounded-xl" />

              <input type="date" name="agreement_expiry" value={form.agreement_expiry} onChange={handleChange} className="border p-3 rounded-xl" />
            </div>
          </div>

          {/* CONTACT */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Contact</h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input name="contact_person" placeholder="Contact Person" value={form.contact_person} onChange={handleChange} className="border p-3 rounded-xl" />

              <input name="contact_designation" placeholder="Designation" value={form.contact_designation} onChange={handleChange} className="border p-3 rounded-xl" />

              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-3 rounded-xl" />

              <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} className="border p-3 rounded-xl" />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Address</h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-3 rounded-xl" />

              <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border p-3 rounded-xl" />

              <textarea name="address" placeholder="Full Address" value={form.address} onChange={handleChange} className="border p-3 rounded-xl md:col-span-2" />
            </div>
          </div>
          {/* CURRENT REQUIREMENTS */}
              <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Current Requirements</h3>
                    <div className="space-y-2">
                      <textarea
                        name="position_summary"
                        value={form.position_summary}
                        onChange={handleChange}
                        rows={4}
                                  placeholder="Example:
                            Cardiologist - 2
                            ICU Nurse - 5
                            "
                                  className="w-full border p-3 rounded-xl resize-none"
                                />

                            <p className="text-xs text-gray-500">
                              Separate multiple requirements using comma (,)
                            </p>
                    </div>
            </div>

          {/* STATUS + REMARKS */}
          <div className="border-t pt-4 grid md:grid-cols-2 gap-4">

            <select name="status" value={form.status} onChange={handleChange} className="border p-3 rounded-xl">
              <option>Active</option>
              <option>Inactive</option>
              <option>Hold</option>
            </select>

            <input name="remarks" placeholder="Remarks" value={form.remarks} onChange={handleChange} className="border p-3 rounded-xl" />
          </div>
          {/* FOOTER */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={onClose} className="px-5 py-2 border rounded-xl">
              Cancel
            </button>

            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl">
              {editData ? "Update" : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}