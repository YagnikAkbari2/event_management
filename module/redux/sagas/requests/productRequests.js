import { ecomGet, get, post } from "../../apiWrapper";

export const getProductListApi = (data) => {
  return ecomGet(`/product/check-available?q=${data}`);
};
export const getProductDetailsApi = (data) => {
  return get(`/search/medicine-search?${data}`);
};
export const storeLogsApi = (data) => {
  return post(`/store-search-log`, data);
};
export const salesOrderProductsApi = (data) => {
  return get(`/orders/sales-orders${data ? "?" + data : ""}`);
};
export const getStoreListApi = (data) => {
  return get(`/store/search?${data}`);
};
export const getStoreDetailsApi = (data) => {
  return get(`/get-store-details`);
};
export const changePasswordApi = (data) => {
  return post(`/change-password`, data);
};
