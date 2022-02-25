import { createSelector } from "@reduxjs/toolkit";

import { calculateDiscountSavings, calculateFinalPrice } from "./services";
import { selectors as cartSelectors } from "../cart";
import { selectors as customerSelectors } from "../customer";

const selectBasePrice = createSelector(
  [customerSelectors.selectCurrentCustomerSelections, (state) => state],

  (selections, state) =>
    Object.keys(selections).reduce((subTotal, productId) => {
      const price = cartSelectors.selectCurrentProductPrice(productId)(state);
      const qty = customerSelectors.selectCurrentProductQty(productId)(state);

      return (subTotal += qty * price);
    }, 0)
);

const selectDiscountedPrice = createSelector(
  [customerSelectors.selectCurrentCustomerSelections, (state) => state],
  (selections, state) =>
    Object.keys(selections).reduce((discountSavingsTotal, productId) => {
      const price = cartSelectors.selectCurrentProductPrice(productId)(state);
      const qty = customerSelectors.selectCurrentProductQty(productId)(state);
      const offers = customerSelectors.selectCurrentProductOffers(productId)(state);

      return (discountSavingsTotal += offers.reduce(
        (offerSavingsTotal, offer) => (offerSavingsTotal += calculateDiscountSavings({ price, qty, offer })),
        0
      ));
    }, 0)
);

const selectFinalPrice = createSelector([selectBasePrice, selectDiscountedPrice], (basePrice, discountPrice) =>
  calculateFinalPrice({
    basePrice,
    discountPrice,
  })
);

export default {
  selectBasePrice,
  selectDiscountedPrice,
  selectFinalPrice,
};
