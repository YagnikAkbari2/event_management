import {
  SET_PRODUCT_LIST,
  SET_PRODUCT_DETAILS,
  SET_LOADING_ACTION,
  SET_SALES_ORDER_PRODUCTS,
  SET_STORE_LIST,
  SET_STORE_DETAILS,
} from "../actions/productAction";
const initialState = {
  productList: [],
  productDetails: {},
  message: "",
  isLoading: false,
  salesOrderProducts: [],
  salesOrderProductsMeta: {},
  store: [],
  storeDetails: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload?.products ?? [],
      };
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
        message: action.payload.message,
      };
    case SET_LOADING_ACTION:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SALES_ORDER_PRODUCTS:
      return {
        ...state,
        salesOrderProducts: action.payload?.sales_orders_items ?? [],
        salesOrderProductsMeta: action.payload?.meta ?? {},
      };
    case SET_STORE_LIST:
      console.log("storeliststorelist", action.payload);

      return {
        ...state,
        store: action.payload?.data ?? [],
      };
    case SET_STORE_DETAILS:
      return {
        ...state,
        storeDetails: action.payload?.store ?? {},
      };
    default:
      return state;
  }
};

export default productReducer;
