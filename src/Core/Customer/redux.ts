import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { customerApi } from "./api";
import { Customer, CustomerMeta, CustomerSelection, OfferType } from "./models";
import { RootState } from "@Types";

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
  const adapterSelectors = customerAdapter.getSelectors<RootState>(
    ({ customer }) => customer
  );

  const selectSliceState = ({ customer }: RootState) => customer.slice;

  const selectCurrentOffers = (productId: string) =>
    createSelector(
      [selectSliceState, adapterSelectors.selectEntities],
      ({ currentCustomerId }, entities) => ({
        offers:
          currentCustomerId == null
            ? []
            : entities?.[currentCustomerId]?.Offers?.[productId] ?? [],
        get hasOffers() {
          return this.offers.length > 0;
        },
      })
    );

  const selectCurrentProductOffer = ({
    offerType,
    productId,
  }: {
    offerType: OfferType;
    productId: string;
  }) =>
    createSelector(
      selectCurrentOffers(productId),
      (result) =>
        result.offers.find((offer) => offer.type === offerType)?.values || []
    );

  const selectCurrentProductQuantity = (productId: string) =>
    createSelector(
      [selectSliceState, selectSliceState],
      ({ currentCustomerId }, slice) =>
        currentCustomerId == null
          ? 0
          : slice.selections[currentCustomerId]?.[productId]?.qty ?? 0
    );

  return {
    adapter: {
      ...adapterSelectors,
    },
    selectSliceState,
    selectCurrentOffers,
    selectCurrentProductOffer,
    selectCurrentProductQuantity,
  };
})();
