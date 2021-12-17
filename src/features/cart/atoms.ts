import { selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";
import isEqual from "lodash/isEqual";

import { Product } from "./types";

export const cartQueryAtom = atomWithQuery(() => ({
  queryKey: ["cart"],
  queryFn: async () => fetch(`${CONFIG.vars.graphql_endpoint}/products`).then((response) => response.json()),
}));

export const normalizedProductsAtom = selectAtom<Product[], Record<string, Product>>(
  cartQueryAtom,
  (products: Product[]) =>
    products.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {}
    ),
  isEqual
);
