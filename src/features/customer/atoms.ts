import { atom } from "jotai";
import { atomFamily, atomWithReducer, selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";
import { request } from "graphql-request";

import { FetchCustomers } from "./queries";
import { Customer, ProductOfferType } from "../../schema/generated";
import { CustomerSelectionParam, CustomerSelectionAtom } from "./types";

export const currentCustomerIdAtom = atom("");

export const customerQueryAtom = atomWithQuery<Customer[], typeof Error>(() => ({
  queryKey: ["customers"],
  queryFn: () =>
    request(CONFIG.vars.gqlEndpoint, FetchCustomers)
      .then(({ Customers }) => Customers)
      .catch((err) => Error(err)),
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

export const ProductOfferAtom = atomFamily(
  ({ productId, offerType }: { productId: string; offerType?: ProductOfferType }) =>
    atom((get) => {
      const offers =
        get(selectNormalizedCustomers)?.[get(currentCustomerIdAtom)]?.offers.find(
          (product) => product?.id === productId
        )?.offers ?? [];

      return offerType ? offers?.find((productOffer) => productOffer?.type === offerType)?.values ?? [] : offers;
    }),
  (a, b) => a.productId === b.productId && a?.offerType === b?.offerType
);

export const currentProductOffersAtom = atomFamily((productId: string) =>
  atom(
    (get) =>
      get(selectNormalizedCustomers)?.[get(currentCustomerIdAtom)]?.offers.find((product) => product?.id === productId)
        ?.offers ?? []
  )
);
