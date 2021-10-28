import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { selectors as customerSelectors } from "@features/customer/state";
import { selectors as cartSelectors } from "@features/cart/state";

import { calculateDiscountSavings, calculateFinalPrice } from "./services";

export interface State {}

// Slice details
export const name = "priceSummary";

export const { actions, reducer } = createSlice({
  name,
  initialState: {},
  reducers: {},
});

export const selectors = (() => {
  const selectBasePrice = createSelector([cartSelectors.adaptar.selectAll, (state) => state], (products, state) =>
    products.reduce(
      (subTotal, { id, RetailPrice: price }) =>
        (subTotal += customerSelectors.selectCurrentProductQuantity(state, id) * price),
      0
    )
  );

  const selectDiscountedSavings = createSelector(
    [cartSelectors.adaptar.selectAll, (state) => state],
    (products, state) =>
      products.reduce((discountSavingsTotal, { id, RetailPrice: price }) => {
        const qty = customerSelectors.selectCurrentProductQuantity(state, id);
        const { hasOffers, offers } = customerSelectors.selectCurrentOffers(state, id);

        return (discountSavingsTotal += hasOffers
          ? offers.reduce(
              (offerSavingsTotal, offer) => (offerSavingsTotal += calculateDiscountSavings({ price, qty, offer })),
              0
            )
          : 0);
      }, 0)
  );

  const selectPriceSummary = createSelector([selectBasePrice, selectDiscountedSavings], (basePrice, discountPrice) => ({
    basePrice,
    discountPrice,
    finalPrice: calculateFinalPrice({ basePrice, discountPrice }),
  }));

  return {
    selectPriceSummary,
  };
})();
