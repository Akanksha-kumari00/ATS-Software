import axios from "axios";

const API = "http://localhost:5000/api/jobs";

//export const getJobs = () => axios.get(API);
export const getJobs = (filters) =>
  axios.get(API, {
    params: filters,
  });
export const getJobStats = () => axios.get(`${API}/stats`);
