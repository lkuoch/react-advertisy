import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
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

// Slice details
const name = "cart";

const cartAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.Name.localeCompare(b.Name),
});

const cartSelectors = cartAdapter.getSelectors<RootState>((state) => state[name]);

const initialState = cartAdapter.getInitialState<State>({
  slice: {
    hasLoaded: false,
  },
});

const listeners = createActionListenerMiddleware();

listeners.addListener(customerApi.endpoints.fetchCustomers.matchFulfilled, async (_, { dispatch, getState }) => {
  cartApi.endpoints.fetchProducts.initiate()(dispatch, getState, {});
});

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    handleProductSelection: (slice, _action: PayloadAction<ProductSelectionPayload>) => slice,
  },
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.fetchProducts.matchFulfilled, (state, { payload }) => {
      cartAdapter.addMany(state, payload);
      state.slice.hasLoaded = true;
    });
  },
});

const selectors = {
  ...cartSelectors,
  selectHasLoaded: ({ cart }: RootState) => cart.slice.hasLoaded,
  selectSlice: (state: RootState) => state[name].slice,
};

export { actions, initialState, listeners, name, reducer, selectors };
