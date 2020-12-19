import createSagaMiddleWare from "redux-saga";
import { applyMiddleware, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./redux";
import rootSagas from "./sagas";

const getEnhancers = (middleWares: Array<Middleware>) => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(...middleWares);
  }

  // Use redux devtools in development environment
  return composeWithDevTools(applyMiddleware(...middleWares));
};

export default function configureStore(initialState = {}) {
  const sagaMiddleWare = createSagaMiddleWare();

  // Default middlewares
  const middleWares = [sagaMiddleWare];

  // Link enhancers depending on environment
  const enhancers = getEnhancers(middleWares);

  // Init store
  const store = createStore(rootReducers, initialState, enhancers);

  // Run sagas
  sagaMiddleWare.run(rootSagas);

  return store;
}
