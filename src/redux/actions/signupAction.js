export const USER_SIGNUP = "USER_SIGNUP";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";

export const userSignup = (payload) => {
  return {
    type: USER_SIGNUP,
    payload,
  };
};
