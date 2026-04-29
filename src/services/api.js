import axios from "axios";
import axios from "axios";

const API = axios.create({
  baseURL: "https://tournest-backend.onrender.com/api/v1",
  withCredentials: true,
});

// Tours
export const getAllTours = () => API.get("/tours");
export const getTour = (id) => API.get(`/tours/${id}`);

// Auth
export const login = (data) => API.post("/users/login", data);
export const signup = (data) => API.post("/users/signup", data);
export const logout = () => API.get("/users/logout");

// User
export const getMe = () => API.get("/users/me");
export const updateMe = (data) => API.patch("/users/updateMe", data);

// Bookings
export const getMyBookings = () => API.get("/bookings/my-tours");

export default API;
