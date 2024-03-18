import { get, post, put, remove } from "../../apiWrapper";

export const getUsersListApi = (data) => {
  return get(`/master/user?${data}`);
};
export const getUserApi = (data) => {
  return get(`/master/user/${data}`);
};
export const updateUserDetailsApi = (data) => {
  return put(`/master/user/update/${data.id}`, data);
};
export const addUserDetailsApi = (data) => {
  return post(`/master/user`, data);
};
export const updateUserStatusApi = (data) => {
  return post(`/master/user/bulk`, data);
};
export const deleteUserApi = (data) => {
  return remove(`/master/user/${data}`);
};
export const userLogedInApi = () => {
  return get(`/master/user/current-user/data`);
};

export const storeSearchApi = (data) => {
  return get(`/store/search?${data}`);
};
export const citySearchApi = (data) => {
  return get(`/store/city?${data}`);
};
export const changePasswordUserApi = (data) => {
  return put(`master/user/change-password/${data?.id}`, data.userDetails);
};
