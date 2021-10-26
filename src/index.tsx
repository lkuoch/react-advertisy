import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { worker } from "./Mocks/browser";

import { reducers, apiMiddlewares, listenerMiddlewares } from "@Core/index";

import App from "@Components/index";
import "@Styles/app.less";

(async () => {
  // Setup msw
  if (!CONFIG.isProd) {
    await worker.start();
  }

  // Setup store
  const store = configureStore({
    devTools: !CONFIG.isProd,
    reducer: { ...reducers },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...apiMiddlewares, ...listenerMiddlewares),
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
})();
