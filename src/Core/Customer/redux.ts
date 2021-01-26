import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Customer, CustomerMeta, CustomerSelection } from "./models";

// Slice details
const name = "CUSTOMER";

interface IState {
  current: number;
  selections: CustomerSelection;
  meta: CustomerMeta;
}

const adapter = createEntityAdapter<Customer>({
  selectId: (customer) => customer.id,
  sortComparer: false,
});

const slice = adapter.getSelectors<IRootState>((state) => state[name]);

const { actions, reducer } = createSlice({
  name,
  initialState: adapter.getInitialState<IState>({
    current: 0,
    selections: {},
    meta: {},
  }),
  reducers: {
    initCustomer: (state) => state,

    updateCurrentCustomer: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    updateCustomerSelections: (
      state,
      action: PayloadAction<CustomerSelection>
    ) => {
      state.selections = action.payload;
    },
    updateCustomerMeta: (state, action: PayloadAction<CustomerMeta>) => {
      state.meta = action.payload;
    },

    // CRUD
    addCustomer: adapter.addOne,
    addCustomers: adapter.addMany,
  },
});

const selectors = {
  selectCurrentCustomer: (state: IRootState) => state[name].current,
  selectCurrentOffers: (state: IRootState) =>
    state[name].entities[state[name].current]?.Offers,
  selectCustomerMeta: (state: IRootState) => state[name].meta,
  selectCustomerSelections: (state: IRootState) => state[name].selections,

  selectCustomersState: (state: IRootState) => ({
    ids: slice.selectIds(state),
    entities: slice.selectAll(state),
  }),
  selectCustomers: (state: IRootState) => slice.selectEntities(state),
  selectCustomerIds: (state: IRootState) => slice.selectIds(state),
};

export { actions, reducer, selectors, name };
