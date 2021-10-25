import { all, spawn, call } from "typed-redux-saga";

import appSagas from "@Core/App/sagas";
import cartSagas from "@Core/Cart/sagas";
import priceSummarySagas from "@Core/PriceSummary/sagas";

// Allow sagas to be restarted in event of failure
export default function* rootSagas() {
  // const sagas = [appSagas, cartSagas, priceSummarySagas];

  yield* all(
    [].map((saga) =>
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
