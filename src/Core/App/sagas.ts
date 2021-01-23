import { takeEvery, put } from "typed-redux-saga";

import { actions } from "./redux";
import { actions as cartActions } from "@Core/Cart/redux";
import { actions as customerActions } from "@Core/Customer/redux";

export function* initAppSaga() {
  yield* put(cartActions.initCart());
  yield* put(customerActions.initCustomer());
}

export default [takeEvery(actions.initApp, initAppSaga)];
