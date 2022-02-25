import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { cartApi } from "./";
import { actionListener } from "../../store/actionListener";
import { customerApi } from "../customer";
import type { Product } from "../../types";

export const cartEntities = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const { actions, name, reducer } = createSlice({
  name: "cart",
  initialState: cartEntities.getInitialState({}),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.fetchProducts.matchFulfilled, (state, { payload }) => {
      cartEntities.addMany(state, payload);
    });
  },
});

actionListener.startListening({
  matcher: customerApi.endpoints.fetchCustomers.matchFulfilled,
  effect: async (_, { dispatch }) => {
    dispatch(cartApi.endpoints.fetchProducts.initiate());
  },
});
