import * as cartState from "@features/cart/state";
import * as customerState from "@features/customer/state";
import * as priceSummaryState from "@features/priceSummary/state";

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

export const listenerMiddlewares = [cartState.listener];
