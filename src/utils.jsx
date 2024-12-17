import axios from "axios";
import LoadingContext, { ErrorContext } from "./Contexts";
import { useContext } from "react";

export const apiClient = axios.create({
  baseURL: "https://dhiran-news.onrender.com/api",
  timeout: 5000,
});

const useApiGet = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { setIsError } = useContext(ErrorContext);
  
  const get = async (name, params) => {
    setIsLoading(true);
    setIsError(false);
    return apiClient
      .get(`/${name}`, { params })
      .then(({ data }) => {
        setIsLoading(false);
        return data;
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return { get };
};

export default useApiGet;
