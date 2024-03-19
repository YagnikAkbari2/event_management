export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const SET_PRODUCT_DETAILS = "SET_PRODUCT_DETAILS";
export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export const STORE_SEARCH_LOG = "STORE_SEARCH_LOG";
export const GET_SALES_ORDER_PRODUCTS = "GET_SALES_ORDER_PRODUCTS";
export const SET_SALES_ORDER_PRODUCTS = "SET_SALES_ORDER_PRODUCTS";
export const GET_STORE_LIST = "GET_STORE_LIST";
export const SET_STORE_LIST = "SET_STORE_LIST";
export const GET_STORE_DETAILS = "GET_STORE_DETAILS";
export const SET_STORE_DETAILS = "SET_STORE_DETAILS";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const getProductList = (payload) => {
  return {
    type: GET_PRODUCT_LIST,
    payload,
  };
};
export const getProductDetails = (payload) => {
  return {
    type: GET_PRODUCT_DETAILS,
    payload,
  };
};
export const loadingProduct = (payload) => {
  return {
    type: SET_LOADING_ACTION,
    payload,
  };
};
export const storeSearchLog = (payload) => {
  return {
    type: STORE_SEARCH_LOG,
    payload,
  };
};
export const getSalesOrderProducts = (payload) => {
  return {
    type: GET_SALES_ORDER_PRODUCTS,
    payload,
  };
};
export const getStoreList = (payload) => {
  return {
    type: GET_STORE_LIST,
    payload,
  };
};
export const getStoreDetails = (payload) => {
  return {
    type: GET_STORE_DETAILS,
    payload,
  };
};
export const changePassword = (payload) => {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
};
