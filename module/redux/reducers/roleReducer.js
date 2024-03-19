import {
  SET_ROLE_DATA,
  SET_ROLE_LIST,
  SET_SINGLE_ROLE,
} from "../actions/roleAction";
const initialState = {
  roleList: [],
  roleListMeta: "",
  createSuccess: false,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLE_LIST:
      return {
        ...state,
        roleList: [...action.payload.roles],
        roleListMeta: action.payload.meta,
        singleRole: null,
      };
    case SET_SINGLE_ROLE:
      return {
        ...state,
        singleRole: action.payload.roles,
      };
    case SET_ROLE_DATA:
      return {
        ...state,
        roleData: action.payload?.module,
      };

    default:
      return state;
  }
};
export default roleReducer;
