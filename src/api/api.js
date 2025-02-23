import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const bookAppointment = async (data) => {
  return await axios.post(`${API_BASE_URL}/api/appointments`, data);
};

export const adminLogin = (data) =>
  axios.post(`${API_BASE_URL}/admin/login`, data);

export const getAppointments = async (token) => {
  return await axios.get(`${API_BASE_URL}/api/appointments`, {
    headers: { Authorization: token },
  });
};
