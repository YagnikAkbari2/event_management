import { get, post } from "../../apiWrapper";

export const createStoreOrderApi = (data) => {
  return post(`/orders/store-orders`, data);
};
export const storeDeliveryListingApi = (data) => {
  return get(`/orders/store-orders?order_type=B2B&${data}`);
};
export const getDownloadStoreDeliveryApi = (data) => {
  return get(`/orders/store-orders?order_type=B2B&${data}&download=true`);
};
