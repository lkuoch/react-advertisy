import * as cartState from "@Core/Cart/redux";
import * as customerState from "@Core/Customer/redux";

import { cartApi } from "@Core/Cart/api";
import { customerApi } from "@Core/Customer/api";

export const reducers = {
  [cartApi.reducerPath]: cartApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,

  [cartState.name]: cartState.reducer,
  [customerState.name]: customerState.reducer,
};

export const apiMiddlewares = [cartApi.middleware, customerApi.middleware];

export const listenerMiddlewares = [cartState.listeners];