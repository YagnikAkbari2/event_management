import { ecomGet, get, post } from "../../apiWrapper";

export const storeSearchHomeDelivery = (data) => {
  return get(`/store/search?${data}`);
};
export const createHomeOrderApi = (data) => {
  return post(`/orders/store-orders`, data);
};
export const homeDeliveryListingApi = (data) => {
  return get(`/orders/store-orders?order_type=B2C&${data} `);
};
export const addressByPincodeApi = (data) => {
  return ecomGet(`/pincode-details?pincode=${data} `);
};
export const getDownloadHomeDeliveryApi = (data) => {
  return get(`/orders/store-orders?order_type=B2C&${data}&download=true`);
};
