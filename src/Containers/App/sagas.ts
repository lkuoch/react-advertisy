import { takeEvery, put } from "typed-redux-saga";

import { actions } from "./redux";
import { actions as cartActions } from "@Containers/Cart/redux";
import { actions as customerActions } from "@Containers/Customer/redux";

export function* initAppSaga() {
  yield* put(cartActions.initCart());
  yield* put(customerActions.initCustomer());
}

export default [takeEvery(actions.initApp, initAppSaga)];
