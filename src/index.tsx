import * as React from "react";
import ReactDOM from "react-dom";
import { Provider as JotaiProvider } from "jotai";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { baseApi, listenerMiddleware, reducers } from "@features/common";

import App from "@components/index";
import "@styles/app.less";

// Setup store
export const store = configureStore({
  devTools: !CONFIG.isProd,
  reducer: { [baseApi.reducerPath]: baseApi.reducer, ...reducers },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, listenerMiddleware),
});

(async () => {
  // Setup msw for mock data
  if (!CONFIG.isProd) {
    const { worker } = await import("../mocks/mockServer");
    await worker.start();
  }

  ReactDOM.render(
    <React.StrictMode>
      <JotaiProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </JotaiProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
