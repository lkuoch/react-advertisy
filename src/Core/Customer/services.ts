import * as _ from "lodash";
import { createAction } from "redux-api-middleware";

import { Customer, CustomerMeta, fetchMovieResult } from "./models";

export function retrieveFirstCustomer(customers: Customer[]): number {
  return _.get(customers, [0, "id"], 0);
}

export function updateCustomerMeta(input: {
  customerMeta: CustomerMeta;
  customerId: number;
  key: string;
  value: any;
}) {
  const { customerId, customerMeta, key, value } = _.cloneDeep(input);

  _.setWith(customerMeta, [customerId, key], value, Object);

  return customerMeta;
}

export function discountApplied(
  customerMeta: CustomerMeta,
  customerId: number
) {
  return _.get(customerMeta, [customerId, "discountsApplied"], false);
}

export function buildFetchMovieRequest() {
  return createAction({
    endpoint:
      "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49",
    method: "GET",
    types: [
      fetchMovieResult.REQUEST,
      fetchMovieResult.SUCCESS,
      fetchMovieResult.FAILURE,
    ],
  });
}
