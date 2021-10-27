import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { selectors as customerSelectors } from "@Core/Customer/redux";
import { selectors as cartSelectors } from "@Core/Cart/redux";

import { applyOffer, calculateBasePrice, calculateDiscountPrice } from "./services";

export interface State {}

// Slice details
export const name = "priceSummary";

export const { actions, reducer } = createSlice({
  name,
  initialState: {},
  reducers: {},
});

export const selectors = (() => {
  const selectPriceInformation = createSelector(
    [cartSelectors.adaptar.selectAll, (state) => state],
    (products, state) =>
      products.map(({ id, RetailPrice: price }) => {
        const qty = customerSelectors.selectCurrentProductQuantity(state, id);
        const currentOffers = customerSelectors.selectCurrentOffers(state, id);

        return {
          id,
          currentOffers,
          qty,
          price,
          total: calculateBasePrice({ qty, price }),
        };
      })
  );

  const selectBasePrice = createSelector([selectPriceInformation], (priceInfo) =>
    priceInfo.reduce((subtotal, { total }) => (subtotal += total), 0)
  );

  const selectFinalPrice = createSelector([selectPriceInformation], (priceInfo) =>
    priceInfo.reduce(
      (discountSubTotal, { currentOffers: { hasOffers, offers }, qty, price }) =>
        (discountSubTotal += hasOffers
          ? offers.reduce((subtotal, offer) => (subtotal += applyOffer({ price, qty, offer })), 0)
          : 0),
      0
    )
  );

  const selectDiscountPrice = createSelector([selectBasePrice, selectFinalPrice], (basePrice, finalPrice) =>
    calculateDiscountPrice({ basePrice, finalPrice })
  );

  return {
    selectBasePrice,
    selectFinalPrice,
    selectDiscountPrice,
  };
})();
