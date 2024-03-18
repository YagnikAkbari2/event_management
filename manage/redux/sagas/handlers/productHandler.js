import { call, put } from "redux-saga/effects";

import {
  getProductDetailsApi,
  getProductListApi,
  getStoreDetailsApi,
  getStoreListApi,
  salesOrderProductsApi,
  storeLogsApi,
  changePasswordApi,
} from "../requests/productRequests";

import {
  SET_PRODUCT_LIST,
  SET_PRODUCT_DETAILS,
  SET_LOADING_ACTION,
  SET_SALES_ORDER_PRODUCTS,
  SET_STORE_LIST,
  SET_STORE_DETAILS,
} from "../../actions/productAction";
import { LOADING_ACTION, loadingAction } from "../../actions/userAction";
import { ADD_TOASTER } from "../../actions/toasterAction";
import { SET_CUSTOM_UI_ACTION, SET_UI_ACTION } from "../../actions/uiAction";
export function* handleGetProductList(action) {
  try {
    const response = yield call(getProductListApi, action?.payload ?? "");
    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_PRODUCT_LIST, payload: response.data });
          yield put({ type: SET_LOADING_ACTION, payload: false });
        }
      } else {
        throw "Error Fetching Products List";
      }
    }
    // yield put({ type: SET_LOADING_ACTION, payload: { isLoading: false } });
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }
}

export function* handleGetProductDetails(action) {
  try {
    const response = yield call(getProductDetailsApi, action?.payload ?? "");
    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_PRODUCT_DETAILS, payload: response.data });
        }
      } else {
        throw "Error Fetching Products Details";
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    console.log(err);
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }
}

export function* handleStoreSearchLog(action) {
  try {
    const response = yield call(storeLogsApi, action?.payload ?? "");
    if (response.status === 200) {
      if (response.data?.code === 200) {
      } else {
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    console.log(err);
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }
}
export function* handleGetSalesOrderProducts(action) {
  try {
    const response = yield call(salesOrderProductsApi, action?.payload ?? "");
    console.log("responsereponse", response);
    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_SALES_ORDER_PRODUCTS, payload: response.data });
        }
      } else {
        throw "Error Fetching Products Details";
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }
}
export function* handleGetStoreList(action) {
  try {
    const response = yield call(getStoreListApi, action?.payload ?? "");
    console.log("responseresponse", response);
    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_STORE_LIST, payload: response.data });
        }
      } else {
        throw "Error Fetching Products Details";
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }
}
export function* handleGetStoreDetails(action) {
  try {
    const response = yield call(getStoreDetailsApi, action?.payload ?? "");

    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_STORE_DETAILS, payload: response.data });
        }
      } else {
        throw "Error Fetching Products Details";
      }
    }
    // yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }
}
export function* handleChangePassword(action) {
  try {
    console.log("response");
    const response = yield call(changePasswordApi, action?.payload ?? "");
    if (response?.data) {
      yield put({
        type: SET_UI_ACTION,
      });
      yield put({
        type: ADD_TOASTER,
        payload: {
          type: response.data.message,
          message: response.data.message,
        },
      });
      dispatch(loadingAction({ isLoading: false }));
    }
  } catch (err) {
    yield put({
      type: ADD_TOASTER,
      payload: { type: "error", message: err.response.data.message },
    });
    console.log(err);
  }
}
