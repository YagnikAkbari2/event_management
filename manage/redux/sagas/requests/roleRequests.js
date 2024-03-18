import { get, put, post, remove, patch } from "../../apiWrapper";

export const getRoleListApi = (data) => {
  return get(`/master/roles?${data}`);
};

export const bulkRoleUpdateApi = (data) => {
  return post(`/master/roles/bulk`, data);
};

export const getSingleRoleApi = (data) => {
  return get(`/master/roles/${data}`);
};

export const getRolesApi = (data) => {
  return get(`/master/module`);
};

export const createRoleApi = (data) => {
  return post(`/master/roles/roles-permission`, data);
};
