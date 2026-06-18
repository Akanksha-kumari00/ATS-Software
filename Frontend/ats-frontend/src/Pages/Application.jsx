import { useState } from "react";
import { addCandidate } from "../services/candidateService";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function Application() {
const navigate = useNavigate();
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

    status: "New",

    interview_status: "",

    interview_date: "",

    interview_time: "",

    remarks: "",

    cv: null

  });

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

      data.append(key, formData[key]);

    });

    await addCandidate(data);

    alert("Candidate Added Successfully");

    navigate("/candidates");

  }

  catch (error) {

    console.log(error);

    alert("Save Failed");

  }

};

  return (

    <div className="flex h-screen bg-[#f5f7fb]">

      <Sidebar />

      <div className="flex-1 overflow-y-auto">

        <Topbar title="Add Candidate" />

        <div className="p-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-semibold mb-6">

              Add Candidate

            </h2>

            <form

              onSubmit={handleSubmit}

              className="grid grid-cols-2 gap-4"

            >

              <input

                required

                name="recruiter_name"

                placeholder="Recruiter Name"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                required

                name="candidate_name"

                placeholder="Candidate Name"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                name="education"

                placeholder="Education"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                name="specialization"

                placeholder="Specialization"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                required

                name="mobile"

                placeholder="Mobile"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                name="email"

                placeholder="Email"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                name="hospital_name"

                placeholder="Hospital Name"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                name="hospital_location"

                placeholder="Hospital Location"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                type="date"

                name="cv_forward_date"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                name="salary_expectation"

                placeholder="Salary Expectation"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <select

                name="status"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              >

                <option>New</option>

                <option>CV Shared</option>

                <option>Shortlisted</option>

                <option>Interview</option>

                <option>Selected</option>

                <option>Rejected</option>

              </select>

              <input

                name="interview_status"

                placeholder="Interview Status"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                type="date"

                name="interview_date"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <input

                type="time"

                name="interview_time"

                onChange={handleChange}

                className="border p-3 rounded-xl"

              />

              <div className="col-span-2">

                <input

                  type="file"

                  name="cv"

                  accept=".pdf,.doc,.docx"

                  onChange={handleChange}

                  className="border p-3 rounded-xl w-full"

                />

              </div>

              <div className="col-span-2">

                <textarea

                  name="remarks"

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

                  Save Candidate

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