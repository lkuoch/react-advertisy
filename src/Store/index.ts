import { configureStore } from "@reduxjs/toolkit";

import {
  reducers as coreReducers,
  apiMiddlewares,
  listenerMiddlewares,
} from "@Core/index";
import {
  name as priceSummaryReducerKey,
  reducer as priceSummaryNameReducer,
} from "@Core/PriceSummary/redux";

export const store = configureStore({
  devTools: !CONFIG.isProd,
  reducer: {
    [priceSummaryReducerKey]: priceSummaryNameReducer,
    ...coreReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares, ...listenerMiddlewares),
});
