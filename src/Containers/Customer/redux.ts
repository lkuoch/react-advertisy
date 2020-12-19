import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SliceCaseReducers, CaseReducer } from "@reduxjs/toolkit";

import { Customer, MappedCustomer } from "./models";
import type { IRootState } from "@AppTypes";

export namespace ICustomer {
  export interface IState {
    currentCustomer: number;
    customers: Customer[];
    mappedCustomers: MappedCustomer;
    customerSelections: ICustomerSelection;
    meta: ICustomerMeta;
  }

  export interface IActions extends SliceCaseReducers<IState> {
    initCustomer: CaseReducer<IState>;

    updateCustomers: CaseReducer<IState, PayloadAction<Customer[]>>;
    updateMappedCustomers: CaseReducer<IState, PayloadAction<MappedCustomer>>;
    updateCurrentCustomer: CaseReducer<IState, PayloadAction<number>>;
    updateCustomerSelections: CaseReducer<
      IState,
      PayloadAction<ICustomerSelection>
    >;
    updateCustomerMeta: CaseReducer<IState, PayloadAction<ICustomerMeta>>;
  }

  export interface IStateProps {
    customers: Customer[];
    currentCustomer: number;
    customerSelections: ICustomerSelection;
  }

  export interface IDispatchProps {
    updateCurrentCustomer: (payload: number) => void;
  }

  export interface IOwnProps {}

  export interface IProps extends IStateProps, IDispatchProps, IOwnProps {};

  export interface ICustomerSelection {
    [cusID: number]: {
      [prodID: number]: {
        qty?: number;
        customerPrice?: number;
      };
    };
  }

  export interface ICustomerMeta {
    [cusID: number]: {
      discountsApplied: boolean;
    };
  }
}

// Slice details
const name = "CUSTOMER";

const initialState: ICustomer.IState = {
  customers: [],
  mappedCustomers: {},
  currentCustomer: 0,
  customerSelections: {},
  meta: {},
};

const { actions, reducer } = createSlice<ICustomer.IState, ICustomer.IActions>({
  name,
  initialState,
  reducers: {
    initCustomer: (state) => state,

    updateCustomers: (state, { payload }) => {
      state.customers = payload;
    },
    updateMappedCustomers: (state, { payload }) => {
      state.mappedCustomers = payload;
    },
    updateCurrentCustomer: (state, { payload }) => {
      state.currentCustomer = payload;
    },
    updateCustomerSelections: (state, { payload }) => {
      state.customerSelections = payload;
    },
    updateCustomerMeta: (state, { payload }) => {
      state.meta = payload;
    },
  },
});

const selectors = {
  selectCustomers: (state: IRootState) => state[name].customers,
  selectMappedCustomers: (state: IRootState) => state[name].mappedCustomers,
  selectCurrentCustomer: (state: IRootState) => state[name].currentCustomer,
  selectCustomerSelections: (state: IRootState) =>
    state[name].customerSelections,
  selectCurrentOffers: (state: IRootState, currentCustomer: number) =>
    state[name].mappedCustomers[currentCustomer]?.Offers,
  selectCustomerMeta: (state: IRootState) => state[name].meta,
};

export { initialState, actions, reducer, selectors, name };
