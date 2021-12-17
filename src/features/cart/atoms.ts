import axios from "axios";
import { selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";
import isEqual from "lodash/isEqual";

import { Product } from "./types";

export const cartQueryAtom = atomWithQuery<Product[], typeof Error>(() => ({
  queryKey: ["cart"],
  queryFn: async () => (await axios.get(`${CONFIG.vars.graphql_endpoint}/products`)).data,
}));

export const normalizedProductsAtom = selectAtom(
  cartQueryAtom,
  (products) =>
    products.reduce<Record<string, Product>>(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {}
    ),
  isEqual
);
