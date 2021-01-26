import { all, call, put, takeEvery } from "typed-redux-saga/macro";

import MockCustomers from "@Mock/customers.json";
import { actions } from "./redux";
import * as services from "./services";
import { CustomerResponse } from "./models";

export function* initCustomersSaga() {
  // Fetch and put data in store
  const { customers }: CustomerResponse = MockCustomers;
  const currCust = yield* call(services.retrieveFirstCustomer, customers);

  yield* all([
    put(actions.addCustomers(customers)),
    put(actions.updateCurrentCustomer(currCust)),
  ]);
}

export default [takeEvery(actions.initCustomer, initCustomersSaga)];
