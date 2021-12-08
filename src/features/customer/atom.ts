import { atom } from "jotai";
import { atomWithQuery } from "jotai/query";

import { Customer, CustomerSelection, OfferType } from "./types";

export const currentCustomerAtom = atom("");

export const customerSelections = atom<CustomerSelection>({});

export const customerQueryAtom = atomWithQuery(() => ({
  queryKey: ["customers"],
  queryFn: async () => fetch(`${CONFIG.vars.graphql_endpoint}/customers`).then((response) => response.json()),
}));
