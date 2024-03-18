import {
  RESET_DOWNLOAD_HOME_DELIVERY,
  SET_ADDRESS_BY_PINCODE,
  SET_ADDRESS_ERROR,
  SET_DOWNLOAD_HOME_DELIVERY,
  SET_HOME_DELIVERY_LISTING,
  SET_STORE_SERACH_DELIVERY,
} from "../actions/homeDeliveryAction";

const initialState = {
  StoreListSearchDelivery: [],
  listingHomeDelivery: [],
  paginationData: "",
  addressByPincode: {},
  addressError: "",
  homeDeliveryDownload: "",
};

const homeDeliveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_SERACH_DELIVERY:
      return {
        ...state,
        StoreListSearchDelivery: action.payload?.data ?? [],
      };
    case SET_HOME_DELIVERY_LISTING:
      return {
        ...state,
        listingHomeDelivery: action.payload?.orders ?? [],
        paginationData: action.payload?.meta,
      };
    case SET_ADDRESS_BY_PINCODE:
      return {
        ...state,
        addressByPincode: action.payload?.["pincode-details"]
          ? { ...action.payload?.["pincode-details"] }
          : {},
      };
    case SET_ADDRESS_ERROR:
      return {
        ...state,
        addressError: action.payload?.data ?? "",
      };
    case SET_DOWNLOAD_HOME_DELIVERY:
      return {
        ...state,
        homeDeliveryDownload: action.payload?.data?.report_file ?? "",
      };
    case RESET_DOWNLOAD_HOME_DELIVERY:
      return {
        ...state,
        homeDeliveryDownload: "",
      };
    default:
      return state;
  }
};

export default homeDeliveryReducer;
