// src/services/authService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Adjust the URL as needed
  withCredentials: true, // Ensure cookies are sent
});

// Authentication endpoints
export const register = async (userData) => await API.post("/register", userData);
export const login = async (credentials) => await API.post("/login", credentials);
export const logout = async () => await API.post("/logout");

// Password reset endpoints
export const forgotPassword = async (email) => 
  await API.post("/forgot-password", { email });

export const resetPassword = async (token, newPassword) => 
  await API.post("/reset-password", { token, password: newPassword });

// Error handler helper
const handleError = (error) => {
  const message = error.response?.data?.message || "An error occurred";
  throw new Error(message);
};

// Enhanced versions with error handling
export const forgotPasswordWithError = async (email) => {
  try {
    const response = await forgotPassword(email);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPasswordWithError = async (token, newPassword) => {
  try {
    const response = await resetPassword(token, newPassword);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
