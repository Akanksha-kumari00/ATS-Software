import axios from "axios";

const API = "http://localhost:5000/api/jobs";

export const getJobs = (filters) => axios.get(API, {params: filters,});

export const getJobStats = () => axios.get(`${API}/stats`);

export const getJobById = (id) =>axios.get(`${API}/${id}`);

export const deleteJob = (id) =>  axios.delete(`${API}/${id}`);

export const updateJob = (id, data) => axios.put(`${API}/${id}`, data);

export const createJob = (data) => axios.post(API, data);