import { call, put } from "redux-saga/effects";
import { store } from "../../store";
import { errObjtoArray } from "../../../commonjs/commonHelpers";

import { ADD_TOASTER, SET_ERR_MSG } from "../../actions/toasterAction";
import { SET_UI_ACTION } from "../../actions/uiAction";
import {
  SET_ADDRESS_BY_PINCODE,
  SET_ADDRESS_ERROR,
  SET_DOWNLOAD_HOME_DELIVERY,
  SET_HOME_DELIVERY_LISTING,
  SET_STORE_SERACH_DELIVERY,
} from "../../actions/homeDeliveryAction";
import {
  createHomeOrderApi,
  homeDeliveryListingApi,
  storeSearchHomeDelivery,
  addressByPincodeApi,
  getDownloadHomeDeliveryApi,
} from "../requests/homeDeliveryRequest";
import { LOADING_ACTION, loadingAction } from "../../actions/userAction";
// import { FALSE } from "sass";

export function* getHomeDeliveryListingHandler(action) {
  try {
    const response = yield call(homeDeliveryListingApi, action?.payload ?? "");
    if (response?.data) {
      yield put({ type: SET_HOME_DELIVERY_LISTING, payload: response.data });
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

export function* handleStoreDeliverySearch(action) {
  try {
    const response = yield call(storeSearchHomeDelivery, action?.payload ?? "");
    if (response?.data) {
      yield put({ type: SET_STORE_SERACH_DELIVERY, payload: response.data });
    }
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

export function* createOrderDeliveryHandler(action) {
  try {
    const response = yield call(createHomeOrderApi, action?.payload ?? "");

    if (response?.data) {
      yield put({
        type: SET_UI_ACTION,
      });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response.data.message },
      });
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
export function* getAddressByPincodeHandler(action) {
  try {
    const response = yield call(addressByPincodeApi, action?.payload ?? "");
    if (response?.data) {
      yield put({ type: SET_ADDRESS_BY_PINCODE, payload: response.data });
    }
  } catch (err) {
    if (err?.response?.status === 400) {
      yield put({
        type: ADD_TOASTER,
        payload: { type: "error", message: err?.response?.data },
      });
    }
  }
}
export function* getHomeDeliveryDownloadHandler(action) {
  try {
    const response = yield call(
      getDownloadHomeDeliveryApi,
      action.payload ?? ""
    );
    if (response.data) {
      // setTimeout(() => {

      yield put({ type: SET_DOWNLOAD_HOME_DELIVERY, payload: response.data });
      // }, 1000);
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response.data.message },
      });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {}
}
