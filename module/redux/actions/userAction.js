export const USER_LOGIN_DETAILS = "USER_LOGIN_DETAILS";
export const SET_USER_LOGIN_DETAILS = "SET_USER_LOGIN_DETAILS";
export const LOADING_ACTION = "LOADING_ACTION";
export const GET_STORE_SEARCH = "GET_STORE_SEARCH";
export const SET_STORE_SEARCH = "SET_STORE_SEARCH";
export const GET_CITY_SEARCH = "GET_CITY_SEARCH";
export const SET_CITY_SEARCH = "SET_CITY_SEARCH";
export const SET_CURRENT_STORE_DATA = "SET_CURRENT_STORE_DATA";
export const GET_USERS_LIST = "GET_USERS_LIST";
export const SET_USERS_LIST = "SET_USERS_LIST";
export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
export const ADD_USER_DETAILS = "ADD_USER_DETAILS";
export const UPDATE_USER_STATUS = "UPDATE_USER_STATUS";
export const DELETE_USER = "DELETE_USER";
export const CHANGE_PASSWORD_USER = "CHANGE_PASSWORD_USER";
export const RESET_USER_DATA = "RESET_USER_DATA";
export const getUserDetails = (payload) => {
  return {
    type: USER_LOGIN_DETAILS,
    payload,
  };
};
export const getUsersList = (payload) => {
  console.log("sasaasas");
  return {
    type: GET_USERS_LIST,
    payload,
  };
};
export const getUser = (payload) => {
  return {
    type: GET_USER,
    payload,
  };
};
export const updateUserDetails = (payload) => {
  return {
    type: UPDATE_USER_DETAILS,
    payload,
  };
};

export const addUserDetails = (payload) => {
  return {
    type: ADD_USER_DETAILS,
    payload,
  };
};

export const updateUserStatus = (payload) => {
  return {
    type: UPDATE_USER_STATUS,
    payload,
  };
};

export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};

export const loadingAction = (payload) => {
  return {
    type: LOADING_ACTION,
    payload,
  };
};
export const storeSearch = (payload) => {
  return {
    type: GET_STORE_SEARCH,
    payload,
  };
};
export const citySearch = (payload) => {
  return {
    type: GET_CITY_SEARCH,
    payload,
  };
};
export const changePasswordUser = (payload) => {
  return {
    type: CHANGE_PASSWORD_USER,
    payload,
  };
};
export const setCurrentStoreData = (payload) => {
  return {
    type: SET_CURRENT_STORE_DATA,
    payload,
  };
};
export const resetUserData = (payload) => {
  return {
    type: RESET_USER_DATA,
    payload,
  };
};
