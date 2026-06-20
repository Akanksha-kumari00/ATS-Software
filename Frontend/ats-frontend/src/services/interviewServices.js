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
export const scheduleInterview = (
  id,
  data
) => {
  return axios.put(
    `${API}/interviews/schedule/${id}`,
    data
  );
};
