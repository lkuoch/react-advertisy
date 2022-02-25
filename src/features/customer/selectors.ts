import { createSelector } from "@reduxjs/toolkit";

import { customerEntities } from "./state";
import { ProductOfferType, RootState } from "../../types";

const entitySelectors = customerEntities.getSelectors(({ customer }: RootState) => customer);

const selectCurrentCustomerId = (state: RootState) => state.customer.currentCustomerId;
const selectCurrentCustomer = (state: RootState) => entitySelectors.selectById(state, selectCurrentCustomerId(state));

const selectCustomerSelections = (state: RootState) => state.customer.selections;

const selectCurrentCustomerSelections = createSelector(
  [selectCurrentCustomerId, selectCustomerSelections],
  (customerId, selections) => selections?.[customerId] ?? {}
);

const selectCurrentProductQty = (productId: string) =>
  createSelector(
    [selectCurrentCustomerId, selectCustomerSelections],
    (customerId, selections) => selections?.[customerId]?.[productId]?.qty ?? 0
  );

const selectProductOffer = ({ productId, offerType }: { productId: string; offerType?: ProductOfferType }) =>
  createSelector([selectCurrentCustomer], (customer) => {
    const offers = customer?.offers.find((product) => product?.id === productId)?.offers ?? [];

    return offerType ? offers?.find((productOffer) => productOffer?.type === offerType)?.values ?? [] : offers;
  });

const selectCurrentProductOffers = (productId: string) =>
  createSelector(
    [selectCurrentCustomer],
    (customer) => customer?.offers.find((product) => product?.id === productId)?.offers ?? []
  );

export default {
  entitySelectors,
  selectCurrentCustomerId,
  selectCurrentCustomerSelections,
  selectCurrentProductQty,
  selectProductOffer,
  selectCurrentProductOffers,
};
