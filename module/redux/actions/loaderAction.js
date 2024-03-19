export const LOADING_ACTION = "LOADING_ACTION";

export const loadingAction = (payload) => {
  return {
    type: LOADING_ACTION,
    payload,
  };
};
