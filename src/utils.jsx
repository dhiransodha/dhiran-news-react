import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dhiran-news.onrender.com/api",
  timeout: 5000,
});

export default apiClient;
