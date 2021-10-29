import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { createActionListenerMiddleware } from "@rtk-incubator/action-listener-middleware";

import { customerApi } from "@features/customer/api";
import { cartApi } from "./api";
import type { Product } from "./types";

interface State {
  slice: {
    hasLoaded: boolean;
  };
}

const cartAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Slice details
export const { actions, name, reducer } = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState<State>({
    slice: {
      hasLoaded: false,
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.fetchProducts.matchFulfilled, (state, { payload }) => {
      cartAdapter.addMany(state, payload);
      state.slice.hasLoaded = true;
    });
  },
});

export const listener = ((listener) => {
  listener.addListener(customerApi.endpoints.fetchCustomers.matchFulfilled, async (_, { dispatch, getState }) => {
    cartApi.endpoints.fetchProducts.initiate()(dispatch, getState, {});
  });

  return listener;
})(createActionListenerMiddleware());

export const selectors = (() => {
  const adapterSelectors = cartAdapter.getSelectors(({ cart }: RootState) => cart);
  const selectHasLoaded = ({ cart }: RootState) => cart.slice.hasLoaded;

  return {
    adapter: {
      ...adapterSelectors,
    },
    selectHasLoaded,
  };
})();
