import { apiMiddleware } from "redux-api-middleware";
import createSagaMiddleWare from "redux-saga";
import { applyMiddleware, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./redux";
import rootSagas from "./sagas";

const getEnhancers = (middleWares: Array<Middleware>) => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(...middleWares);
  }

  // Use redux devtools in development environment
  return composeWithDevTools({
    trace: true,
  })(applyMiddleware(...middleWares));
};

export function configureStore(initialState = {}) {
  const sagaMiddleWare = createSagaMiddleWare();

  // Default middlewares
  const middleWares = [apiMiddleware, sagaMiddleWare];

  // Link enhancers depending on environment
  const enhancers = getEnhancers(middleWares);

  // Init store
  const store = createStore(rootReducer, initialState, enhancers);

  // Run sagas
  sagaMiddleWare.run(rootSagas);

  return store;
}
