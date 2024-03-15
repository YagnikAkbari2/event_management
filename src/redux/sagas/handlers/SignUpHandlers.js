import { call, put } from "redux-saga/effects";
import { userSignupApi } from "../requests/SignUpRequests";
import { LOADING_ACTION } from "../../actions/uiAction";

export function* handleUserSignup(action) {
  try {
    const response = yield call(userSignupApi, action?.payload ?? "");
    if (response?.data) {
      if (response.data.code === 201) {
        if (response.data.status) {
          console.warn(response.message);
        }
      } else {
        console.log("response success but code is not 200");
      }
    }
    yield put({ type: LOADING_ACTION, payload: { isLoading: false } });
  } catch (err) {
    console.message(err.message);
  }
}
