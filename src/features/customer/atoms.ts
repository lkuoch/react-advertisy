import { atom, Atom } from "jotai";
import { atomFamily, atomWithReducer, selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";
import isEqual from "lodash/isEqual";

import { OfferType, CustomerSelectionParam, CustomerSelectionAtom, Customer } from "./types";

export const customerQueryAtom = atomWithQuery(() => ({
  queryKey: ["customers"],
  queryFn: async () => fetch(`${CONFIG.vars.graphql_endpoint}/customers`).then((response) => response.json()),
}));

export const normalizedCustomersAtom = selectAtom<Customer[], Record<string, Customer>>(
  customerQueryAtom,
  (customers) =>
    customers.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {}
    ),
  isEqual
);

export const customerSelectionsAtom = atomFamily(
  ({ customerId, productId }: CustomerSelectionParam) =>
    atomWithReducer<CustomerSelectionAtom, "add" | "remove">({ customerId, productId, qty: 0 }, (state, action) => {
      switch (action) {
        case "add": {
          return {
            ...state,
            qty: state.qty + 1,
          };
        }

        case "remove": {
          return {
            ...state,
            qty: state.qty > 0 ? state.qty - 1 : state.qty,
          };
        }

        default: {
          return state;
        }
      }
    }),
  (a, b) => a.customerId === b.customerId && a.productId === b.productId
);

export const currentCustomerAtom = atom("");

export const customerProductOffersAtom = atom((get) => {
  const offers = get(normalizedCustomersAtom)?.[get(currentCustomerAtom)]?.offers;

  return (productId: string, offerType: OfferType) =>
    offers?.[productId]?.find(({ type }) => type === offerType)?.values ?? [];
});
