import { all, call, put, takeLatest } from "typed-redux-saga/macro";

import MockCustomers from "@Mock/customers.json";
import { actions } from "./redux";
import * as services from "./services";
import { CustomerResponse, fetchMovieResult } from "./models";

export function* initCustomersSaga() {
  // Fetch and put data in store
  const { customers }: CustomerResponse = MockCustomers;
  const currCust = yield* call(services.retrieveFirstCustomer, customers);

  yield* all([
    put(actions.addCustomers(customers)),
    put(actions.updateCurrentCustomer(currCust)),
  ]);

  yield* put<any>(services.fetchMovieAction());
}

function* fetchMoviewHandlerSaga(action: IMiddlewareActionResult) {
  if (action.type === fetchMovieResult.SUCCESS) {
    console.log("@", action.payload);
  } else {
    console.log("###", action);
  }
}

export default function* () {
  yield* all([
    takeLatest(actions.initCustomer, initCustomersSaga),
    takeLatest(
      [fetchMovieResult.SUCCESS, fetchMovieResult.FAILURE],
      fetchMoviewHandlerSaga
    ),
  ]);
}
