import { takeLatest, all } from "redux-saga/effects";
import { USER_LOGIN, USER_VERIFY_PASSWORD } from "../actions/authAction";
import { handleUserLogin, handleVerifyPassword } from "./handlers/authHandler";
import {
  handleUserloggedInDetails,
  handleGetStoreSearch,
  handleGetUsersList,
  handleGetUser,
  handleUpdateUserData,
  handleAddUserData,
  handleUpdateUserstatus,
  handleDeleteUser,
  handleChangePasswordUser,
  handleGetCityList,
} from "./handlers/userHandler";
import {
  USER_LOGIN_DETAILS,
  GET_STORE_SEARCH,
  GET_USERS_LIST,
  GET_USER,
  UPDATE_USER_DETAILS,
  ADD_USER_DETAILS,
  UPDATE_USER_STATUS,
  DELETE_USER,
  CHANGE_PASSWORD_USER,
  GET_CITY_SEARCH,
} from "../actions/userAction";
import {
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_LIST,
  GET_SALES_ORDER_PRODUCTS,
  STORE_SEARCH_LOG,
  GET_STORE_LIST,
  GET_STORE_DETAILS,
  CHANGE_PASSWORD,
} from "../actions/productAction";
import {
  CREATE_ORDER_HOME_DELIVERY,
  GET_ADDRESS_BY_PINCODE,
  GET_DOWNLOAD_HOME_DELIVERY,
  GET_HOME_DELIVERY_LISTING,
  GET_STORE_SERACH_DELIVERY,
} from "../actions/homeDeliveryAction";
import {
  CREATE_ORDER_STORE_DELIVERY,
  GET_DOWNLOAD_STORE_DELIVERY,
  GET_STORE_DELIVERY_LISTING,
} from "../actions/storeDeliveryAction";
import {
  GET_REPORTS,
  GET_REPORT_DOWNLOAD_URL,
  GET_SINGLE_REPORT,
} from "../actions/reportAction";
import {
  ADD_NEW_PRODUCT_IN_TASK,
  COMPLETE_TASK,
  GET_ALL_AUDIT_TASKS,
  GET_IMPORT_HISTORY,
  GET_NEW_FOUND_PRODUCTS,
  GET_QTY_MISMATCHED_PRODUCTS,
  GET_STOCK_AUDIT_LOGIN_DETAILS,
  GET_STORE_AUDIT_TASKS,
  GET_STORE_AUDIT_TASK_DETAILS,
  SAVE_AS_DRAFT_TASK,
  SAVE_EMPLOYEE_CODE_IN_TASK,
  STOCK_AUDIT_LOGIN,
  UPLOAD_FILE,
} from "../actions/auditAction";
import {
  BULK_UPDATE_ROLE,
  CREATE_ROLE_DATA,
  GET_ROLE_DATA,
  GET_ROLE_LIST,
  GET_SINGLE_ROLE,
} from "../actions/roleAction";
import {
  handleGetProductDetails,
  handleGetProductList,
  handleGetSalesOrderProducts,
  handleStoreSearchLog,
  handleGetStoreList,
  handleGetStoreDetails,
  handleChangePassword,
} from "./handlers/productHandler";
import {
  handleGetReports,
  handleGetSingleReport,
  handleReportDownload,
} from "./handlers/reportsHandler";
import {
  handleAddNewProductInTask,
  handleCompleteTask,
  handleDeleteAuditTaskApi,
  handleGetAllAuditTasks,
  handleGetImportHistory,
  handleGetStockAuditLoginDetails,
  handleGetStoreAuditTaskDetails,
  handleGetStoreAuditTasks,
  handleNewProductsFound,
  handleQtyMismatchedProducts,
  handleSaveAsDraftTask,
  handleSaveEmployeeCode,
  handleStockAuditLogin,
  handleUploadFile,
} from "./handlers/stockAuditHandler";
import { GET_DELETE } from "../actions/stockAuditAction";
import {
  handleStoreDeliverySearch,
  createOrderDeliveryHandler,
  getHomeDeliveryListingHandler,
  getAddressByPincodeHandler,
  getHomeDeliveryDownloadHandler,
} from "./handlers/homeDeliveryHandler";
import {
  createOrderDeliveryHandlerStore,
  getStoreDeliveryListingHandler,
  getStoreDeliveryDownloadHandler,
} from "./handlers/storeDeliveryHandler";
import {
  handleBulkRoleUpdate,
  handleCreateRole,
  handleGetRoleList,
  handleGetRoles,
  handleGetSingleRole,
} from "./handlers/roleHandler";

export function* watcherSaga() {
  yield all([
    // login
    yield takeLatest(USER_LOGIN, handleUserLogin),
    // User List
    yield takeLatest(USER_LOGIN_DETAILS, handleUserloggedInDetails),
    yield takeLatest(GET_USERS_LIST, handleGetUsersList),
    yield takeLatest(GET_USER, handleGetUser),
    yield takeLatest(UPDATE_USER_DETAILS, handleUpdateUserData),
    yield takeLatest(ADD_USER_DETAILS, handleAddUserData),
    yield takeLatest(UPDATE_USER_STATUS, handleUpdateUserstatus),
    yield takeLatest(DELETE_USER, handleDeleteUser),
    yield takeLatest(CHANGE_PASSWORD_USER, handleChangePasswordUser),
    yield takeLatest(USER_VERIFY_PASSWORD, handleVerifyPassword),
    //product list
    yield takeLatest(GET_PRODUCT_DETAILS, handleGetProductDetails),
    yield takeLatest(GET_PRODUCT_LIST, handleGetProductList),
    yield takeLatest(STORE_SEARCH_LOG, handleStoreSearchLog),
    yield takeLatest(GET_SALES_ORDER_PRODUCTS, handleGetSalesOrderProducts),
    yield takeLatest(GET_STORE_LIST, handleGetStoreList),
    yield takeLatest(GET_CITY_SEARCH, handleGetCityList),
    yield takeLatest(GET_STORE_DETAILS, handleGetStoreDetails),
    yield takeLatest(CHANGE_PASSWORD, handleChangePassword),

    yield takeLatest(GET_STORE_SEARCH, handleGetStoreSearch),

    //reports
    yield takeLatest(GET_REPORTS, handleGetReports),
    yield takeLatest(GET_SINGLE_REPORT, handleGetSingleReport),
    yield takeLatest(GET_REPORT_DOWNLOAD_URL, handleReportDownload),

    //stock-audt
    yield takeLatest(GET_ALL_AUDIT_TASKS, handleGetAllAuditTasks),
    yield takeLatest(UPLOAD_FILE, handleUploadFile),
    yield takeLatest(STOCK_AUDIT_LOGIN, handleStockAuditLogin),
    yield takeLatest(
      GET_STOCK_AUDIT_LOGIN_DETAILS,
      handleGetStockAuditLoginDetails
    ),
    yield takeLatest(
      GET_STORE_AUDIT_TASK_DETAILS,
      handleGetStoreAuditTaskDetails
    ),
    yield takeLatest(ADD_NEW_PRODUCT_IN_TASK, handleAddNewProductInTask),
    yield takeLatest(SAVE_AS_DRAFT_TASK, handleSaveAsDraftTask),
    yield takeLatest(GET_IMPORT_HISTORY, handleGetImportHistory),
    yield takeLatest(COMPLETE_TASK, handleCompleteTask),
    yield takeLatest(GET_QTY_MISMATCHED_PRODUCTS, handleQtyMismatchedProducts),
    yield takeLatest(GET_NEW_FOUND_PRODUCTS, handleNewProductsFound),
    yield takeLatest(SAVE_EMPLOYEE_CODE_IN_TASK, handleSaveEmployeeCode),
    yield takeLatest(GET_DELETE, handleDeleteAuditTaskApi),

    //home Delivery
    yield takeLatest(GET_STORE_SERACH_DELIVERY, handleStoreDeliverySearch),
    yield takeLatest(CREATE_ORDER_HOME_DELIVERY, createOrderDeliveryHandler),
    yield takeLatest(GET_HOME_DELIVERY_LISTING, getHomeDeliveryListingHandler),
    yield takeLatest(GET_ADDRESS_BY_PINCODE, getAddressByPincodeHandler),
    yield takeLatest(
      GET_DOWNLOAD_HOME_DELIVERY,
      getHomeDeliveryDownloadHandler
    ),
    //Store Delivery
    yield takeLatest(
      CREATE_ORDER_STORE_DELIVERY,
      createOrderDeliveryHandlerStore
    ),
    yield takeLatest(
      GET_STORE_DELIVERY_LISTING,
      getStoreDeliveryListingHandler
    ),
    yield takeLatest(
      GET_DOWNLOAD_STORE_DELIVERY,
      getStoreDeliveryDownloadHandler
    ),
    //Role List
    yield takeLatest(GET_ROLE_LIST, handleGetRoleList),
    yield takeLatest(BULK_UPDATE_ROLE, handleBulkRoleUpdate),
    yield takeLatest(GET_SINGLE_ROLE, handleGetSingleRole),
    yield takeLatest(GET_ROLE_DATA, handleGetRoles),
    yield takeLatest(CREATE_ROLE_DATA, handleCreateRole),
  ]);
}
