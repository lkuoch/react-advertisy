import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@utils/createSelector";
import setWith from "lodash/setWith";

import { customerApi } from "./api";
import { Customer, CustomerMeta, CustomerSelection, OfferType } from "./types";
import { RootState } from "@types";

interface State {
  slice: {
    currentCustomerId?: string;
    hasLoaded: boolean;
    selections: CustomerSelection;
    meta: CustomerMeta;
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
      meta: {},
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

  const selectCurrentOffers = createSelector(
    [selectCurrentCustomerId, adapterSelectors.selectEntities, (_, productId: string) => productId],
    (currentCustomerId, entities, productId) => {
      const offers = currentCustomerId ? entities?.[currentCustomerId]?.offers?.[productId] ?? [] : [];

      return {
        offers,
        hasOffers: offers.length > 0,
      };
    },
    CONFIG.vars.selector_options
  );

  const selectOfferType = createSelector(
    [
      selectCurrentCustomerId,
      adapterSelectors.selectEntities,
      (_, { offerType, productId }: { offerType: OfferType; productId: string }) => ({ offerType, productId }),
    ],
    (currentCustomerId, customers, { offerType, productId }) =>
      currentCustomerId
        ? customers[currentCustomerId]?.offers?.[productId]?.find(({ type }) => type === offerType)?.values ?? undefined
        : undefined,
    CONFIG.vars.selector_options
  );

  const selectNewPriceOffer = createSelector(
    [(state, productId: string) => [state, productId]],
    ([state, productId]) => selectOfferType(state, { offerType: OfferType.NewPrice, productId })?.[0] ?? undefined,
    CONFIG.vars.selector_options
  );

  const selectXYDealOffer = createSelector(
    [(state, productId: string) => [state, productId]],
    ([state, productId]) => {
      const offer = selectOfferType(state, { offerType: OfferType.XYDeal, productId });
      return offer ? { x: offer[0], y: offer[1] } : offer;
    },
    CONFIG.vars.selector_options
  );

  const selectCurrentProductQuantity = createSelector(
    [selectSelections, selectCurrentCustomerId, (_, productId: string) => productId],
    (selections, currentCustomerId, productId) =>
      currentCustomerId == null ? 0 : selections[currentCustomerId]?.[productId]?.qty ?? 0,
    CONFIG.vars.selector_options
  );

  return {
    adapter: {
      ...adapterSelectors,
    },
    selectCurrentCustomerId,
    selectSelections,
    selectHasLoaded,
    selectCurrentOffers,
    selectCurrentProductQuantity,
    selectNewPriceOffer,
    selectXYDealOffer,
  };
})();
