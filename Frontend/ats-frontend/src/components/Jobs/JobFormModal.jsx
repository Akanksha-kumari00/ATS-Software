import { useEffect, useState } from "react";
const initialState = {
  job_code: "",
  position_title: "",
  specialization: "",
  hospital_id: "",
  recruiter_id: "",
  vacancies: "",
  min_experience: "",
  max_experience: "",
  min_salary: "",
  max_salary: "",
  accommodation: "Yes",
  opening_date: "",
  status: "Open",
};
export default function JobFormModal({
  open,
  onClose,
  onSave,
  job,
  mode = "add",
  hospitals = [],
  recruiters = [],
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (mode === "edit" && job) {
      setForm(job);
    } else {
      setForm(initialState);
    }
  }, [job, mode]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[900px] max-h-[90vh] overflow-y-auto p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {mode === "add" ? "Add New Job" : "Edit Job"}
          </h2>

          <button onClick={onClose}>✖</button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="job_code"
            value={form.job_code}
            onChange={handleChange}
            placeholder="Job Code"
            className="border rounded-lg p-2"
          />
          <input
            name="position_title"
            value={form.position_title}
            onChange={handleChange}
            placeholder="Position Title"
            className="border rounded-lg p-2"
          />
          <input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="border rounded-lg p-2"
          />
          <select
            name="hospital_id"
            value={form.hospital_id}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="">Select Hospital</option>

            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>
                {h.hospital_name}
              </option>
            ))}
          </select>

          <select
            name="recruiter_id"
            value={form.recruiter_id}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="">Select Recruiter</option>

            {recruiters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <input
            name="vacancies"
            type="number"
            value={form.vacancies}
            onChange={handleChange}
            placeholder="Vacancies"
            className="border rounded-lg p-2"
          />

          <input
            name="min_experience"
            type="number"
            value={form.min_experience}
            onChange={handleChange}
            placeholder="Min Experience"
            className="border rounded-lg p-2"
          />

          <input
            name="max_experience"
            type="number"
            value={form.max_experience}
            onChange={handleChange}
            placeholder="Max Experience"
            className="border rounded-lg p-2"
          />
          <input
            name="min_salary"
            type="number"
            value={form.min_salary}
            onChange={handleChange}
            placeholder="Min Salary"
            className="border rounded-lg p-2"
          />
          <input
            name="max_salary"
            type="number"
            value={form.max_salary}
            onChange={handleChange}
            placeholder="Max Salary"
            className="border rounded-lg p-2"
          />
          <select
            name="accommodation"
            value={form.accommodation}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option>Yes</option>
            <option>No</option>
          </select>
          <input
            type="date"
            name="opening_date"
            value={form.opening_date}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option>Open</option>
            <option>On Hold</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            {mode === "add" ? "Save Job" : "Update Job"}
          </button>
        </div>
      </div>
    </div>
  );
}