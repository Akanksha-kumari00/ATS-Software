import axios from "axios";


export const getApplicationStats = () => {
  return axios.get("http://localhost:5000/api/stats");
};