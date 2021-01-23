import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SliceCaseReducers, CaseReducer } from "@reduxjs/toolkit";

import type { IRootState } from "@AppTypes";

export namespace IPriceSummary {
  export interface IState {
    totals: IPrices;
  }

  export interface IActions extends SliceCaseReducers<IState> {
    initPriceSummary: CaseReducer<IState>;

    updatePrices: CaseReducer<IState, PayloadAction<IPrices>>;
  }

  export interface IPrices {
    totalPrice: number;
    discountPrice: number;
    finalTotalPrice: number;
  }
}

// Slice details
const name = "PRICE_SUMMARY";

const initialState: IPriceSummary.IState = {
  totals: {
    totalPrice: 0,
    discountPrice: 0,
    finalTotalPrice: 0,
  },
};

const { actions, reducer } = createSlice<IPriceSummary.IState, IPriceSummary.IActions>({
  name,
  initialState,
  reducers: {
    initPriceSummary: (state) => state,

    updatePrices: (state, { payload }) => {
      state.totals = payload;
    },
  },
});

const selectors = {
  selectPrices: (state: IRootState) => state[name].totals,
};

export { initialState, actions, reducer, selectors, name };
