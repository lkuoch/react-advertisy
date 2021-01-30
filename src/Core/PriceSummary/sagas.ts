import { all, call, put, select, takeLatest } from "typed-redux-saga/macro";

import { actions } from "./redux";
import * as services from "./services";
import {
  actions as customerActions,
  selectors as customerSelectors,
} from "@Core/Customer/redux";
import {
  actions as cartActions,
  selectors as cartSelectors,
} from "@Core/Cart/redux";

// Update price summary
export function* updatePriceSummarySaga() {
  // Retrieve info
  const customerSelections = yield* select(
    customerSelectors.selectCustomerSelections
  );
  const currentCustomer = yield* select(
    customerSelectors.selectCurrentCustomer
  );
  const currentOffers = yield* select(customerSelectors.selectCurrentOffers);
  const products = yield* select(cartSelectors.selectProducts);

  // Calculate new totals
  const updatedPrices = yield* call(services.calculateNewTotals, {
    customerSelections,
    currentCustomer,
    currentOffers,
    products,
  });

  // Update new totals
  yield* put(actions.updatePrices(updatedPrices));
}

export default function* () {
  yield* all([
    takeLatest(
      [
        customerActions.updateCurrentCustomer,
        customerActions.updateCustomerSelections,
        cartActions.addProduct,
        cartActions.addProducts,
        cartActions.handleProductSelection,
      ],
      updatePriceSummarySaga
    ),
  ]);
}
