export const GET_STORE_DELIVERY_LISTING = "GET_STORE_DELIVERY_LISTING"
export const SET_STORE_DELIVERY_LISTING = "SET_STORE_DELIVERY_LISTING"
export const CREATE_ORDER_STORE_DELIVERY = "CREATE_ORDER_STORE_DELIVERY"
export const GET_DOWNLOAD_STORE_DELIVERY ="GET_DOWNLOAD_STORE_DELIVERY"
export const SET_DOWNLOAD_STORE_DELIVERY ="SET_DOWNLOAD_STORE_DELIVERY"
export const RESET_DOWNLOAD_STORE_DELIVERY ="RESET_DOWNLOAD_STORE_DELIVERY"
export const createOrderForDeliveryStore = (payload) => {
    
    return {
        type: CREATE_ORDER_STORE_DELIVERY,
        payload,
    };
};
export const getStoreDeliveryListing = (payload) => {
    
    return {
        type: GET_STORE_DELIVERY_LISTING,
        payload,
    };
};
export const getStoreDeliveryDownloadLink =(payload)=>{
    return {
        type: GET_DOWNLOAD_STORE_DELIVERY,
        payload,
    };
}
export const resetDownloadStoreDelivery = (payload) => {
    
    return {
      type: RESET_DOWNLOAD_STORE_DELIVERY,
      payload,
    };
  };