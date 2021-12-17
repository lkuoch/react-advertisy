import { atom } from "jotai";
import { atomFamily, atomWithReducer, selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";

import { OfferType, CustomerSelectionParam, CustomerSelectionAtom, Customer, Offer } from "./types";

export const currentCustomerAtom = atom("");

export const customerQueryAtom = atomWithQuery<Customer[], typeof Error>(() => ({
  queryKey: ["customers"],
  queryFn: () =>
    fetch(`${CONFIG.vars.graphql_endpoint}/customers`)
      .then((response) => response.json())
      .catch((error) => Promise.reject(error)),
}));

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

const selectNormalizedCustomers = selectAtom(customerQueryAtom, (customers) =>
  customers.reduce<Record<string, Customer>>(
    (acc, curr) => ({
      ...acc,
      [curr.id]: curr,
    }),
    {}
  )
);

export const selectCustomerProductOfferAtom = atom((get) => {
  const offers = get(selectNormalizedCustomers)?.[get(currentCustomerAtom)]?.offers;

  return (productId: string, offerType?: OfferType) => {
    const productOffer = offers?.[productId] ?? [];

    return offerType ? productOffer?.find(({ type }) => type === offerType)?.values ?? [] : productOffer;
  };
});

export const currentCustomerProductOffersAtom = atom((get) => {
  const offers = get(selectNormalizedCustomers)?.[get(currentCustomerAtom)]?.offers;

  return (productId: string) => offers?.[productId] ?? [];
});
