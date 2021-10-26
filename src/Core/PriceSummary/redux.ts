import { createSlice } from "@reduxjs/toolkit";
import { Prices } from "./models";

import { RootState } from "@Types";

export interface State {
  totals: Prices;
}

// Slice details
export const name = "priceSummary";

export const { actions, reducer } = createSlice({
  name,
  initialState: {
    totals: {
      totalPrice: 0,
      discountPrice: 0,
      finalTotalPrice: 0,
    },
  },
  reducers: {
    updatePrices: (slice, { payload }) => {
      slice.totals = payload;
    },
  },
});

export const selectors = (() => {
  const selectPrices = ({ priceSummary }: RootState) => priceSummary.totals;

  return {
    selectPrices,
  };
})();
