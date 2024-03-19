import { call, put } from "redux-saga/effects";
import {
  addNewProductInTaskApi,
  completeTaskApi,
  deleteAuditTaskApi,
  getGetImportHistoryApi,
  getNewFoundProductsApi,
  getQtyMismatchedProductsApi,
  getStockAuditAllTasks,
  getStockAuditAllTasksApi,
  getStockAuditStoreTasks,
  saveAsDraftTaskApi,
  saveEmployeeCodeInTaskApi,
  stockAuditLoginApi,
  stockAuditLoginDetailsApi,
  stockAuditTaskDetailsApi,
  uploadFileApi,
} from "../requests/stockAuditRequests";
import {
  SET_ALL_AUDIT_TASKS,
  SET_IMPORT_HISTORY,
  SET_NEW_FOUND_PRODUCTS,
  SET_QTY_MISMATCHED_PRODUCTS,
  SET_STOCK_AUDIT_LOGIN_DATA,
  SET_STORE_AUDIT_TASKS,
  SET_STORE_AUDIT_TASK_DETAILS,
} from "../../actions/auditAction";
import { LOADING_ACTION } from "../../actions/loaderAction";
import { SET_CUSTOM_UI_ACTION, SET_UI_ACTION } from "../../actions/uiAction";
import { ADD_TOASTER } from "../../actions/toasterAction";

//admin
export function* handleGetAllAuditTasks(action) {
  try {
    const response = yield call(
      getStockAuditAllTasksApi,
      action?.payload ?? ""
    );
    if (response.data?.code === 200) {
      yield put({ type: SET_ALL_AUDIT_TASKS, payload: response?.data });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}

export function* handleUploadFile(action) {
  try {
    const response = yield call(uploadFileApi, action?.payload ?? "");
    if (response?.data) {
      yield put({
        type: SET_UI_ACTION,
      });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response.data.message },
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    }
  } catch (err) {
    if (err?.response?.status === 400) {
      yield put({
        type: ADD_TOASTER,
        payload: { type: "error", message: err?.response?.data },
      });
    }
    console.log(err);
  }
}
export function* handleStockAuditLogin(action) {
  try {
    const response = yield call(stockAuditLoginApi, action?.payload ?? "");
    if (response?.data) {
      if (response?.data?.store?.token) {
        yield put({
          type: SET_STOCK_AUDIT_LOGIN_DATA,
          payload: response?.data?.store,
        });
        localStorage.setItem("audit_token", response?.data?.store?.token);
      }
      yield put({
        type: SET_UI_ACTION,
      });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response.data.message },
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    }
  } catch (err) {
    if (err?.response?.status === 400) {
      yield put({
        type: ADD_TOASTER,
        payload: { type: "error", message: err?.response?.data },
      });
    }
    console.log(err);
  }
}
export function* handleGetStockAuditLoginDetails(action) {
  try {
    const response = yield call(
      stockAuditLoginDetailsApi,
      action?.payload ?? ""
    );
    if (response?.data) {
      if (response?.data) {
        yield put({
          type: SET_STOCK_AUDIT_LOGIN_DATA,
          payload: response?.data?.data,
        });
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    if (err?.response?.status === 400) {
      yield put({
        type: ADD_TOASTER,
        payload: { type: "error", message: err?.response?.data },
      });
    }
    console.log(err);
  }
}

export function* handleGetImportHistory(action) {
  try {
    const response = yield call(getGetImportHistoryApi, action?.payload ?? "");
    if (response.data?.code === 200) {
      yield put({ type: SET_IMPORT_HISTORY, payload: response?.data });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}

// Store

export function* handleGetStoreAuditTasks(action) {
  try {
    // const response = yield call(getStockAuditStoreTasks, action?.payload ?? "");
    // if (response.data?.code === 200) {
    //   yield put({ type: SET_UI_ACTION });
    // }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}
export function* handleGetStoreAuditTaskDetails(action) {
  try {
    const response = yield call(
      stockAuditTaskDetailsApi,
      action?.payload ?? ""
    );
    if (response.data?.code === 200) {
      yield put({
        type: SET_STORE_AUDIT_TASK_DETAILS,
        payload: response?.data?.task_details,
      });
      yield put({ type: SET_UI_ACTION });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    yield put({
      type: ADD_TOASTER,
      payload: { type: "success", message: response?.data?.message },
    });
  } catch (err) {
    console.log(err);
  }
}
export function* handleAddNewProductInTask(action) {
  try {
    const response = yield call(addNewProductInTaskApi, action?.payload ?? "");
    if (response.data?.code === 200) {
      yield put({
        type: SET_CUSTOM_UI_ACTION,
        payload: { isAddNewProductSuccess: true },
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response?.data?.message },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* handleSaveAsDraftTask(action) {
  try {
    const response = yield call(saveAsDraftTaskApi, action?.payload ?? "");
    if (response.data?.code === 200) {
      if (action?.payload?.isManualSaveDraft) {
        yield put({
          type: SET_CUSTOM_UI_ACTION,
          payload: { saveAsDraftManual: true },
        });
        yield put({
          type: ADD_TOASTER,
          payload: { type: "success", message: response?.data?.message },
        });
      } else {
        yield put({
          type: SET_CUSTOM_UI_ACTION,
          payload: { saveAsDraftAuto: true },
        });
      }
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* handleCompleteTask(action) {
  try {
    const response = yield call(completeTaskApi, action?.payload ?? "");
    if (response.data?.code === 200) {
      yield put({
        type: SET_CUSTOM_UI_ACTION,
        payload: { completeTaskSuccess: true },
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response?.data?.message },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* handleQtyMismatchedProducts(action) {
  try {
    const response = yield call(
      getQtyMismatchedProductsApi,
      action?.payload ?? ""
    );
    if (response.data?.code === 200) {
      yield put({
        type: SET_QTY_MISMATCHED_PRODUCTS,
        payload: response?.data?.mismatched_products,
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response?.data?.message },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* handleNewProductsFound(action) {
  try {
    const response = yield call(getNewFoundProductsApi, action?.payload ?? "");
    if (response.data?.code === 200) {
      yield put({
        type: SET_NEW_FOUND_PRODUCTS,
        payload: response?.data?.new_products_found,
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response?.data?.message },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* handleSaveEmployeeCode(action) {
  try {
    const response = yield call(
      saveEmployeeCodeInTaskApi,
      action?.payload ?? ""
    );
    if (response.data?.code === 200) {
      yield put({
        type: SET_UI_ACTION,
        payload: {
          isEmployeeCodeAddSuccess: true,
        },
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response?.data?.message },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* handleDeleteAuditTaskApi(action) {
  try {
    const response = yield call(deleteAuditTaskApi, action?.payload);
    if (response?.data?.code === 200) {
      yield put({
        type: SET_UI_ACTION,
        payload: {
          isDeleteAuditTaskSuccess: true,
        },
      });
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response?.data?.message },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
