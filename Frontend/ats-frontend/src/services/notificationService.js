import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const getNotifications = async () => {
    try {
        const response = await axios.get(API);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const markAsRead = async (id) => {
    return await axios.put(
        `http://localhost:5000/api/notifications/${id}/read`
    );
};