import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { customerApi } from "./api";
import { Customer, CustomerMeta, CustomerSelection, OfferType } from "./models";
import { RootState } from "@Types";
import { DefaultRootState } from "react-redux";

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
  sortComparer: (a, b) => a.Name.localeCompare(b.Name),
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
    addToCart: (
      state,
      {
        payload: { productId, qty },
      }: PayloadAction<{ productId: string; qty: number }>
    ) => {
      if (state.slice.currentCustomerId) {
        state.slice.selections = {
          ...state.slice.selections,
          [state.slice.currentCustomerId]: {
            ...state.slice.selections[state.slice.currentCustomerId],
            [productId]: {
              qty: (qty += 1),
            },
          },
        };
      }
    },
    removeFromCart: (
      state,
      {
        payload: { productId, qty },
      }: PayloadAction<{ productId: string; qty: number }>
    ) => {
      if (state.slice.currentCustomerId && qty > 0) {
        state.slice.selections = {
          ...state.slice.selections,
          [state.slice.currentCustomerId]: {
            [productId]: {
              qty: (qty -= 1),
            },
          },
        };
      }
    },

    updateCurrentCustomerId: (state, { payload }: PayloadAction<string>) => {
      state.slice.currentCustomerId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      customerApi.endpoints.fetchCustomers.matchFulfilled,
      (state, { payload }) => {
        customerAdapter.addMany(state, payload);

        state.slice.currentCustomerId = payload.find(Boolean)?.id;
        state.slice.hasLoaded = true;
      }
    );
  },
});

export const selectors = (() => {
  const customerSelector = ({ customer }: RootState) => customer;
  const adapterSelectors = customerAdapter.getSelectors(customerSelector);

  const selectSliceState = createSelector(
    customerSelector,
    (customer) => customer.slice
  );

  const selectCurrentOffers = createSelector(
    [
      selectSliceState,
      adapterSelectors.selectEntities,
      (_, productId: string) => productId,
    ],
    ({ currentCustomerId }, entities, productId) => ({
      offers:
        currentCustomerId == null
          ? []
          : entities?.[currentCustomerId]?.Offers?.[productId] ?? [],
      get hasOffers() {
        return this.offers.length > 0;
      },
    })
  );

  const selectCurrentProductOffer = createSelector(
    [
      (
        state: any,
        { offerType, productId }: { offerType: OfferType; productId: string }
      ) => ({ state, offerType, productId }),
    ],
    ({ state, offerType, productId }) =>
      selectCurrentOffers(state, productId).offers.find(
        (offer) => offer.type === offerType
      )?.values || []
  );

  const selectCurrentProductQuantity = createSelector(
    [selectSliceState, (_, productId: string) => productId],
    ({ selections, currentCustomerId }, productId) =>
      currentCustomerId == null
        ? 0
        : selections[currentCustomerId]?.[productId]?.qty ?? 0
  );

  return {
    customerSelector,
    adapter: {
      ...adapterSelectors,
    },
    selectSliceState,
    selectCurrentOffers,
    selectCurrentProductOffer,
    selectCurrentProductQuantity,
  };
})();
