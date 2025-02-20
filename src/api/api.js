import axios from "axios";

const API_URL = "http://localhost:5000/api";
const LOGIN_URL = "http://localhost:5000/admin";

export const bookAppointment = async (data) => {
  return await axios.post(`${API_URL}/appointments`, data);
};

export const adminLogin = (data) => axios.post(`${LOGIN_URL}/login`, data);

export const getAppointments = async (token) => {
  return await axios.get(`${API_URL}/appointments`, {
    headers: { Authorization: token },
  });
};
