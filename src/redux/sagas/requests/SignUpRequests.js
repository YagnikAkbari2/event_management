import { post } from "../../apiWrapper";

export const userSignupApi = (data) => {
  return post(`/api/user/signup`, data);
};
