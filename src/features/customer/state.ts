import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import set from "lodash/set";

import { customerApi } from "./";
import { Customer } from "../../schema/generated";

export interface State {
  currentCustomerId: string;
  selections: {
    [customerId: string]: {
      [productId: string]: {
        qty: number;
      };
    };
  };
}

export const customerEntities = createEntityAdapter<Customer>({
  selectId: (customer) => customer.id,
});

export const { actions, name, reducer } = createSlice({
  name: "customer",
  initialState: customerEntities.getInitialState<State>({
    currentCustomerId: "",
    selections: {},
  }),
  reducers: {
    addToCart: (state, { payload }: PayloadAction<string>) => {
      const { currentCustomerId, selections } = state;
      const qty = selections[currentCustomerId]?.[payload]?.qty ?? 0;

      if (currentCustomerId) {
        set(state, ["selections", state.currentCustomerId, payload, "qty"], qty + 1);
      }
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      const { currentCustomerId, selections } = state;
      const qty = selections[currentCustomerId]?.[payload]?.qty ?? 0;

      if (currentCustomerId && qty > 0) {
        set(state, ["selections", state.currentCustomerId, payload, "qty"], qty - 1);
      }
    },
    updateCurrentCustomer: (state, { payload }: PayloadAction<string>) => {
      state.currentCustomerId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(customerApi.endpoints.fetchCustomers.matchFulfilled, (state, { payload }) => {
      customerEntities.addMany(state, payload);
      state.currentCustomerId = payload.find(Boolean)?.id ?? "";
    });
  },
});
