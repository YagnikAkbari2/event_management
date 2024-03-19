import {
  RESET_STOCK_AUDIT_DETAILS,
  SET_ALL_AUDIT_TASKS,
  SET_IMPORT_HISTORY,
  SET_NEW_FOUND_PRODUCTS,
  SET_QTY_MISMATCHED_PRODUCTS,
  SET_STOCK_AUDIT_LOGIN_DATA,
  SET_STORE_AUDIT_TASK_DETAILS,
} from "../actions/auditAction";

const initialState = {
  stockAuditLoginData: {},
  auditTasksAll: [],
  auditTasksAllMetaData: {},
  auditTaskDetails: [],
  importHistory: [],
  importHistoryMetaData: {},
  newFoundProductsTask: [],
  qtyMismatchedProducts: [],
};

const auditReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_AUDIT_TASKS:
      return {
        ...state,
        auditTasksAll: action?.payload?.data,
        auditTasksAllMetaData: action.payload?.meta,
      };
    case SET_STOCK_AUDIT_LOGIN_DATA:
      return {
        ...state,
        stockAuditLoginData: action?.payload,
      };
    case SET_STORE_AUDIT_TASK_DETAILS:
      return {
        ...state,
        auditTaskDetails: action?.payload,
      };
    case SET_IMPORT_HISTORY:
      return {
        ...state,
        importHistory: action?.payload?.data,
        importHistoryMetaData: action.payload?.meta,
      };
    case RESET_STOCK_AUDIT_DETAILS:
      return {
        ...state,
        auditTaskDetails: [],
      };
    case SET_QTY_MISMATCHED_PRODUCTS:
      return {
        ...state,
        qtyMismatchedProducts: action?.payload,
      };
    case SET_NEW_FOUND_PRODUCTS:
      return {
        ...state,
        newFoundProductsTask: action?.payload,
      };
    default:
      return state;
  }
};
export default auditReducer;
