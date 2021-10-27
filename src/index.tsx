import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { worker } from "./mocks/browser";

import { reducers, apiMiddlewares, listenerMiddlewares } from "@features/index";

import App from "src/components/index";
import "@styles/app.less";

// Setup store
export const store = configureStore({
  devTools: !CONFIG.isProd,
  reducer: { ...reducers },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares, ...listenerMiddlewares),
});

(async () => {
  // Setup msw
  if (!CONFIG.isProd) {
    await worker.start();
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
})();
