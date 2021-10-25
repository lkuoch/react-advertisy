import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

// Slice details
const name = "customer";

const customerAdapter = createEntityAdapter<Customer>({
  selectId: (customer) => customer.id,
  sortComparer: (a, b) => a.Name.localeCompare(b.Name),
});

const customerSelectors = customerAdapter.getSelectors<RootState>((state) => state[name]);

const initialState = customerAdapter.getInitialState<State>({
  slice: {
    hasLoaded: false,
    selections: {},
    meta: {},
  },
});

const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    addToCart: (state, { payload: { productId, qty } }: PayloadAction<{ productId: string; qty: number }>) => {
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
    removeFromCart: (state, { payload: { productId, qty } }: PayloadAction<{ productId: string; qty: number }>) => {
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
    updateCustomerSelections: (state, { payload }: PayloadAction<CustomerSelection>) => {
      state.slice.selections = payload;
    },
    updateCustomerMeta: (state, { payload }: PayloadAction<CustomerMeta>) => {
      state.slice.meta = payload;
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

const selectors = (() => {
  const selectSlice = ({ customer }: RootState) => customer.slice;
  const selectHasLoaded = ({ customer }: RootState) => customer.slice.hasLoaded;
  const selectCurrentCustomerId = ({ customer }: RootState) => customer.slice.currentCustomerId;

  const selectCurrentOffers = (productId: string) => (state: RootState) =>
    createSelector(selectCurrentCustomerId, customerSelectors.selectEntities, (currentCustomerId, entities) => ({
      offers: currentCustomerId == null ? [] : entities?.[currentCustomerId]?.Offers?.[productId] ?? [],
      get hasOffers() {
        return this.offers.length > 0;
      },
    }))(state);

  const selectGetCurrentOffer =
    ({ offerType, productId }: { offerType: OfferType; productId: string }) =>
    (state: RootState): number[] =>
      createSelector(
        selectCurrentOffers(productId),
        (result) => result.offers.find((offer) => offer.type === offerType)?.values || []
      )(state);

  const selectProductQuantity = (productId: string) => (state: RootState) =>
    createSelector(selectCurrentCustomerId, selectSlice, (currentCustomerId, slice) =>
      currentCustomerId == null ? 0 : slice.selections[currentCustomerId]?.[productId]?.qty ?? 0
    )(state);

  return {
    ...customerSelectors,
    selectSlice,
    selectHasLoaded,
    selectCurrentCustomerId,
    selectCurrentOffers,
    selectGetCurrentOffer,
    selectProductQuantity,
  };
})();

export { initialState, actions, reducer, selectors, name };
