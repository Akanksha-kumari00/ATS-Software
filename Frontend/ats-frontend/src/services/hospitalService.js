import api from "./api";

const hospitalService = {
  getHospitals() {
    return api.get("/hospitals");
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