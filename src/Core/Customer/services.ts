import * as _ from "lodash";

import { CustomerMeta } from "./models";

export function mergeCustomerMeta(original: CustomerMeta, updated: Partial<CustomerMeta>): CustomerMeta {
  return _.merge({}, original, updated);
}
