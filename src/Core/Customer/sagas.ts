import { all, call, put, takeEvery } from "typed-redux-saga";

import MockCustomers from "@Mock/customers.json";
import { actions } from "./redux";
import * as services from "./services";
import { CustomerResponse } from "./models";

export function* initCustomersSaga() {
  // Fetch and put data in store
  const { customers }: CustomerResponse = MockCustomers;

  const mappedCustomers = yield* call(services.createMappedCustomers, customers);

  const currCust = yield* call(services.retrieveFirstCustomer, customers);

  yield* all([
    put(actions.updateCustomers(customers)),
    put(actions.updateMappedCustomers(mappedCustomers)),
    put(actions.updateCurrentCustomer(currCust)),
  ]);
}

export default [takeEvery(actions.initCustomer, initCustomersSaga)];
