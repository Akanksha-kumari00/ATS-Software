import axios from "axios";

const API = "http://localhost:5000/api/resume";



export const getResumes = async (filters) => {
  const res = await axios.get(API, {
    params: filters,
  });

  return res.data;
};
export const deleteResume = async (id) => {
  return axios.delete(`${API}/${id}`);
};