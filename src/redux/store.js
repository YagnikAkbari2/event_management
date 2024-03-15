import { rootReducer } from "./rootReducer";

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { watcherSaga } from "./sagas/rootSaga";

const sagaMiddlerWare = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddlerWare],
});

sagaMiddlerWare.run(watcherSaga);

export default store;
