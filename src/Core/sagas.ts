import { all } from "typed-redux-saga";

import appSagas from "@Containers/App/sagas";
import cartSagas from "@Containers/Cart/sagas";
import customerSagas from "@Containers/Customer/sagas";
import priceSummarySagas from "@Containers/PriceSummary/sagas";

// Global registration of saga components
export default function* rootSagas() {
  yield* all([
    ...appSagas,
    ...cartSagas,
    ...customerSagas,
    ...priceSummarySagas,
  ]);
}
