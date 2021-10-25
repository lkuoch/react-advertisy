import { all, call, fork, put, select, takeLatest } from "typed-redux-saga";
import type { PayloadAction } from "@reduxjs/toolkit";

import MockProducts from "@Mock/products.json";
import { actions, selectors } from "./redux";
import * as services from "./services";
import { actions as customerActions, selectors as customerSelectors } from "@Core/Customer/redux";
import * as customerServices from "@Core/Customer/services";
import { ProductResponse, ProductSelectionPayload } from "./models";

export function* handleOffersSaga() {
  const customerState = yield* select(customerSelectors.selectSlice);

  // Only need to calculate discounts once
  if (!customerState.meta[customerState.current]?.discountsApplied) {
    yield* fork(applyDiscountsSaga);
  }
}

export function* handleProductSelectionSaga(action: PayloadAction<ProductSelectionPayload>) {
  const { id: productId, type } = action.payload;
  const customerState = yield* select(customerSelectors.selectSlice);

  // Calculate new cart values
  const updatedCustomerSelections = yield* call(services.handleCustomerSelection, {
    type,
    productId,
    customerState,
  });

  // Update new cart values
  yield* put(customerActions.updateCustomerSelections(updatedCustomerSelections));
}

function* applyDiscountsSaga() {
  const { entities: products } = yield* select(selectors.selectAdapted);
  const customerState = yield* select(customerSelectors.selectSlice);
  const currentOffers = yield* select(customerSelectors.selectCurrentOffers);

  const updatedCustomerSelections = yield* call(services.calculateCustomerSpecialPrices, {
    customerState,
    currentOffers,
    products,
  });

  if (updatedCustomerSelections) {
    yield* put(customerActions.updateCustomerSelections(updatedCustomerSelections));
  }

  const updatedCustomerMeta = yield* call(customerServices.mergeCustomerMeta, customerState.meta, {
    [customerState.current]: {
      discountsApplied: true,
    },
  });

  yield* put(customerActions.updateCustomerMeta(updatedCustomerMeta));
}

export default function* () {
  yield* all([
    // takeLatest(actions.handleProductSelection, handleProductSelectionSaga),
    // takeLatest(customerActions.updateCurrentCustomerId, handleOffersSaga),
  ]);
}
