import axios from "axios";
import { scheduleInterview } from "../../services/interviewServices";
import { useEffect, useState } from "react";
export default function ScheduleInterviewModal({
  closeModal,
}) {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({
    candidateId: "",
    interview_date: "",
    interview_time: "",
  });
  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/candidates/shortlisted"
      );
      setCandidates(res.data);
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCandidates()
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
  }
  catch (error) {
    console.log(error);
  }
};
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Schedule Interview
          </h2>
          <button
            onClick={closeModal}
            className="text-2xl"
          >
            ×
          </button>
        </div>
        <select
          name="candidateId"
          value={form.candidateId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4 outline-none"
        >
          <option value="">
            Select Candidate
          </option>
          {candidates.map((candidate) => (
            <option
              key={candidate.id}
              value={candidate.id}
            >
              {candidate.candidate_name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="interview_date"
          value={form.interview_date}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-2 outline-none"
        />
        <input
          type="time"
          name="interview_time"
          value={form.interview_time}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-3 outline-none"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="border px-3 py-1 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
            >
              Save
          </button>
        </div>
      </div>
    </div>

  );
}