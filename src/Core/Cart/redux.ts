import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { createActionListenerMiddleware } from "@rtk-incubator/action-listener-middleware";

import { cartApi } from "./api";
import { Product, ProductSelectionPayload } from "./models";
import { customerApi } from "@Core/Customer/api";
import { RootState } from "@Types";

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
  reducers: {
    handleProductSelection: (
      slice,
      _action: PayloadAction<ProductSelectionPayload>
    ) => slice,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.fetchProducts.matchFulfilled,
      (state, { payload }) => {
        cartAdapter.addMany(state, payload);
        state.slice.hasLoaded = true;
      }
    );
  },
});

export const listeners = ((listeners) => {
  listeners.addListener(
    customerApi.endpoints.fetchCustomers.matchFulfilled,
    async (_, { dispatch, getState }) => {
      cartApi.endpoints.fetchProducts.initiate()(dispatch, getState, {});
    }
  );

  return listeners;
})(createActionListenerMiddleware());

export const selectors = (() => {
  const cartSelector = ({ cart }: RootState) => cart;
  const adapterSelectors = cartAdapter.getSelectors(cartSelector);

  const selectSliceState = createSelector([cartSelector], (cart) => cart.slice);
  const selectProductPrices = createSelector(
    [adapterSelectors.selectAll],
    (products) => products.map(({ id, RetailPrice }) => ({ id, RetailPrice }))
  );

  return {
    adaptar: {
      ...adapterSelectors,
    },
    cartSelector,
    selectSliceState,
    selectProductPrices,
  };
})();
