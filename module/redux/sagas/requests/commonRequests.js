import { get, post } from "../../apiWrapper";

export const storeSearchApi = (data) => {
  return get(`/store/search${data ? "?" + data : ""}`);
};
