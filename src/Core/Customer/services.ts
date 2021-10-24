import * as _ from "lodash";
import { createAction } from "redux-api-middleware";

import { Customer, CustomerMeta, fetchMovieResult } from "./models";

export function retrieveFirstCustomer(customers: Customer[]): number {
  return _.get(customers, [0, "id"], 0);
}

export function mergeCustomerMeta(
  original: CustomerMeta,
  updated: Partial<CustomerMeta>
): CustomerMeta {
  return _.merge({}, original, updated);
}

export function fetchMovieAction() {
  return createAction({
    endpoint: `${CONFIG.vars.base_graphql_endpoint}/todos`,
    method: "GET",
    types: [
      fetchMovieResult.REQUEST,
      fetchMovieResult.SUCCESS,
      fetchMovieResult.FAILURE,
    ],
  });
}
