import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getAllTours = () => API.get("/tours");
export const getTour = (id) => API.get(`/tours/${id}`);
export const login = (data) => API.post("/users/login", data);
export const signup = (data) => API.post("/users/signup", data);
export const logout = () => API.get("/users/logout");
export const getMe = () => API.get("/users/me");
export const updateMe = (data) => API.patch("/users/updateMe", data);
export const getMyBookings = () => API.get("/bookings/my-tours");

export default API;
