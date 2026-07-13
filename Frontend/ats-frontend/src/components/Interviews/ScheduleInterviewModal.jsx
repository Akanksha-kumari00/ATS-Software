import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import { scheduleInterview } from "../../services/interviewServices";

export default function ScheduleInterviewModal({
  closeModal,
}) {
  const [candidates, setCandidates] = useState([]);

  const [form, setForm] = useState({
    candidateId: "",
    interview_date: "",
    interview_time: "",
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/candidates/shortlisted"
      );

      setCandidates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedCandidate = candidates.find(
    (c) => c.id == form.candidateId
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "candidateId") {
      const candidate = candidates.find(
        (c) => c.id == value
      );

      setForm({
        candidateId: value,
        interview_date:
          candidate?.interview_date?.slice(0, 10) || "",
        interview_time:
          candidate?.interview_time || "",
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      if (
        !form.candidateId ||
        !form.interview_date ||
        !form.interview_time
      ) {
        return alert("Please fill all fields");
      }

      await scheduleInterview(
        form.candidateId,
        {
          interview_date: form.interview_date,
          interview_time: form.interview_time,
        }
      );

      alert("Interview scheduled successfully");

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-start border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Schedule Interview
            </h2>

            <p className="text-gray-500 mt-1">
              Schedule or reschedule candidate interview
            </p>

          </div>

          <button
            onClick={closeModal}
            className="text-xl hover:bg-gray-100 rounded-full p-2"
          >
            <FaTimes />
          </button>

        </div>

        <div className="p-8">

          {/* Candidate */}

          <label className="font-semibold text-sm text-gray-700 mb-2 block">
            Candidate
          </label>

          <select
            name="candidateId"
            value={form.candidateId}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select Candidate
            </option>

            {candidates.map((candidate) => (
              <option
                key={candidate.id}
                value={candidate.id}
              >
                {candidate.candidate_name} •{" "}
                {candidate.specialization} •{" "}
                {candidate.hospital_name}
              </option>
            ))}
          </select>

          {/* Candidate Card */}

          {selectedCandidate && (
            <div className="mt-5 rounded-2xl border bg-blue-50 p-5">

              <div className="flex items-center gap-3">

                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

                  {selectedCandidate.candidate_name
                    ?.split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}

                </div>

                <div>

                  <h3 className="font-semibold text-lg">
                    {selectedCandidate.candidate_name}
                  </h3>

                  <p className="text-gray-600">
                    {selectedCandidate.specialization}
                  </p>

                </div>

              </div>

              <div className="mt-4 space-y-2 text-sm">

                <div className="flex items-center gap-2">
                  <FaHospital className="text-blue-600" />
                  {selectedCandidate.hospital_name}
                </div>

                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  {selectedCandidate.email}
                </div>

                <div className="text-gray-500">
                  {selectedCandidate.mobile}
                </div>

              </div>

            </div>
          )}

          {/* Date Time */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

            <div>

              <label className="font-semibold text-sm text-gray-700 mb-2 block">
                Interview Date
              </label>

              <div className="relative">

                <FaCalendarAlt className="absolute left-3 top-4 text-gray-400" />

                <input
                  type="date"
                  name="interview_date"
                  value={form.interview_date}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold text-sm text-gray-700 mb-2 block">
                Interview Time
              </label>

              <div className="relative">

                <FaClock className="absolute left-3 top-4 text-gray-400" />

                <input
                  type="time"
                  name="interview_time"
                  value={form.interview_time}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 mt-8">

            <button
              onClick={closeModal}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {selectedCandidate?.interview_date
                ? "Update Schedule"
                : "Schedule Interview"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}