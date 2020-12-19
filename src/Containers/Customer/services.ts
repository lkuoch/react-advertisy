import * as _ from "lodash";

import { Customer, MappedCustomer } from "./models";
import { ICustomer } from "@AppTypes";

export function createMappedCustomers(customers: Customer[]): MappedCustomer {
  return _.keyBy(customers, "id");
}

export function retrieveFirstCustomer(customers: Customer[]): number {
  return _.get(customers, [0, "id"], 0);
}

export function updateCustomerMeta(input: {
  customerMeta: ICustomer.ICustomerMeta;
  customerId: number;
  key: string;
  value: any;
}) {
  const { customerId, customerMeta, key, value } = _.cloneDeep(input);

  _.setWith(customerMeta, [customerId, key], value, Object);

  return customerMeta;
}

export function discountApplied(
  customerMeta: ICustomer.ICustomerMeta,
  customerId: number
) {
  return _.get(customerMeta, [customerId, "discountsApplied"], false);
}
