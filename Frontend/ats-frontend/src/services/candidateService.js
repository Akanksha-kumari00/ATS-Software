import axios from "axios";
const API = "http://localhost:5000/api/candidates";
export const importCandidates = async (formData) => {
  return await axios.post(`${API}/import`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// Get all candidates
export const getCandidates = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  }
  catch (error) {
    console.log(error);
    return [];
  }
};
// Add candidate
export const addCandidate = async (formData) => {
  try {
    const response = await axios.post(
      API,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};
// Update Candidate
export const updateCandidate = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCandidate = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};