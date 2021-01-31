import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Customer, CustomerMeta, CustomerSelection } from "./models";

// Slice details
const name = "CUSTOMER";

const adapter = createEntityAdapter<Customer>({
  selectId: (customer) => customer.id,
  sortComparer: false,
});

const selector = adapter.getSelectors<IRootState>((state) => state[name]);

interface IState {
  state: ICustomerState;
}

export interface ICustomerState {
  current: number;
  selections: CustomerSelection;
  meta: CustomerMeta;
}

const { actions, reducer } = createSlice({
  name,
  initialState: adapter.getInitialState<IState>({
    state: {
      current: 0,
      selections: {},
      meta: {},
    },
  }),
  reducers: {
    initCustomer: (slice) => slice,

    updateCurrentCustomer: (slice, action: PayloadAction<number>) => {
      slice.state.current = action.payload;
    },
    updateCustomerSelections: (
      slice,
      action: PayloadAction<CustomerSelection>
    ) => {
      slice.state.selections = action.payload;
    },
    updateCustomerMeta: (slice, action: PayloadAction<CustomerMeta>) => {
      slice.state.meta = action.payload;
    },

    // CRUD
    addCustomer: adapter.addOne,
    addCustomers: adapter.addMany,
  },
});

const selectors = {
  selectState: (state: IRootState) => state[name].state,
  selectCurrentOffers: (state: IRootState) =>
    state[name].entities[state[name].state.current]?.Offers,

  selectAdapted: (state: IRootState) => ({
    ids: selector.selectIds(state),
    entities: selector.selectEntities(state),
  }),
};

export { actions, reducer, selectors, name };
