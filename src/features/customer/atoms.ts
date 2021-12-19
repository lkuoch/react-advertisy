import { atom } from "jotai";
import { atomFamily, atomWithReducer, selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";

import { OfferType, CustomerSelectionParam, CustomerSelectionAtom, Customer } from "./types";

export const currentCustomerIdAtom = atom("");

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

export const customerProductOfferAtom = atomFamily(
  ({ productId, offerType }: { productId: string; offerType?: OfferType }) =>
    atom((get) => {
      const offers = get(selectNormalizedCustomers)?.[get(currentCustomerIdAtom)]?.offers?.[productId] ?? [];

      return offerType ? offers?.find(({ type }) => type === offerType)?.values ?? [] : offers;
    }),
  (a, b) => a.productId === b.productId && a?.offerType === b?.offerType
);

export const currentCustomerProductOffersAtom = atomFamily((productId: string) =>
  atom((get) => get(selectNormalizedCustomers)?.[get(currentCustomerIdAtom)]?.offers?.[productId] ?? [])
);
