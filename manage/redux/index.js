import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import reportReducer from "./reducers/reportReducer";
import toasterReducer from "./reducers/toasterReducer";
import uiReducer from "./reducers/uiReducer";
import auditReducer from "./reducers/stockAuditReducer";
import homeDeliveryReducer from "./reducers/homeDeliveryReducer";
import storeDeliveryReducer from "./reducers/storeDeliveryReducer";
import roleReducer from "./reducers/roleReducer"
import authReducer from "./reducers/authReducer"
const appReducers = combineReducers({
  user: userReducer,
  product: productReducer,
  report: reportReducer,
  toasterReducer: toasterReducer,
  ui: uiReducer,
  audit: auditReducer,
  homeDelivery: homeDeliveryReducer,
  storeDelivery: storeDeliveryReducer,
  roles: roleReducer,
  auth:authReducer
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};
export default rootReducer;
