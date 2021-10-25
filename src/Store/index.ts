import { configureStore } from "@reduxjs/toolkit";

import { name as appReducerKey, reducer as appReducer } from "@Core/App/redux";
import { reducers as coreReducers, apiMiddlewares, listenerMiddlewares } from "@Core/index";
import { name as priceSummaryReducerKey, reducer as priceSummaryNameReducer } from "@Core/PriceSummary/redux";

export const store = configureStore({
  devTools: !CONFIG.isProd,
  reducer: {
    [appReducerKey]: appReducer,
    [priceSummaryReducerKey]: priceSummaryNameReducer,
    ...coreReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares, ...listenerMiddlewares),
});
