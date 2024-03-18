export const GET_ROLE_LIST = "GET_ROLE_LIST";
export const SET_ROLE_LIST = "SET_ROLE_LIST";

export const BULK_UPDATE_ROLE = "BULK_UPDATE_ROLE";

export const GET_SINGLE_ROLE = "GET_SINGLE_ROLE";
export const SET_SINGLE_ROLE = "SET_SINGLE_ROLE";

export const GET_ROLE_DATA = "GET_ROLE_DATA";
export const SET_ROLE_DATA = "SET_ROLE_DATA";

export const CREATE_ROLE_DATA = "CREATE_ROLE_DATA";

export const getRoleList = (payload) => {
  return {
    type: GET_ROLE_LIST,
    payload,
  };
};

export const bulkUpdateRole = (payload) => {
  return {
    type: BULK_UPDATE_ROLE,
    payload,
  };
};

export const getSingleRole = (payload) => {
  return {
    type: GET_SINGLE_ROLE,
    payload,
  };
};

export const getRoleData = (payload) => {
  return {
    type: GET_ROLE_DATA,
    payload,
  };
};

export const createRoleData = (payload) => {
  return {
    type: CREATE_ROLE_DATA,
    payload,
  };
};
