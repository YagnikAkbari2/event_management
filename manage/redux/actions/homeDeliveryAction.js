
export const GET_STORE_SERACH_DELIVERY = "GET_STORE_SERACH_DELIVERY"
export const SET_STORE_SERACH_DELIVERY = "SET_STORE_SERACH_DELIVERY"
export const GET_HOME_DELIVERY_LISTING = "GET_HOME_DELIVERY_LISTING"
export const SET_HOME_DELIVERY_LISTING = "SET_HOME_DELIVERY_LISTING"
export const CREATE_ORDER_HOME_DELIVERY = "CREATE_ORDER_HOME_DELIVERY"
export const GET_ADDRESS_BY_PINCODE ="GET_ADDRESS_BY_PINCODE"
export const SET_ADDRESS_BY_PINCODE ="SET_ADDRESS_BY_PINCODE"
export const SET_ADDRESS_ERROR ="SET_ADDRESS_ERROR"
export const GET_DOWNLOAD_HOME_DELIVERY="GET_DOWNLOAD_HOME_DELIVERY"
export const SET_DOWNLOAD_HOME_DELIVERY="SET_DOWNLOAD_HOME_DELIVERY"
export const RESET_DOWNLOAD_HOME_DELIVERY="RESET_DOWNLOAD_HOME_DELIVERY"
export const storeSearchForDelivery = (payload) => {
    return {
        type: GET_STORE_SERACH_DELIVERY,
        payload,
    };
};
export const createOrderForDelivery = (payload) => {
    return {
        type: CREATE_ORDER_HOME_DELIVERY,
        payload,
    };
};
export const getHomeDeliveryListing = (payload) => {
    return {
        type: GET_HOME_DELIVERY_LISTING,
        payload,
    };
};
export const getAddressByPincode = (payload) => {
    return {
        type: GET_ADDRESS_BY_PINCODE,
        payload,
    };
};
export const getHomeDeliveryDownloadLink =(payload)=>{

    
    return {
        type: GET_DOWNLOAD_HOME_DELIVERY,
        payload,
    };
}
export const resetDownloadHomeDelivery = (payload) => {
    
    return {
      type: RESET_DOWNLOAD_HOME_DELIVERY,
      payload,
    };
  };
  