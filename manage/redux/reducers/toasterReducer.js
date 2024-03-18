import {
  ADD_TOASTER,
  RESET_ERR_MSG,
  RESET_TOASTER,
  SET_ERR_MSG,
} from "../actions/toasterAction";

const initialState = {
  toasterData: "",
  errMsg: {},
};

const toasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOASTER:
      return {
        ...state,
        toasterData: action.payload,
      };
    case SET_ERR_MSG:
      return {
        ...state,
        errMsg: action?.payload,
      };
    case RESET_ERR_MSG:
      return {
        ...state,
        errMsg: {},
      };

    default:
      return state;
  }
};
export default toasterReducer;
