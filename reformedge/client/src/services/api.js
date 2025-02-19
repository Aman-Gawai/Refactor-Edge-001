// client/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if necessary
  withCredentials: true, // Ensures cookies are sent
});

export default API;
