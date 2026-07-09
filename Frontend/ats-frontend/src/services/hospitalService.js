import api from "./api";

const hospitalService = {
  getHospitals(page = 1, limit = 10) {
  return api.get(`/hospitals?page=${page}&limit=${limit}`);
},

  getStats() {
    return api.get("/hospitals/stats");
  },

  createHospital(data) {
    return api.post("/hospitals", data);
  },

  updateHospital(id, data) {
    return api.put(`/hospitals/${id}`, data);
  },

  deleteHospital(id) {
    return api.delete(`/hospitals/${id}`);
  },
};

export default hospitalService;