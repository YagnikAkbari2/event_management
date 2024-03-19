export const ADD_TOASTER = "ADD_TOASTER";
export const RESET_ERR_MSG = "RESET_ERR_MSG";
export const SET_ERR_MSG = "SET_ERR_MSG";

export const getToaster = (payload) => {
  
  return {
    type: ADD_TOASTER,
    payload,
  };
};
export const resetErrMsg = (payload) => {
  return {
    type: RESET_ERR_MSG,
    payload,
  };
};
