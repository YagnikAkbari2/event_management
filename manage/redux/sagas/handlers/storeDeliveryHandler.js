import { call, put } from "redux-saga/effects";
import { store } from "../../store";
import { errObjtoArray } from "../../../commonjs/commonHelpers"

import { ADD_TOASTER, SET_ERR_MSG } from "../../actions/toasterAction";
import { SET_UI_ACTION } from "../../actions/uiAction";
import { SET_DOWNLOAD_STORE_DELIVERY, SET_STORE_DELIVERY_LISTING } from "../../actions/storeDeliveryAction";
import {
    createStoreOrderApi,
    storeDeliveryListingApi,
    getDownloadStoreDeliveryApi
} from "../requests/storeDeliveryRequest";
import { LOADING_ACTION, loadingAction } from "../../actions/userAction";

export function* getStoreDeliveryListingHandler(action) {
    try {
      const response = yield call(storeDeliveryListingApi, action?.payload ?? "");
      if (response?.data) {
        yield put({ type: SET_STORE_DELIVERY_LISTING, payload: response.data });
      }
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    } catch (err) {
      console.log("error: " ,err);
      if (err?.response) {
        if (err?.response?.status === 401) {
          localStorage.clear();
          window.location.replace("/login");
        }
      }
    }
  }
  export function* createOrderDeliveryHandlerStore(action) {
    try {
    
      const response = yield call(createStoreOrderApi, action?.payload ?? "");
      if (response?.data) {
        yield put({
          type: SET_UI_ACTION,
        });
        yield put({
          type: ADD_TOASTER,
          payload: { type: "success", message: response.data.message },
        });
        dispatch(loadingAction({ isLoading: false }));
      }
    } catch (err) {
    
      
      if ( err?.response?.status === 400) {
        yield put({
          type: ADD_TOASTER,
          payload: {type:"error",message:err?.response?.data},
        });
      }
      
      console.log(err);
    }
  }
  export function* getStoreDeliveryDownloadHandler(action) {

    try {
      const response = yield call(getDownloadStoreDeliveryApi, action.payload ?? "");
      if (response.data) {
        // setTimeout(() => {
       
  
        yield put({ type: SET_DOWNLOAD_STORE_DELIVERY, payload: response.data });
        // }, 1000);
      }
      yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    } catch (err) { }
  }