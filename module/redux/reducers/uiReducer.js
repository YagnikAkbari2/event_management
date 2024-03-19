import {
  RESET_UI_ACTION,
  SET_CUSTOM_UI_ACTION,
  SET_IS_ADD_MODAL_SHOW,
  SET_IS_COMMON_FORM,
  SET_KEY_DOWN_VALUE,
  SET_MENU_FIELD,
  SET_PUBLISH_MODULE_SUCCESS,
  SET_SHOW_ADD_MODAL,
  SET_UI_ACTION,
} from "../actions/uiAction";

const initialState = {
  isSuccess: false,
  isError: false,
  customPayload: null,
  isPublishSuccess: false,
  keyDownValue: "",
  isCommonForm: false,
  isAddModalShow: false,
  activeMenuField: "dashboard",
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_ACTION:
      return {
        ...state,
        isSuccess: true,
        customPayload: action.payload,
      };
    case SET_CUSTOM_UI_ACTION:
      return {
        ...state,
        customPayload: action.payload,
      };
    case RESET_UI_ACTION:
      return {
        ...state,
        isSuccess: false,
        customPayload: null,
        isPublishSuccess: false,
        isAddModalShow: false,
      };
    case SET_PUBLISH_MODULE_SUCCESS:
      return {
        ...state,
        isPublishSuccess: true,
      };
    case SET_KEY_DOWN_VALUE:
      return {
        ...state,
        keyDownValue: action.payload,
      };
    case SET_IS_COMMON_FORM:
      return {
        ...state,
        isCommonForm: action.payload,
      };
    case SET_IS_ADD_MODAL_SHOW:
      return {
        ...state,
        isAddModalShow: true,
      };
    case SET_MENU_FIELD:
      return {
        ...state,
        activeMenuField: action.payload,
      };
    default:
      return state;
  }
};
export default uiReducer;
