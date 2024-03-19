//admin
export const GET_ALL_AUDIT_TASKS = "GET_ALL_AUDIT_TASKS";
export const SET_ALL_AUDIT_TASKS = "SET_ALL_AUDIT_TASKS";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const STOCK_AUDIT_LOGIN = "STOCK_AUDIT_LOGIN";
export const SET_STOCK_AUDIT_LOGIN_DATA = "SET_STOCK_AUDIT_LOGIN_DATA";
export const GET_STOCK_AUDIT_LOGIN_DETAILS = "GET_STOCK_AUDIT_LOGIN_DETAILS";
export const GET_IMPORT_HISTORY = "GET_IMPORT_HISTORY";
export const SET_IMPORT_HISTORY = "SET_IMPORT_HISTORY";
export const getAllAuditTasks = (payload) => {
  return {
    type: GET_ALL_AUDIT_TASKS,
    payload,
  };
};

export const uploadFile = (payload) => {
  return {
    type: UPLOAD_FILE,
    payload,
  };
};

export const getImportHistory = (payload) => {
  return {
    type: GET_IMPORT_HISTORY,
    payload,
  };
};

// Store

export const GET_STORE_AUDIT_TASKS = "GET_STORE_AUDIT_TASKS";
export const SET_STORE_AUDIT_TASKS = "SET_STORE_AUDIT_TASKS";
export const GET_STORE_AUDIT_TASK_DETAILS = "GET_STORE_AUDIT_TASK_DETAILS";
export const SET_STORE_AUDIT_TASK_DETAILS = "SET_STORE_AUDIT_TASK_DETAILS";
export const ADD_NEW_PRODUCT_IN_TASK = "ADD_NEW_PRODUCT_IN_TASK";
export const SAVE_AS_DRAFT_TASK = "SAVE_AS_DRAFT_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const RESET_STOCK_AUDIT_DETAILS = "RESET_STOCK_AUDIT_DETAILS";
export const QTY_MISMATCHED_PRODUCTS = "QTY_MISMATCHED_PRODUCTS";
export const GET_QTY_MISMATCHED_PRODUCTS = "GET_QTY_MISMATCHED_PRODUCTS";
export const SET_QTY_MISMATCHED_PRODUCTS = "SET_QTY_MISMATCHED_PRODUCTS";
export const GET_NEW_FOUND_PRODUCTS = "GET_NEW_FOUND_PRODUCTS";
export const SET_NEW_FOUND_PRODUCTS = "SET_NEW_FOUND_PRODUCTS";
export const SAVE_EMPLOYEE_CODE_IN_TASK = "SAVE_EMPLOYEE_CODE_IN_TASK";
export const getStoreAuditTasks = (payload) => {
  return {
    type: GET_STORE_AUDIT_TASKS,
    payload,
  };
};
export const getStoreAuditTaskDetails = (payload) => {
  return {
    type: GET_STORE_AUDIT_TASK_DETAILS,
    payload,
  };
};
export const addNewProductInTask = (payload) => {
  return {
    type: ADD_NEW_PRODUCT_IN_TASK,
    payload,
  };
};
export const saveAsDraftTask = (payload) => {
  return {
    type: SAVE_AS_DRAFT_TASK,
    payload,
  };
};
export const completeTask = (payload) => {
  return {
    type: COMPLETE_TASK,
    payload,
  };
};
export const stockAuditLogin = (payload) => {
  return {
    type: STOCK_AUDIT_LOGIN,
    payload,
  };
};
export const getStockAuditLoginDetails = (payload) => {
  return {
    type: GET_STOCK_AUDIT_LOGIN_DETAILS,
    payload,
  };
};
export const resetStockAuditDetails = (payload) => {
  return {
    type: RESET_STOCK_AUDIT_DETAILS,
    payload,
  };
};
export const getQtyMismatchedProductsAction = (payload) => {
  return {
    type: GET_QTY_MISMATCHED_PRODUCTS,
    payload,
  };
};
export const getNewFoundProductsInTaskAction = (payload) => {
  return {
    type: GET_NEW_FOUND_PRODUCTS,
    payload,
  };
};
export const saveEmployeeCodeInTask = (payload) => {
  return {
    type: SAVE_EMPLOYEE_CODE_IN_TASK,
    payload,
  };
};
