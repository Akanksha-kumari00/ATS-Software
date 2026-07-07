import { useEffect, useState } from "react";

const initialState = {
  position_title: "",
  specialization: "",
  hospital_id: "",
  recruiter_name:"",
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
}) {
  const [errors, setErrors] = useState({});
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
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};
  const validateForm = () => {
  const newErrors = {};

  if (!form.position_title.trim())
    newErrors.position_title = "Position Title is required";

  if (!form.specialization.trim())
    newErrors.specialization = "Specialization is required";

  if (!form.hospital_id)
    newErrors.hospital_id = "Please select Hospital";

  if (!form.vacancies)
    newErrors.vacancies = "Vacancies is required";

  if (!form.opening_date)
    newErrors.opening_date = "Opening Date is required";

  if (
    form.min_experience &&
    form.max_experience &&
    Number(form.min_experience) > Number(form.max_experience)
  ) {
    newErrors.max_experience =
      "Max Experience must be greater than Min Experience";
  }

  if (
    form.min_salary &&
    form.max_salary &&
    Number(form.min_salary) > Number(form.max_salary)
  ) {
    newErrors.max_salary =
      "Max Salary must be greater than Min Salary";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
 const handleSubmit = () => {
  if (!validateForm()) return;

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
              name="position_title"
              value={form.position_title}
              onChange={handleChange}
              placeholder="Position Title"
              className={`border rounded-lg p-2 ${
                errors.position_title ? "border-red-500" : ""
              }`}
            />

            {errors.position_title && (
              <p className="text-red-500 text-sm">
                {errors.position_title}
              </p>
            )}
          <input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className={`border rounded-lg p-2 ${
             errors.specialization ? "border-red-500" : ""
              }`}
          />
          {errors.specialization && (
              <p className="text-red-500 text-sm">
                {errors.specialization}
              </p>
            )}
          <select
            name="hospital_id"
            value={form.hospital_id}
            onChange={handleChange}
            className={`border rounded-lg p-2 ${
              errors.hospital_id ? "border-red-500" : ""
            }`}
          >
            
            <option value="">Select Hospital</option>

            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>
                {h.hospital_name}
              </option>
            ))}
          </select>
          {errors.hospital_id && (
              <p className="text-red-500 text-sm">
                {errors.hospital_id}
              </p>
            )}
      
            <input
              type="text"
              name="recruiter_name"
              value={form.recruiter_name}
              onChange={handleChange}
              placeholder="Recruiter Name"
              className="border rounded-lg p-2 w-full"
            />

  
          <input
            name="vacancies"
            type="number"
            value={form.vacancies}
            onChange={handleChange}
            placeholder="Vacancies"
            className={`border rounded-lg p-2 ${
                errors.vacancies? "border-red-500" : ""
              }`}
            />

            {errors.vacancies && (
              <p className="text-red-500 text-sm">
                {errors.vacancies}
              </p>
            )}

          <input
            name="min_experience"
            type="number"
            value={form.min_experience}
            onChange={handleChange}
            placeholder="Min Experience"
            className={`border rounded-lg p-2 ${
                errors.min_experience ? "border-red-500" : ""
              }`}
            />

            {errors.min_experiencei && (
              <p className="text-red-500 text-sm">
                {errors.min_experience}
              </p>
            )}

          <input
            name="max_experience"
            type="number"
            value={form.max_experience}
            onChange={handleChange}
            placeholder="Max Experience"
           className={`border rounded-lg p-2 ${
                errors.max_experience ? "border-red-500" : ""
              }`}
            />

            {errors.max_experience && (
              <p className="text-red-500 text-sm">
                {errors.max_experience}
              </p>
            )}
          <input
            name="min_salary"
            type="number"
            value={form.min_salary}
            onChange={handleChange}
            placeholder="Min Salary"
            className={`border rounded-lg p-2 ${
                errors.min_salary ? "border-red-500" : ""
              }`}
            />

            {errors.min_salary && (
              <p className="text-red-500 text-sm">
                {errors.min_salary}
              </p>
            )}
          <input
            name="max_salary"
            type="number"
            value={form.max_salary}
            onChange={handleChange}
            placeholder="Max Salary"
            className={`border rounded-lg p-2 ${
                errors.max_experience ? "border-red-500" : ""
              }`}
            />

            {errors.max_experience && (
              <p className="text-red-500 text-sm">
                {errors.max_experience}
              </p>
            )}
          <select
            name="accommodation"
            value={form.accommodation}
            onChange={handleChange}
            className={`border rounded-lg p-2 ${
              errors.accommodation ? "border-red-500" : ""
            }`}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
          {errors.accommodation && (
              <p className="text-red-500 text-sm">
                {errors.accommodation}
              </p>
            )}
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
            className={`border rounded-lg p-2 ${
              errors.status ? "border-red-500" : ""
            }`}
          >
            <option>Open</option>
            <option>On Hold</option>
            <option>Closed</option>
          </select>
          {errors.status && (
              <p className="text-red-500 text-sm">
                {errors.status}
              </p>
            )}
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