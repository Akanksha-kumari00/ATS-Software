import axios from "axios";
const API = "http://localhost:5000/api/candidates";
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
    //DELETE
export const deleteCandidate = async (id) => {

  try {

    await axios.delete(

      `${API}/${id}`

    );

  }

  catch(error){

    console.log(error);

    throw error;

  }

};