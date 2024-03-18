import { LOADING_ACTION } from "../actions/loaderAction";

const initialState = {
  isLoading: false,
  loadingMessage: "",
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ACTION:
      return {
        ...state,
        isLoading: action.payload?.isLoading,
      };

    default:
      return state;
  }
};
export default loaderReducer;
