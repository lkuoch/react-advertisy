import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
} from "typed-redux-saga/macro";
import type { PayloadAction } from "@reduxjs/toolkit";

import MockProducts from "@Mock/products.json";
import { actions, selectors } from "./redux";
import * as services from "./services";
import {
  actions as customerActions,
  selectors as customerSelectors,
} from "@Core/Customer/redux";
import * as customerServices from "@Core/Customer/services";
import { ProductResponse, ProductSelectionPayload } from "./models";
import { CustomerMeta } from "@Core/Customer/models";

export function* initCartSaga() {
  // Fetch and put data in store
  const { products }: ProductResponse = MockProducts;

  yield* put(actions.addProducts(products));
}

export function* handleOffersSaga() {
  const customerId = yield* select(customerSelectors.selectCurrentCustomer);
  const customerMeta = yield* select(customerSelectors.selectCustomerMeta);

  const discountApplied = yield* call(
    customerServices.discountApplied,
    customerMeta,
    customerId
  );

  // Only need to calculate discounts once
  if (!discountApplied) {
    yield* fork(applyDiscountsSaga, { customerId, customerMeta });
  }
}

export function* handleProductSelectionSaga(
  action: PayloadAction<ProductSelectionPayload>
) {
  // Retrieve information
  const { id: productId, type } = action.payload;
  const customerId = yield* select(customerSelectors.selectCurrentCustomer);
  const customerSelections = yield* select(
    customerSelectors.selectCustomerSelections
  );

  // Calculate new cart values
  const updatedCustomerSelections = yield* call(
    services.handleCustomerSelection,
    {
      type,
      customerSelections,
      customerId,
      productId,
    }
  );

  // Update new cart values
  yield* put(
    customerActions.updateCustomerSelections(updatedCustomerSelections)
  );
}

function* applyDiscountsSaga({
  customerId,
  customerMeta,
}: {
  customerId: number;
  customerMeta: CustomerMeta;
}) {
  const customerSelections = yield* select(
    customerSelectors.selectCustomerSelections
  );
  const currentOffers = yield* select(customerSelectors.selectCurrentOffers);
  const products = yield* select(selectors.selectProducts);

  const updatedCustomerSelections = yield* call(
    services.calculateCustomerSpecialPrices,
    {
      customerId,
      customerSelections,
      currentOffers,
      products,
    }
  );

  if (updatedCustomerSelections) {
    yield* put(
      customerActions.updateCustomerSelections(updatedCustomerSelections)
    );
  }

  const updatedCustomerMeta = yield* call(customerServices.updateCustomerMeta, {
    customerMeta,
    customerId,
    key: "discountsApplied",
    value: true,
  });
  yield* put(customerActions.updateCustomerMeta(updatedCustomerMeta));
}

export default [
  takeEvery(actions.initCart, initCartSaga),
  takeEvery(actions.handleProductSelection, handleProductSelectionSaga),
  takeEvery(customerActions.updateCurrentCustomer, handleOffersSaga),
];
