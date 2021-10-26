import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import { selectors as cartSelectors } from "@Core/Cart/redux";
import { Prices } from "./models";

import { RootState } from "@Types";

export interface State {
  discountPrice: boolean;
  totals: Prices;
}

// Slice details
export const name = "priceSummary";

export const { actions, reducer } = createSlice({
  name,
  initialState: {
    discountPrice: false,
    totals: {
      basePrice: 0,
      discountPrice: 0,
      totalPrice: 0,
    },
  },
  reducers: {
    updatePrices: (slice, { payload }) => {
      slice.totals = payload;
    },
  },
});

export const selectors = (() => {
  const priceSummarySelector = ({ priceSummary }: RootState) => priceSummary;

  const selectPrices = createSelector(
    priceSummarySelector,
    (priceSummary) => priceSummary.totals
  );

  // const selectTest = createSelector(
  //   [cartSelectors.selectProductPrices],
  //   (productPrices) => {
  //     // console.log(
  //     //   "✖",
  //     //   ids.map((id) =>
  //     //     currentProductQuantitySelector(customerSelectors.customerSelector, id)
  //     //   )
  //     // );

  //     // productPrices.forEach(({ id }) => {
  //     //   console.log("✔", id);
  //     //   console.log("✔✔", customerSelectors.selectCurrentProductQuantity(id));
  //     // });

  //     return [];
  //   }
  // );

  // Helper foo
  // const selectBasePrice = createSelector(selectTest, (products) => {
  //   // console.log("✔", products);

  //   return 0;
  // });

  // const hasDiscount
  const selectTotalPrice = (customerId: string) =>
    createSelector(
      [
        customerSelectors.selectCurrentOffers,
        customerSelectors.selectCurrentProductQuantity,
      ],
      () => 0
    );

  // selectBasePrice: selectTest,

  return {
    selectPrices,
  };
})();
