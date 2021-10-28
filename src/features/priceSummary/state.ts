import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@utils/createSelector";

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
  const selectBasePrice = createSelector(
    [
      (state) =>
        cartSelectors.adapter
          .selectAll(state)
          .reduce(
            (subTotal, { id, RetailPrice: price }) =>
              (subTotal += customerSelectors.selectCurrentProductQuantity(state, id) * price),
            0
          ),
    ],
    (result) => result,
    CONFIG.vars.selector_options
  );

  const selectDiscountedSavings = createSelector(
    [
      (state) =>
        cartSelectors.adapter.selectAll(state).map(({ id, RetailPrice: price }) => ({
          price,
          qty: customerSelectors.selectCurrentProductQuantity(state, id),
          offers: customerSelectors.selectCurrentCustomerProductOffers(state, id),
        })),
    ],
    (pricings) =>
      pricings.reduce(
        (discountSavingsTotal, { price, qty, offers }) =>
          (discountSavingsTotal += offers.reduce(
            (offerSavingsTotal, offer) => (offerSavingsTotal += calculateDiscountSavings({ price, qty, offer })),
            0
          )),
        0
      ),
    CONFIG.vars.selector_options
  );

  const selectFinalPrice = createSelector(
    [selectBasePrice, selectDiscountedSavings],
    (basePrice, discountPrice) => calculateFinalPrice({ basePrice, discountPrice }),
    CONFIG.vars.selector_options
  );

  return {
    selectBasePrice,
    selectDiscountedSavings,
    selectFinalPrice,
  };
})();
