import axios from "axios";
const API = "http://localhost:5000/api/dashboard";
export const getDashboardStats = async () => {
  const response = await axios.get(`${API}/stats`);
  return response.data;
};
export const getPipeline = async (period="thisMonth") => {
  const response = await axios.get(
    `http://localhost:5000/api/dashboard/pipeline?period=${period}`
  );
  return response.data;
};