import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getAllTours = () => API.get("/tours");
export const getTour = (id) => API.get(`/tours/${id}`);
export const login = async (data) => {
  const res = await API.post("/users/login", data);
  if (res.data.status === "success") {
    localStorage.setItem("isLoggedIn", "true");
  }
  return res;
};

export const logout = async () => {
  const res = await API.get("/users/logout");
  localStorage.removeItem("isLoggedIn");
  return res;
};
export const signup = (data) => API.post("/users/signup", data);

export const getMe = () => API.get("/users/me");
export const updateMe = (data) => API.patch("/users/updateMe", data);
export const getMyBookings = () => API.get("/bookings/my-tours");

export default API;
