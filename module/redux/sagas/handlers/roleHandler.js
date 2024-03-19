import { call, put } from "redux-saga/effects";
import { LOADING_ACTION } from "../../actions/loaderAction";
import {
  SET_ROLE_DATA,
  SET_ROLE_LIST,
  SET_SINGLE_ROLE,
} from "../../actions/roleAction";
import { ADD_TOASTER } from "../../actions/toasterAction";
import { SET_UI_ACTION } from "../../actions/uiAction";
import {
  bulkRoleUpdateApi,
  createRoleApi,
  getRoleListApi,
  getRolesApi,
  getSingleRoleApi,
} from "../requests/roleRequests";

export function* handleGetRoleList(action) {
  try {
    const response = yield call(getRoleListApi, action?.payload ?? "");

    if (response.data) {
      yield put({ type: SET_ROLE_LIST, payload: response.data });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}

export function* handleBulkRoleUpdate(action) {
  try {
    const response = yield call(bulkRoleUpdateApi, action?.payload ?? "");

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

export function* handleGetSingleRole(action) {
  try {
    const response = yield call(getSingleRoleApi, action?.payload ?? "");

    if (response.data) {
      yield put({ type: SET_SINGLE_ROLE, payload: response.data });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}

export function* handleGetRoles(action) {
  try {
    const response = yield call(getRolesApi, action?.payload ?? "");

    if (response.data) {
      yield put({ type: SET_ROLE_DATA, payload: response.data });
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.log(err);
  }
}

export function* handleCreateRole(action) {
  try {
    const response = yield call(createRoleApi, action?.payload ?? "");

    if (response.data) {
      yield put({
        type: SET_UI_ACTION,
      });
      yield put({
        type: ADD_TOASTER,
        payload: { type: "success", message: response.data.message },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
