import { atom } from "jotai";
import { atomWithReducer, selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";
import setWith from "lodash/setWith";

import { CustomerSelectionAction, CustomerSelection, OfferType } from "./types";

/** DATA SCHEMA DESIGN
 
Customer Selections Atom: (Optics?), (Family?)


{
  [cusId-prodId]: {
    qty: number,
    customerPrice?: number
  }
}

**/

const customerSelectionsReducer = (state: CustomerSelection, { payload, type }: CustomerSelectionAction) => {
  const id = `${payload.customerId}-${payload.productId}`;
  const qty = state?.[id]?.qty ?? 0;

  switch (type) {
    case "add": {
      return setWith(state, [id, "qty"], qty + 1, Object);
    }

    case "remove": {
      if (qty > 0) {
        return setWith(state, [id, "qty"], qty - 1, Object);
      }
    }

    default: {
      return state;
    }
  }
};

export const customerSelectionsReducerAtom = atomWithReducer({}, customerSelectionsReducer);

export const currentCustomerAtom = atom("");

export const customerQueryAtom = atomWithQuery(() => ({
  queryKey: ["customers"],
  queryFn: async () => fetch(`${CONFIG.vars.graphql_endpoint}/customers`).then((response) => response.json()),
}));

export const selectCustomerSelections = (customerId: string, productId: string) =>
  selectAtom(customerSelectionsReducerAtom, (selections) => selections[`${customerId}-${productId}`]);
