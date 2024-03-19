export const USER_LOGIN = "USER_LOGIN";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_VERIFY_PASSWORD = "USER_VERIFY_PASSWORD";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const userLogin = (payload) => {

    return {
        type: USER_LOGIN,
        payload
    }
}
export const logoutUser = (payload) => {
    return {
        type: USER_LOGOUT,
        payload,
    };
};
export const getVerifyPassword = (payload) => {
    return {
      type: USER_VERIFY_PASSWORD,
      payload,
    };
  };