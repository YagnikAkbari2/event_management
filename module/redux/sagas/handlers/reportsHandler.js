import { call, put } from "redux-saga/effects";

import {
  getReportsListApi,
  getSingleReportApi,
} from "../requests/reportsRequest";
import {
  SET_REPORTS,
  SET_REPORT_DOWNLOAD_URL,
  SET_SINGLE_REPORT,
} from "../../actions/reportAction";
import { SET_LOADING_ACTION } from "../../actions/productAction";
import { LOADING_ACTION } from "../../actions/userAction";

export function* handleGetReports(action) {
  try {
    const response = yield call(getReportsListApi, action?.payload ?? "");
    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_REPORTS, payload: response.data });
          yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
        }
        // yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
      } else {
        throw "Error Fetching Reports List";
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    yield put({ type: SET_LOADING_ACTION, payload: false });
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

export function* handleGetSingleReport(action) {
  try {
    const response = yield call(getSingleReportApi, action?.payload ?? "");
    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_SINGLE_REPORT, payload: response.data });
          yield put({ type: SET_LOADING_ACTION, payload: false });
        }
      } else {
        throw "Error Fetching Single Report";
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    yield put({ type: SET_LOADING_ACTION, payload: false });
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

export function* handleReportDownload(action) {
  try {
    const response = yield call(getSingleReportApi, action?.payload ?? "");
    if (response.status === 200) {
      if (response.data?.code === 200) {
        if (response.data) {
          yield put({ type: SET_REPORT_DOWNLOAD_URL, payload: response.data });
          yield put({ type: SET_LOADING_ACTION, payload: false });
        }
      } else {
        throw "Error Getting Download URL";
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
    yield put({ type: SET_LOADING_ACTION, payload: false });
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
