import * as cartState from "@features/cart/redux";
import * as customerState from "@features/customer/redux";
import * as priceSummaryState from "@features/priceSummary/redux";

import { cartApi } from "@features/cart/api";
import { customerApi } from "@features/customer/api";

export const reducers = {
  [cartApi.reducerPath]: cartApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,

  [cartState.name]: cartState.reducer,
  [customerState.name]: customerState.reducer,
  [priceSummaryState.name]: priceSummaryState.reducer,
};

export const apiMiddlewares = [cartApi.middleware, customerApi.middleware];

export const listenerMiddlewares = [cartState.listeners];
