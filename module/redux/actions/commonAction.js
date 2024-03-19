export const GET_STORE_LIST = "GET_STORE_LIST";
export const SET_STORE_LIST = "SET_STORE_LIST";
export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};
