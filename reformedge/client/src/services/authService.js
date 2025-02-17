// src/services/authService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Adjust the URL as needed
  withCredentials: true, // Ensure cookies are sent
});

export const register = async (userData) => {
  return await API.post("/register", userData);
};

export const login = async (credentials) => {
  return await API.post("/login", credentials);
};

export const logout = async () => {
  return await API.post("/logout");
};

export const forgotPassword = async (email) => {
  return await API.post("/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
  return await API.post("/reset-password", { token, password: newPassword });
};
