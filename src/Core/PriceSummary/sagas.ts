import { all, call, put, select, takeLatest } from "typed-redux-saga";

import { actions } from "./redux";
import * as services from "./services";
import { actions as customerActions, selectors as customerSelectors } from "@Core/Customer/redux";
import { actions as cartActions, selectors as cartSelectors } from "@Core/Cart/redux";

// Update price summary
export function* updatePriceSummarySaga() {
  const { entities: products } = yield* select(cartSelectors.selectAdapted);
  const customerState = yield* select(customerSelectors.selectState);
  const currentOffers = yield* select(customerSelectors.selectCurrentOffers);

  // Calculate new totals
  const updatedPrices = yield* call(services.calculateNewTotals, {
    customerState,
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
        customerActions.updateCurrentCustomerId,
        customerActions.updateCustomerSelections,
        cartActions.addProduct,
        cartActions.addProducts,
        cartActions.handleProductSelection,
      ],
      updatePriceSummarySaga
    ),
  ]);
}
