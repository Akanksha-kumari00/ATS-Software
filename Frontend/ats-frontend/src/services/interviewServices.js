import axios from "axios";

const API = "http://localhost:5000/api";

export const getInterviews = () => {
  return axios.get(`${API}/interviews`);
};
export const updateInterviewStatus = (id, status) => {
  return axios.put(
    `http://localhost:5000/api/interviews/status/${id}`,
    {
      interview_status: status
    }

  );
};
export const getScheduleCandidates = () => {
  return axios.get(
    `${API}/interviews/schedule-candidates`
  );
};
export const getInterviewStats = () => {
  return axios.get(`${API}/interviews/stats`);
};

export const scheduleInterview = (
  id,
  data
) => {
  return axios.put(
    `${API}/interviews/schedule/${id}`,
    data
  );
};
