import { get, post, put, remove } from "../../apiWrapper";

export const getStockAuditAllTasksApi = (data) => {
  return get(
    `/inventory${
      data ? (data?.isAdmin ? "/admin-audit" : "/store-audit") : ""
    }${data?.query ? "?" + data?.query : ""}`
  );
};
export const uploadFileApi = (data) => {
  return post(`/audit/upload-csv`, data);
};
export const stockAuditLoginApi = (data) => {
  return post(`/store/login`, data);
};
export const stockAuditLoginDetailsApi = (data) => {
  return get(`/store-details`);
};
export const stockAuditTaskDetailsApi = (data) => {
  return get(`/inventory/store-audit/tasks-details/${data?.id}`);
};
export const addNewProductInTaskApi = (data) => {
  return post(`/inventory/store-audit/create`, data);
};
export const saveAsDraftTaskApi = (data) => {
  return put(`/inventory/store-audit/save/${data?.task_id}`, {
    task_details: data?.products,
    employee_code: data?.employee_code,
  });
};
export const completeTaskApi = (data) => {
  return put(`/inventory/store-audit/completed/${data?.task_id}`, {
    task_details: data?.products,
    employee_code: data?.employee_code,
  });
};
export const getGetImportHistoryApi = (data) => {
  return get(`/master/import-history${data ? "?" + data : ""}`);
};
export const getQtyMismatchedProductsApi = (data) => {
  return get(`/inventory/admin-audit/mismatched-products${data ? data : ""}`);
};
export const getNewFoundProductsApi = (data) => {
  return get(`/inventory/admin-audit/new-products-found${data ? data : ""}`);
};
export const saveEmployeeCodeInTaskApi = (data) => {
  return put(
    `/inventory/store-audit/save-employee-code/${data?.task_id}`,
    data?.employeeData
  );
};
export const deleteAuditTaskApi = (data) => {
  return remove(`/inventory/admin-audit/${data}`);
};
