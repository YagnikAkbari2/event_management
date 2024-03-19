import { get, post } from "../../apiWrapper";

export const loginApi = (data) => {
  return post(`/login`, data.payload);
};
export const verifyPasswordApi = (data) => {
  return post(`/user/email/verify`, data.payload);
};
