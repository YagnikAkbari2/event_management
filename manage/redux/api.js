import axios from "axios";
import { tokens } from "../commonjs/common";
export const BASE_URL_STORE_OPS =
  process.env.NEXT_PUBLIC_BASE_URL_STORE_OPS || `https://opsapi-v2.mkart.dev/api/v1`;
const api = (BASE_URL) => {
  // initialize axios
  const service = axios.create({
    baseURL: BASE_URL ?? BASE_URL_STORE_OPS,
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
        config.headers.location =
          localStorage.getItem("active_store_id") ?? "1";
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
