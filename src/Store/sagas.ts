import { all } from "typed-redux-saga/macro";

import appSagas from "@Core/App/sagas";
import cartSagas from "@Core/Cart/sagas";
import customerSagas from "@Core/Customer/sagas";
import priceSummarySagas from "@Core/PriceSummary/sagas";

// Global registration of saga components
export default function* rootSagas() {
  yield* all([
    ...appSagas,
    ...cartSagas,
    ...customerSagas,
    ...priceSummarySagas,
  ]);
}
