import { all, put, takeLatest } from "typed-redux-saga/macro";

import { actions } from "./redux";
import { actions as cartActions } from "@Core/Cart/redux";
import { actions as customerActions } from "@Core/Customer/redux";

export function* initAppSaga() {
  yield* put(cartActions.initCart());
  yield* put(customerActions.initCustomer());
}

export default function* () {
  yield* all([takeLatest(actions.initApp, initAppSaga)]);
}
