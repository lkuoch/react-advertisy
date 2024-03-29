import { configureStore } from "@reduxjs/toolkit";

import { gqlClient } from "./api";
import { actionListener } from "./actionListener";

import * as cart from "../features/cart";
import * as customer from "../features/customer";

export const store = configureStore({
  middleware: (gDM) => gDM().prepend(actionListener.middleware, gqlClient.middleware),
  reducer: {
    [gqlClient.reducerPath]: gqlClient.reducer,
    [cart.name]: cart.reducer,
    [customer.name]: customer.reducer,
  },
});
