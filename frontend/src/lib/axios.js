import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api" // Localhost in development
      : "https://itext-backend.onrender.com/api", // Deployed API in production
  withCredentials: true,
});
