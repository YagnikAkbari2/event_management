import {
    SET_STORE_DELIVERY_LISTING,
    SET_STORE_SERACH_DELIVERY,
    RESET_DOWNLOAD_STORE_DELIVERY,
    SET_DOWNLOAD_STORE_DELIVERY
  } from "../actions/storeDeliveryAction";
  
  const initialState = {
    StoreListSearchDelivery: [],
    listingStoreDelivery:[],
    paginationData:"",
    storeDeliveryDownload:""
 };
  
  const storeDeliveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STORE_DELIVERY_LISTING:
          
            return {
              ...state,
              listingStoreDelivery: action.payload?.orders ?? [],
               paginationData:action.payload?.meta 
            };
          case SET_DOWNLOAD_STORE_DELIVERY:
          
            return {
              ...state,
              storeDeliveryDownload : action.payload?.data?.report_file ?? "",
              
            };
            case RESET_DOWNLOAD_STORE_DELIVERY:
              return {
                ...state,
                storeDeliveryDownload: "",
              };
      default:
        return state;
    }
  };
  
  export default storeDeliveryReducer;
  