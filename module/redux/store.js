import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./index";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { watcherSaga } from "./sagas/rootSaga";
// import storage from "redux-persist/lib/storage";

export const makeStore = () => {
  // Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  // create store with middleware:
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  // Run sagas on server
  store.sagaTask = sagaMiddleware.run(watcherSaga);
  // return the store:
  return store;
};

export const store = makeStore();
export const wrapper = createWrapper(makeStore, { debug: true,serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state) });
