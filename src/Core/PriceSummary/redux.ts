import { createSlice } from "@reduxjs/toolkit";
import { Prices } from "./models";
import { RootState } from "@Types";

// Slice details
const name = "PRICE_SUMMARY";

export interface IPriceSummaryState {
  totals: Prices;
}

const initialState: IPriceSummaryState = {
  totals: {
    totalPrice: 0,
    discountPrice: 0,
    finalTotalPrice: 0,
  },
};

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    initPriceSummary: (slice) => slice,

    updatePrices: (slice, { payload }) => {
      slice.totals = payload;
    },
  },
});

const selectors = {
  selectState: (state: RootState) => state[name],

  selectPrices: (state: RootState) => state[name].totals,
};

export { initialState, actions, reducer, selectors, name };
