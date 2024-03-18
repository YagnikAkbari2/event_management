import {
  SET_USERS_LIST,
  SET_USER,
  SET_USER_LOGIN_DETAILS,
  LOADING_ACTION,
  SET_STORE_SEARCH,
  SET_CURRENT_STORE_DATA,
  RESET_USER_DATA,
  SET_CITY_SEARCH,
} from "../actions/userAction";

const initialState = {
  usersList: [],
  user: "",
  isLoading: false,
  userListMeta: {},
  userDetails: "",
  userList: [],
  userListDataMeta: {},
  storeListData: [],
  editUserData: {},
  currentStoreData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return {
        ...state,
        usersList: [...action.payload.user],
        userListMeta: action.payload.meta,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case SET_USER_LOGIN_DETAILS:
      return {
        ...state,
        userDetails: action.payload?.user,
      };

    case SET_STORE_SEARCH:
      return {
        ...state,
        storeListData: action.payload?.data ?? [],
      };
    case SET_CITY_SEARCH:
      return {
        ...state,
        cityListData: action?.payload?.data ?? [],
      };
    case LOADING_ACTION:
      return {
        ...state,
        isLoading: action.payload?.isLoading,
      };
    case SET_CURRENT_STORE_DATA:
      localStorage.setItem("active_store_id", action?.payload?.id);
      localStorage.setItem("active_store_name", action?.payload?.name);
      return {
        ...state,
        currentStoreData: action.payload,
      };
    case RESET_USER_DATA:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
