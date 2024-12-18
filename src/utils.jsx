import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://dhiran-news.onrender.com/api",
  timeout: 5000,
});

export const getDataFromApi = async (name, params) => {
  return apiClient.get(`/${name}`, { params }).then(({ data }) => data);
};

export default apiClient;
