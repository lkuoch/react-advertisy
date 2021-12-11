import { atom, Atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { atomWithQuery } from "jotai/query";

import { OfferType, CustomerSelectionParam, CustomerSelectionAtom } from "./types";

export const customerSelectionsFamily = atomFamily<CustomerSelectionParam, Atom<CustomerSelectionAtom>>(
  ({ customerId, productId }) => atom({ customerId, productId, qty: 0 }),
  (a, b) => a.customerId === b.customerId && a.productId === b.productId
);

export const currentCustomerAtom = atom("");

export const customerQueryAtom = atomWithQuery(() => ({
  queryKey: ["customers"],
  queryFn: async () => fetch(`${CONFIG.vars.graphql_endpoint}/customers`).then((response) => response.json()),
}));
