import * as _ from "lodash";

import { Customer, CustomerMeta } from "./models";

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
