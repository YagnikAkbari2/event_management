import { call, put } from "redux-saga/effects";
import { loginApi, verifyPasswordApi } from "../requests/authRequests";
import { SET_LOGIN_DATA, VERIFY_SUCCESS } from "../../actions/authAction";
import { tokens } from "../../../commonjs/common";
import { ADD_TOASTER } from "../../actions/toasterAction";
export function* handleUserLogin(action) {
  try {
    // yield put({ type: SET_USERNAME, payload: action.payload });loginApi
    const response = yield call(loginApi, action);

    if (response.status === 200) {
      if (response.data) {
        if (response.data.code === 200) {
          if (response.data.user) {
            // localStorage.setItem('token',response.data.user?.auth?.token);
            if (response.data.user?.auth?.token) {
              tokens.set(response.data.user?.auth?.token);
              localStorage.setItem(
                "storeName",
                response.data.user?.profile?.name
              );
              // localStorage.setItem(
              //   "storeCode",
              //   response.data.store?.store_code
              // );
              localStorage.setItem(
                "storeEmail",
                response.data.user?.profile?.email
              );
              yield put({
                type: SET_LOGIN_DATA,
                payload: response.data.store,
              });
              window.location.replace("/");
            }
          } else {
            yield put({
              type: ADD_TOASTER,
              payload: { type: "error", message: response.data.message },
            });
          }
        }
      }
    }
  } catch (err) {
    console.log("errr", err);
  }
}
export function* handleVerifyPassword(action) {
  try {
    const response = yield call(verifyPasswordApi, action);
    if (response?.data) {
      if (response?.data.code === 200) {
        console.log("action", response?.data);
        yield put({
          type: VERIFY_SUCCESS,
          payload: { success: true },
        });
        yield put({
          type: ADD_TOASTER,
          payload: { type: "success", message: response.data.message },
        });
      } else {
        yield put({
          type: ADD_TOASTER,
          payload: { type: "error", message: response.data.message },
        });
      }
    }
  } catch (err) {
    if (err?.response) {
      if (err.response.data.errors) {
        let errorMessage = "";
        Object.keys(err.response.data.errors).map((key) => {
          errorMessage =
            (errorMessage ? errorMessage + " and " : "") +
            (err.response.data.errors[key].length
              ? err.response.data.errors[key].join(", ")
              : "");
        });
        yield put({
          type: ADD_TOASTER,
          payload: { type: "error", message: errorMessage },
        });
      } else {
        yield put({
          type: ADD_TOASTER,
          payload: { type: "error", message: err.response?.data?.message },
        });
      }
    }
  }
}
