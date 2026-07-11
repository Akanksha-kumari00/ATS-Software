import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addCandidate, updateCandidate, } from "../services/candidateService";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
function Application() {
const navigate = useNavigate();
const location = useLocation();

const editCandidate = location.state?.candidate;
const isEdit = location.state?.isEdit;
const [formData, setFormData] = useState({
    recruiter_name: "",
    candidate_name: "",
    education: "",
    specialization: "",
    mobile: "",
    email: "",
    hospital_name: "",
    hospital_location: "",
    cv_forward_date: "",
    salary_expectation: "",
    experience: "",
    status: "New",
    interview_status: "",
    interview_date: "",
    interview_time: "",
    remarks: "",
    cv: null
  });
  useEffect(() => {
  if (isEdit && editCandidate) {
    setFormData({
      ...editCandidate,
      cv: null,
    });
  }
}, [isEdit, editCandidate]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData({
        ...formData,
        cv: files[0]
      });
    }
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    if (formData.cv_forward_date) {
      data.set(
        "cv_forward_date",
        formData.cv_forward_date.split("T")[0]
      );
    }

    if (formData.interview_date) {
      data.set(
        "interview_date",
        formData.interview_date.split("T")[0]
      );
    }

    if (isEdit) {
      await updateCandidate(editCandidate.id, data);
      alert("Candidate Updated Successfully");
    } else {
      await addCandidate(data);
      alert("Candidate Added Successfully");
    }

    navigate("/candidates");

  } catch (error) {
    console.log(error);
    alert("Save Failed");
  }
};
const handleFileChange = (e) => {
  setFormData({
    ...formData,
    cv: e.target.files[0],
  });
};
  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Topbar title="Add Candidate" />
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow p-6">
           <h2 className="text-2xl font-semibold mb-6">
            {isEdit ? "Edit Candidate" : "Add Candidate"}
          </h2>
              <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4"
            >
              <input
                required
                name="recruiter_name"
                placeholder="Recruiter Name"
                value={formData.recruiter_name || ""}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                required
                name="candidate_name"
                placeholder="Candidate Name"
                 value={formData.candidate_name || ""}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
               <input
                required
                name="gender"
                value={formData.gender || ""}
                placeholder="Gender"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
               required
                name="education"
                value={formData.education || ""}
                placeholder="Education"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="specialization"
                 value={formData.specialization || ""}
                placeholder="Specialization"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                required
                name="mobile"
                 value={formData.mobile || ""}
                placeholder="Mobile"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="email"
                 value={formData.email || ""}
                placeholder="Email"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="hospital_name"
                 value={formData.hospital_name || ""}
                placeholder="Hospital Name"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="hospital_location"
                 value={formData.hospital_location || ""}
                placeholder="Hospital Location"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                type="date"
                name="cv_forward_date"
                 value={formData.cv_forward_date || ""}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="salary_expectation"
                 value={formData.salary_expectation || ""}
                placeholder="Salary Expectation"
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
               <input
                  name="experience"
                  value={formData.experience || ""}
                  placeholder="Experience"
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                />
              <select
                name="status"
                 value={formData.status || ""}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              >
                <option>New</option>
                <option>CV Shared</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Selected</option>
                <option value="Dropout">Dropout</option>
                <option>Rejected</option>
              </select>
             <select
                name="interview_status"
                value={formData.interview_status || ""}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              >
            <option value="">Select Interview Status</option>
            <option value="Pending">Pending</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
              <input
                type="date"
                name="interview_date"
                value={formData.interview_date || ""}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                type="time"
                name="interview_time"
                value={formData.interview_time}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              
              <div>
  <label>Upload CV</label>

        {/* Current Resume */}
        {formData.cv_name && (
          <div className="mb-2">
            <span className="text-sm text-gray-600">
              Current Resume:
            </span>{" "}
            <a
              href={`http://localhost:5000/${formData.cv_path.replace(/\\/g, "/")}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {formData.cv_name}
            </a>
          </div>
        )}

          {/* Upload New Resume */}
          <input
            type="file"
            name="cv"
            onChange={handleFileChange}
          />
        </div>
              <div className="col-span-2">
                <textarea
                  name="remarks"
                   value={formData.remarks}
                  placeholder="Remarks"
                  onChange={handleChange}
                  className="border w-full p-3 rounded-xl h-28"
                />
              </div>
              <div className="col-span-2">
               <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                {isEdit ? "Update Candidate" : "Save Candidate"}
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Application;