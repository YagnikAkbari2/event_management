import { takeLatest, all } from "redux-saga/effects";
import { handleUserSignup } from "./handlers/SignUpHandlers";
import { USER_SIGNUP } from "../actions/signupAction";

export function* watcherSaga() {
  yield all([yield takeLatest(USER_SIGNUP, handleUserSignup)]);
}
