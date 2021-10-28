import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@utils/createSelector";
import setWith from "lodash/setWith";

import { customerApi } from "./api";
import { Customer, CustomerSelection, OfferType } from "./types";
import { RootState } from "@types";

interface State {
  slice: {
    currentCustomerId?: string;
    hasLoaded: boolean;
    selections: CustomerSelection;
  };
}

const customerAdapter = createEntityAdapter<Customer>({
  selectId: (customer) => customer.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Slice details
export const name = "customer";

export const { actions, reducer } = createSlice({
  name,
  initialState: customerAdapter.getInitialState<State>({
    slice: {
      hasLoaded: false,
      selections: {},
    },
  }),
  reducers: {
    addToCart: (state, { payload: { productId, qty } }: PayloadAction<{ productId: string; qty: number }>) => {
      if (state.slice.currentCustomerId) {
        setWith(state, ["slice", "selections", state.slice.currentCustomerId, productId, "qty"], (qty += 1), Object);
      }
    },
    removeFromCart: (state, { payload: { productId, qty } }: PayloadAction<{ productId: string; qty: number }>) => {
      if (state.slice.currentCustomerId && qty > 0) {
        setWith(state, ["slice", "selections", state.slice.currentCustomerId, productId, "qty"], (qty -= 1), Object);
      }
    },

    updateCurrentCustomerId: (state, { payload }: PayloadAction<string>) => {
      state.slice.currentCustomerId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(customerApi.endpoints.fetchCustomers.matchFulfilled, (state, { payload }) => {
      customerAdapter.addMany(state, payload);

      state.slice.currentCustomerId = payload.find(Boolean)?.id;
      state.slice.hasLoaded = true;
    });
  },
});

export const selectors = (() => {
  const adapterSelectors = customerAdapter.getSelectors(({ customer }: RootState) => customer);

  const selectCurrentCustomerId = ({ customer }: RootState) => customer.slice.currentCustomerId;
  const selectSelections = ({ customer }: RootState) => customer.slice.selections;
  const selectHasLoaded = ({ customer }: RootState) => customer.slice.hasLoaded;

  const selectCurrentCustomer = createSelector(
    [selectCurrentCustomerId, adapterSelectors.selectEntities],
    (currentCustomerId, customers) => (currentCustomerId ? customers?.[currentCustomerId] : undefined),
    CONFIG.vars.selector_options
  );

  const selectCurrentProductOffers = createSelector(
    [selectCurrentCustomer, (_, productId: string) => productId],
    (customer, productId) => customer?.offers?.[productId] ?? [],
    CONFIG.vars.selector_options
  );

  const selectCurrentProductQuantity = createSelector(
    [selectCurrentCustomerId, selectSelections, (_, productId: string) => productId],
    (currentCustomerId, selections, productId) =>
      currentCustomerId ? selections?.[currentCustomerId]?.[productId]?.qty ?? 0 : 0,
    CONFIG.vars.selector_options
  );

  const selectOfferType = createSelector(
    [
      selectCurrentCustomer,
      (_, { offerType, productId }: { offerType: OfferType; productId: string }) => ({ offerType, productId }),
    ],
    (customer, { offerType, productId }) =>
      customer?.offers?.[productId]?.find(({ type }) => type === offerType)?.values ?? undefined,
    CONFIG.vars.selector_options
  );

  const selectNewPriceOffer = createSelector(
    [(state, productId: string) => selectOfferType(state, { offerType: OfferType.NewPrice, productId })],
    (result) => result,
    CONFIG.vars.selector_options
  );

  const selectXYDealOffer = createSelector(
    [(state, productId: string) => selectOfferType(state, { offerType: OfferType.XYDeal, productId })],
    (result) => result,
    CONFIG.vars.selector_options
  );

  return {
    adapter: {
      ...adapterSelectors,
    },
    selectCurrentCustomerId,
    selectHasLoaded,
    selectCurrentProductOffers,
    selectCurrentProductQuantity,
    selectNewPriceOffer,
    selectXYDealOffer,
  };
})();
