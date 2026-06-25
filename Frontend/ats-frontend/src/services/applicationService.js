
import axios from "axios";
const API =
"http://localhost:5000/api/applications";
export const getApplications = async () => {
  const response = await axios.get(API);
  return response.data;
};
export const updateApplication = async (
id,
data
) => {
  const response = await axios.put(
    `${API}/${id}`,
    data
  );
  return response.data;
};
export const deleteApplication = async (
id
) => {
  const response = await axios.delete(
    `${API}/${id}`
  );
  return response.data;
};
export const getApplicationStats = async () => {
  const response = await axios.get(
    `${API}/stats`
  );
  return response.data;
};