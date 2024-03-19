import { SET_LOGIN_DATA, USER_LOGOUT, VERIFY_SUCCESS } from "../actions/authAction";

const initialState = {
  userData: "",
  verifySuccess: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        userData: action?.payload,
      };
    case USER_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        userData: {},
      };
      case VERIFY_SUCCESS:
        console.log('reducerreducer',action.payload)
      return {
        ...state,
        verifySuccess: true,
      };  
    default:
      return state;
  }
};
export default authReducer;
