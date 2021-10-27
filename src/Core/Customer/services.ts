import * as _ from "lodash";

import { CustomerMeta } from "./types";

export function mergeCustomerMeta(original: CustomerMeta, updated: Partial<CustomerMeta>): CustomerMeta {
  return _.merge({}, original, updated);
}
