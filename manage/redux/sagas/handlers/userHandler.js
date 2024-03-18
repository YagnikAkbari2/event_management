import { call, put } from "redux-saga/effects";
import { store } from "../../store";
import { errObjtoArray } from "../../../commonjs/commonHelpers";

import {
  userLogedInApi,
  storeSearchApi,
  getUsersListApi,
  getUserApi,
  updateUserDetailsApi,
  addUserDetailsApi,
  updateUserStatusApi,
  deleteUserApi,
  changePasswordUserApi,
  citySearchApi,
} from "../requests/userRequests";

import {
  LOADING_ACTION,
  SET_CITY_SEARCH,
  SET_CURRENT_STORE_DATA,
  SET_STORE_SEARCH,
  SET_USER,
  SET_USERS_LIST,
  SET_USER_LOGIN_DETAILS,
  loadingAction,
} from "../../actions/userAction";
import { ADD_TOASTER, SET_ERR_MSG } from "../../actions/toasterAction";
import { SET_UI_ACTION } from "../../actions/uiAction";

export function* handleUserloggedInDetails(action) {
  try {
    const response = yield call(userLogedInApi, action?.payload ?? "");
    if (response?.data) {
      console.log("activeactive", localStorage.getItem("active_store_id"));
      if (
        localStorage.getItem("active_store_id") === null ||
        localStorage.getItem("active_store_id") === "null"
      ) {
        if (
          response?.data?.user?.permissions &&
          response?.data?.user?.permissions?.length
        ) {
          yield put({
            type: SET_CURRENT_STORE_DATA,
            payload: {
              id: response?.data?.user?.permissions[0]?.store_id,
              name: response?.data?.user?.permissions[0]?.store_name,
            },
          });
        }
      } else {
        yield put({
          type: SET_CURRENT_STORE_DATA,
          payload: {
            id: localStorage.getItem("active_store_id"),
            name: localStorage.getItem("active_store_name"),
          },
        });
      }
      yield put({ type: SET_USER_LOGIN_DETAILS, payload: response.data });
      // dispatch(loadingAction({ isLoading: false }));
    }
  } catch (err) {
    localStorage.removeItem("active_store_id");
    localStorage.removeItem("active_store_name");
    console.log(err);

    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
  }
}
export function* handleGetUsersList(action) {
  try {
    const response = yield call(getUsersListApi, action?.payload ?? "");
    if (response.data) {
      yield put({ type: SET_USERS_LIST, payload: response.data });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}
export function* handleGetUser(action) {
  try {
    const response = yield call(getUserApi, action?.payload ?? "");
    if (response.data) {
      yield put({ type: SET_USER, payload: response.data });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}
export function* handleUpdateUserData(action) {
  try {
    const response = yield call(updateUserDetailsApi, action?.payload ?? "");
    if (response.data) {
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response.data.message },
      });
      yield put({
        type: SET_UI_ACTION,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* handleAddUserData(action) {
  try {
    const response = yield call(addUserDetailsApi, action?.payload ?? "");
    if (response.data) {
      yield put({
        type: ADD_TOASTER,
        payload: {
          type: "success",
          message: response?.data?.message,
        },
      });
      yield put({
        type: SET_UI_ACTION,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* handleUpdateUserstatus(action) {
  try {
    const response = yield call(updateUserStatusApi, action?.payload ?? "");
    if (response) {
      yield put({
        type: ADD_TOASTER,
        payload: {
          type: "success",
          message: response?.message
            ? response.message
            : response?.data?.message,
        },
      });
      yield put({
        type: SET_UI_ACTION,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* handleDeleteUser(action) {
  try {
    const response = yield call(deleteUserApi, action?.payload ?? "");
    if (response) {
      if (response.data) {
        yield put({
          type: ADD_TOASTER,
          payload: {
            type: "success",
            message: response?.data?.message,
          },
        });
      }
      yield put({
        type: SET_UI_ACTION,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* handleGetStoreSearch(action) {
  try {
    const response = yield call(storeSearchApi, action?.payload ?? "");
    if (response?.data) {
      yield put({ type: SET_STORE_SEARCH, payload: response.data });
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
export function* handleGetCityList(action) {
  try {
    const response = yield call(citySearchApi, action?.payload ?? "");
    if (response?.data) {
      yield put({ type: SET_CITY_SEARCH, payload: response.data });
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
export function* handleChangePasswordUser(action) {
  try {
    const response = yield call(changePasswordUserApi, action?.payload ?? "");
    if (response.data) {
      yield put({
        type: ADD_TOASTER,
        payload: {
          type: "success",
          message: response?.data?.message,
        },
      });
      yield put({
        type: SET_UI_ACTION,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
