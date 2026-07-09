import axios from "axios";

const API = "http://localhost:5000/api/interviews";

export const getInterviews = (page = 1, limit = 10) => {
  return axios.get(`${API}?page=${page}&limit=${limit}`);
};

export const updateInterviewStatus = (id, status) => {
  return axios.put(`${API}/status/${id}`, {
    interview_status: status,
  });
};

export const getScheduleCandidates = () => {
  return axios.get(`${API}/schedule-candidates`);
};

export const getInterviewStats = () => {
  return axios.get(`${API}/stats`);
};

export const scheduleInterview = (id, data) => {
  return axios.put(`${API}/schedule/${id}`, data);
};