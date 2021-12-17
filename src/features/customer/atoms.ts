import { atom } from "jotai";
import { atomFamily, atomWithReducer, selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";

import { OfferType, CustomerSelectionParam, CustomerSelectionAtom, Customer } from "./types";

export const customerQueryAtom = atomWithQuery<Customer[], typeof Error>(() => ({
  queryKey: ["customers"],
  queryFn: async () =>
    fetch(`${CONFIG.vars.graphql_endpoint}/customers`)
      .then((response) => response.json())
      .catch((error) => {
        return Promise.reject(error);
      }),
}));

export const normalizedCustomersAtom = selectAtom(customerQueryAtom, (customers) =>
  customers.reduce<Record<string, Customer>>(
    (acc, curr) => ({
      ...acc,
      [curr.id]: curr,
    }),
    {}
  )
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

export const selectCustomerProductOfferAtom = atom((get) => {
  const offers = get(normalizedCustomersAtom)?.[get(currentCustomerAtom)]?.offers;

  return (productId: string, offerType: OfferType) =>
    offers?.[productId]?.find(({ type }) => type === offerType)?.values ?? [];
});

export const currentCustomerProductOffersAtom = atom((get) => {
  const offers = get(normalizedCustomersAtom)?.[get(currentCustomerAtom)]?.offers;

  return (productId: string) => offers?.[productId] ?? [];
});
