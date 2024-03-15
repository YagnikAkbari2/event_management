import axios from "axios";
import { tokens } from "./common";

export const BASE_URL_EVENT_MANAGEMENT =
  process.env.REACT_PUBLIC_BASE_URL_EVENT_MANAGEMENT ||
  "http://54.225.52.80:8000";

const api = (BASE_URL) => {
  // initialize axios
  const service = axios.create({
    baseURL: BASE_URL ?? BASE_URL_EVENT_MANAGEMENT,
    headers: {
      Authorization: "Bearer ",
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor
  service.interceptors.request.use(
    async function (config) {
      let token = await tokens.get();
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return service;
};

export default api;
