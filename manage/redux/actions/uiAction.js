export const SET_UI_ACTION = "SET_UI_ACTION";
export const RESET_UI_ACTION = "RESET_UI_ACTION";
export const SET_CUSTOM_UI_ACTION = "SET_CUSTOM_UI_ACTION";
export const SET_PUBLISH_MODULE_SUCCESS = "SET_PUBLISH_MODULE_SUCCESS";
export const SET_KEY_DOWN_VALUE = "SET_KEY_DOWN_VALUE";
export const SET_IS_COMMON_FORM = "SET_IS_COMMON_FORM";
export const SET_IS_ADD_MODAL_SHOW = "SET_IS_ADD_MODAL_SHOW";
export const SET_MENU_FIELD = "SET_MENU_FIELD";
export const setUIAction = (payload) => {
  return {
    type: SET_UI_ACTION,
    payload,
  };
};

export const resetUIAction = (payload) => {
  return {
    type: RESET_UI_ACTION,
    payload,
  };
};
export const setPublishModuleSuccess = (payload) => {
  return {
    type: SET_PUBLISH_MODULE_SUCCESS,
    payload,
  };
};
export const handleKeyDownEventValue = (payload) => {
  return {
    type: SET_KEY_DOWN_VALUE,
    payload,
  };
};
export const setIsCommonForm = (payload) => {
  return {
    type: SET_IS_COMMON_FORM,
    payload,
  };
};
export const setIsAddModalShow = (payload) => {
  return { type: SET_IS_ADD_MODAL_SHOW, payload };
};
export const setActiveMenuField = (payload) => {
  return {
    type: SET_MENU_FIELD,
    payload,
  };
};
