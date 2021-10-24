import { all, spawn, call } from "typed-redux-saga";

import appSagas from "@Core/App/sagas";
import cartSagas from "@Core/Cart/sagas";
import customerSagas from "@Core/Customer/sagas";
import priceSummarySagas from "@Core/PriceSummary/sagas";

// Allow sagas to be restarted in event of failure
export default function* rootSagas() {
  const sagas = [appSagas, cartSagas, customerSagas, priceSummarySagas];

  yield* all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (err) {
            console.log("[ERROR]:", saga, err);
          }
        }
      })
    )
  );
}
