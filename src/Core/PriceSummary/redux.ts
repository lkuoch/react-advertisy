import { createSlice } from "@reduxjs/toolkit";
import { Prices } from "./models";

// Slice details
const name = "PRICE_SUMMARY";

interface IState {
  totals: Prices;
}

const initialState: IState = {
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
