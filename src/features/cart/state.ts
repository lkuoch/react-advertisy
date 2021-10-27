import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { createActionListenerMiddleware } from "@rtk-incubator/action-listener-middleware";

import { customerApi } from "@features/customer/api";
import { cartApi } from "./api";
import type { Product } from "./types";
import type { RootState } from "@types";

interface State {
  slice: {
    hasLoaded: boolean;
  };
}

const cartAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.Name.localeCompare(b.Name),
});

// Slice details
export const name = "cart";

export const { actions, reducer } = createSlice({
  name,
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

export const listeners = ((listeners) => {
  listeners.addListener(customerApi.endpoints.fetchCustomers.matchFulfilled, async (_, { dispatch, getState }) => {
    cartApi.endpoints.fetchProducts.initiate()(dispatch, getState, {});
  });

  return listeners;
})(createActionListenerMiddleware());

export const selectors = (() => {
  const cartSelector = ({ cart }: RootState) => cart;
  const adapterSelectors = cartAdapter.getSelectors(cartSelector);

  const selectSliceState = createSelector([cartSelector], (cart) => cart.slice);

  return {
    adaptar: {
      ...adapterSelectors,
    },
    selectSliceState,
  };
})();
